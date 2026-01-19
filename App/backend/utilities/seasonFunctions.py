"""Static season list for AniList-style seasons.

This replaces the previous AniList fetch with a fixed, ordered list
so the backend can return seasons without external calls.
"""

# Order to keep seasons consistent for the UI
SEASONS: list[str] = ["WINTER", "SPRING", "SUMMER", "FALL"]


async def get_cached_seasons() -> list[str]:
    """Return the static season list.

    Kept async to match existing call sites. Returns a copy to
    prevent accidental mutation of the module-level constant.
    """
    return SEASONS.copy()
