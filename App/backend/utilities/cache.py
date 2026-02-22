import time
from typing import Any

_cache: dict[str, tuple[float, Any]] = {}


def get_cache(key: str) -> Any | None:
    entry = _cache.get(key)
    if entry is None:
        return None

    expires_at, value = entry
    if time.time() > expires_at:
        _cache.pop(key, None)
        return None

    return value


def set_cache(key: str, value: Any, ttl_seconds: int) -> None:
    if ttl_seconds <= 0:
        return

    _cache[key] = (time.time() + ttl_seconds, value)
