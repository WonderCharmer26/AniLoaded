from typing import Literal
from typing import Optional
from pydantic import BaseModel


class AniListTitle(BaseModel):
    romaji: Optional[str] = None
    english: Optional[str] = None
    native: Optional[str] = None

    class Config:
        extra = "ignore"


class AniListImage(BaseModel):
    large: Optional[str] = None
    medium: Optional[str] = None
    extraLarge: Optional[str] = None

    class Config:
        extra = "ignore"


class AniListStudio(BaseModel):
    id: int
    name: str

    class Config:
        extra = "ignore"


class AniListStudioConnection(BaseModel):
    nodes: Optional[list[AniListStudio]] = None

    class Config:
        extra = "ignore"


# class for the anime data that we get back and send
class AniListMedia(BaseModel):
    id: int
    title: AniListTitle
    episodes: Optional[int] = None
    coverImage: AniListImage
    bannerImage: Optional[str] = None
    genres: Optional[list[str]] = None
    description: Optional[str] = None
    averageScore: Optional[int] = None
    status: Optional[
        Literal["FINISHED", "RELEASING", "NOT_YET_RELEASED", "CANCELLED", "HIATUS"]
    ] = None
    season: Optional[str] = None
    seasonYear: Optional[int] = (
        None  # might use later on but might keep the season simple for now
    )
    studios: Optional[AniListStudioConnection] = None

    class Config:
        extra = "ignore"
