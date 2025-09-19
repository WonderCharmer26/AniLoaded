from pydantic import BaseModel


# schema for anime requests that will be sent to the database for user storage
class AnimeRequest(BaseModel):
    title: str
    img: str
    # description: str (might not be needed)
    rating: float


# might not be needed may be used for storing users favorite voice actors
# class VoiceActorRequest(BaseModel):
#     name: str
#     img: str
#     age: int
