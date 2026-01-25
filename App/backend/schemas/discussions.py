from pydantic import BaseModel


# Discussions Model
class Discussions(BaseModel):
    id: int
    anime_id: int
    category_id: int
    created_by: int  # might make into a string depending on how supabase sets it up
    title: str
    body: str
    is_locked: bool
    is_pinned: bool  # might not need
    is_spoiler: bool
    episode_number: int
    created_at: str
    last_activity_at: str
    comment_count: int
    update_count: int
    season_number: int


# Discussions Comments

# Discussions Categories
