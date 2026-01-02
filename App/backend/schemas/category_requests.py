"""
class for the getting the category params from the frontend
"""

from typing import Optional
from pydantic import BaseModel


# schema for category filtering
class CategoryFilter(BaseModel):
    genres: Optional[str] = None  # takes in an array of genres
    season: Optional[str] = None
    page: Optional[int] = (
        None  # used in get the page from the buttoms bellow the results
    )
    perPage: Optional[int] = None  # To change the amount of anime that we get back
