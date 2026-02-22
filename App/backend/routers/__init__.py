from .anime import router as anime_router
from .discussions import router as discussions_router
from .health import router as health_router

__all__ = ["anime_router", "discussions_router", "health_router"]
