# variable to store the data after the first fetch and cache it
import asyncio  # might only import the methods that I need
import httpx  # might only import the methods that I need
import time  # might only import the methods that I need

# Variables for the url and the timer for the cache
ANILIST_URL = "https://graphql.anilist.co"
STALE_TIMER = 60 * 60 * 24  # 24 hour timer

# variables for the cache
_genre_cache: list[str] | None = None  # private
_genre_cache_fetched_at: float | None = (
    None  # private (used to calculate the refresh of the cache)
)
_genre_cache_lock = (
    asyncio.Lock()
)  # helps the cache to run and operate smoothly when updating

# variable for making the query to anilist
GENRE_QUERY = """
query GetGenre {
    GenreCollection
}
"""


# async function to get the anime from anilist
async def fetch_genres() -> list[str]:
    # use httpx to make open a request to anilist
    async with httpx.AsyncClient(timeout=15) as client:
        # make a post request to anilist
        response = await client.post(ANILIST_URL, json={"query": GENRE_QUERY})
        response.raise_for_status()  # check the status for the request
        data = response.json()  # format into json
        # return the genre choices
        return data["data"]["GenreCollection"]


# function to get the cached data from the sever if it exists
async def get_cached_genre() -> list[str]:
    # access the global variables (cache and the cached time)
    global _genre_cache, _genre_cache_fetched_at

    # get the current time
    current_time = time.time()
    # store the value for if the cache is good to go
    cache_is_valid = (
        _genre_cache is not None
        and _genre_cache_fetched_at is not None
        and (current_time - _genre_cache_fetched_at) < STALE_TIMER
    )

    # if the cache is valid then return the genre cache so that it can be updated
    if cache_is_valid:
        return _genre_cache

    # double check again (using lock to help make a safe request again)
    async with _genre_cache_lock:
        # get the current time
        current_time = time.time()

        # check again
        cache_is_valid = (
            _genre_cache is not None
            and _genre_cache_fetched_at is not None
            and (current_time - _genre_cache_fetched_at) < STALE_TIMER
        )
        # return if valid
        if cache_is_valid:
            return _genre_cache

        # other wise fetch the genres
        genres = await fetch_genres()
        _genre_cache = sorted(set(genres))
        _genre_cache_fetched_at = current_time
        return _genre_cache
