"""
class for the getting the category params from the frontend
"""

from typing import Optional
from pydantic import BaseModel


# schema for category filtering
class CategoryFilter(BaseModel):
    genre: Optional[str] = None
    season: Optional[str] = None
