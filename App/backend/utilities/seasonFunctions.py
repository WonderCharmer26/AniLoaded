# variable to store the data after the first fetch and cache it
import asyncio
import httpx
import time

# Variables for the url and the timer for the cache
ANILIST_URL = "https://graphql.anilist.co"
STALE_TIMER = 60 * 60 * 24  # 24 hour timer

# variables for the cache
_season_cache: list[str] | None = None
_season_cache_fetched_at: float | None = None
_season_cache_lock = asyncio.Lock()

# order to keep seasons consistent for the UI
_SEASON_ORDER = ["WINTER", "SPRING", "SUMMER", "FALL"]

# query to use
SEASON_QUERY = """
query GetSeasons($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: START_DATE_DESC) {
      season
    }
  }
}
"""


# function to fetch seasons
async def fetch_seasons() -> list[str]:
    """Fetch seasons from AniList and return a deduped, ordered list."""
    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.post(
            ANILIST_URL,
            # might tweak later on for the perPage
            json={"query": SEASON_QUERY, "variables": {"page": 1, "perPage": 50}},
        )
        response.raise_for_status()  # check for error
        data = response.json()
        media = (
            data.get("data", {}).get("Page", {}).get("media", [])
        )  # filter the data to return
        seasons = [item.get("season") for item in media if item.get("season")]

        # Deduplicate and keep a predictable order for the UI
        return sorted(
            set(seasons),
            key=lambda season: (
                _SEASON_ORDER.index(season)
                if season in _SEASON_ORDER
                else len(_SEASON_ORDER)
            ),
        )


async def get_cached_seasons() -> list[str]:
    """Return cached seasons or refresh from AniList if stale."""
    global _season_cache, _season_cache_fetched_at

    current_time = time.time()
    # check the cache first time
    cache_is_valid = (
        _season_cache is not None
        and _season_cache_fetched_at is not None
        and (current_time - _season_cache_fetched_at) < STALE_TIMER
    )

    # return if the cache is valid
    if cache_is_valid:
        return _season_cache

    # second check for the cache
    async with _season_cache_lock:
        current_time = time.time()
        cache_is_valid = (
            _season_cache is not None
            and _season_cache_fetched_at is not None
            and (current_time - _season_cache_fetched_at) < STALE_TIMER
        )
        if cache_is_valid:
            return _season_cache

        seasons = await fetch_seasons()
        _season_cache = seasons
        _season_cache_fetched_at = current_time
        return _season_cache
