# backend will be built in this file

# NOTE: Ani-list api has a rate limit of 90 for one minute
# NOTE: fastapi in the requirements not installed globally

# imports
import httpx  # for handling the requests on the backend to get data from the Ani-list api
from fastapi import Depends, FastAPI
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas.category_requests import CategoryFilter
from utilities.genreFunctions import ANILIST_URL, get_cached_genre
from utilities.seasonFunctions import get_cached_seasons

# from pydantic import BaseModel (might use, handling BaseModel in schema folder)

# .env import variables will be added in later
# NOTE: gonna set up supabase database connection later on

# create the app object
app = FastAPI()

# add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,  # this is the middleware
    allow_origins=["*"],  # allow all origins (change to site url later on in prod)
    allow_credentials=True,  # allow credentials
    allow_methods=["*"],  # means allow all methods
    allow_headers=["*"],  # allow all headers
)

# anilist url to use in routes
ANILIST_URL


# test route to check the connection for the backend (removing later)
@app.get("/")
def root():
    return {"test_message": "This is a test message to show the backend is working"}


# route to get genres from AniList
@app.get("/anime/genres")
async def get_genres():
    """Fetch all genres from AniList and return cached list."""
    return {"genres": await get_cached_genre()}


# route to get the seasons from the backend (made seperate incase on updates over the other or failure happens)
@app.get("/anime/seasons")
async def get_seasons():
    """Fetch all seasons from AniList and return cached list."""
    return {"seasons": await get_cached_seasons()}


# route to get the filtered anime options from AniList
@app.get("/anime/categories")
async def get_categories(filters: CategoryFilter = Depends()):
    variables = dict[str] = {}
    # check if filters are sent as params in the request
    if filters.genre:
        # store the variables in the dict
        variables["genre"] = filters.genre
    if filters.season:
        # store the variables in the dict
        variables["season"] = filters.season

    # query for anilist (genre and season passed into the query)
    query = """
    query($perPage: Int, $page: Int, $genres: [String], $season: MediaSeason) {
        Page(page: $page, perPage: $perPage) {
            media(type: ANIME, genre_in: $genres, season: $season, sort: POPULARITY_DESC){
                id
                title {
                romaji
                english
                native
                }
                episodes
                coverImage {
                large
                medium
                }
                genres
                averageScore
                status(version: 2)
            } 
        }
    }
    """

    # use pass in the variables and make the request
    async with httpx.AsyncClient() as client:
        try:
            response = client.post(
                ANILIST_URL,
                json={
                    "query": query,
                    "variables": variables,
                },  # json params to send off in the request
                headers={"Content-Type": "application/json"},
            )

            # print the response to check
            print(response)

            # show the status if all goes good
            response.raise_for_status()

            # package the data to send back to the frontend
            data = response.json()  # turn the data into json to send off

            # handle the errors if anything pops up in the json request
            if "errors" in data:
                print(f"GraphQL error: {data['errors']}")
                raise HTTPException(status_code=400, detail=data["errors"])

            # otherwise return the data
            return data

        except httpx.HTTPStatusError as error:
            raise HTTPException(status_code=404, detail=f"The error is: {error}")


# route to get the popular anime from Ani-list
@app.get("/anime/popular")
async def get_anime_popular():
    """
    NOTE: This fetch gets the popular anime from Ani-list so that I can return the
    anime to the frontend Carousel Component via /anime/popular
    """

    # query that being sent
    query = """
    
    query ($perPage: Int, $page: Int) {
        Page(page: $page, perPage: $perPage) {
            media(type: ANIME, sort: POPULARITY_DESC){
                id 
                title {
                  romaji
                  english
                  native
                }
                episodes
                coverImage {
                  large
                  medium
                }
                genres
                averageScore
                status(version: 2)
            }
        }
    }
    """

    # pass in the variables that will be passed into the query when sent
    variables = {
        "page": 1,
        "perPage": 10,
    }  # amount of anime retrieved I might change later on

    # send the query with the variables to get teh popular anime
    async with httpx.AsyncClient() as client:
        # make a post request to the Ani-list api
        try:
            response = await client.post(
                "https://graphql.anilist.co",
                json={"query": query, "variables": variables},
                headers={"Content-Type": "application/json"},
            )
            # print the response to check
            print(response)
            # show the status if all goes good
            response.raise_for_status()

            # package the data to send back to the frontend
            data = response.json()  # turn the data into json to send off

            # handle the errors if anything pops up
            if "errors" in data:
                print(f"GraphQL error: {data['errors']}")
                raise HTTPException(status_code=400, detail=data["errors"])

            # return the data
            return data

        # log the error if it fails
        # handle if the status code is not 200
        except httpx.HTTPStatusError as error:
            raise HTTPException(
                status_code=500,
                detail=str(
                    f"There was an error: {error.response.status_code} - {error.response.text}"
                ),
            )

        # handle if the request fails
        except httpx.RequestError as error:
            raise HTTPException(
                status_code=500,
                detail=str(f"There was an error in the request sent: {error}"),
            )


# route to get the trending anime from Ani-list
@app.get("/anime/trending")
async def get_anime_trending():
    """
    NOTE: May adjust for amount for rendering on trending anime page
    and manually tweak the amount rendered in frontend component like CardCarousel
    via /anime/trending
    """
    # set up the query to get the trending anime
    query = """

    query ($perPage: Int, $page: Int) {
        Page(page: $page, perPage: $perPage) {
           media(type: ANIME, sort: TRENDING_DESC) {
               id
               title {
                romaji
                english
                native
               }      
               episodes
               coverImage {
                large
                medium
               }
               genres
               averageScore
               status
           } 
        }        
    }"""

    # variables that can be used to get the amount of items that I want
    # NOTE: May tweak to more perPage later on after CardCarousel is completed and manually tweak on frontend
    variables = {
        "page": 1,
        "perPage": 10,
    }  # set the amount items per page, might tweak to have more later on

    # send the query to the Ani-list api
    async with httpx.AsyncClient() as client:  # use httpx to make the request to handle everything about the request
        # make a post request to the Ani-list api
        try:
            response = await client.post(
                "https://graphql.anilist.co",
                # pass in the query and the varibales to get the items and the amount of items we want fetched
                json={"query": query, "variables": variables},
                # set the content type to json
                headers={"Content-Type": "application/json"},
            )
            # show the response if it works
            print(response)
            response.raise_for_status()  # raise an exception for bad status codes (4xx or 5xx)

            # package the data in a variable to send
            data = response.json()

            # handle errors in QL data fetched
            if "errors" in data:
                print(f"GraphQL error: {data['errors']}")
                raise HTTPException(status_code=400, detail=data["errors"])

            # return the data
            return data

        # log the error if it fails
        # handle if the status code is not 200
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=500,
                detail=str(
                    f"There was an error: {e.response.status_code} - {e.response.text}"
                ),
            )
        # handle if the request fails
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=str(f"Request error: {e}"))


# Route to get the top anime from anilist
@app.get("/anime/top")  # get all the top anime (no parameters needed)
async def get_anime_top():  # NOTE: may add in param from the frontend if needed
    # this query is sorted in descending order
    # set up the query string
    query = """
     query ($perPage: Int, $page: Int) {
        Page(page: $page, perPage: $perPage) {
            media(type: ANIME, sort: SCORE_DESC){
                id 
                title {
                  romaji
                  english
                  native
                }
                episodes
                coverImage {
                  large
                  medium
                }
                genres
                averageScore
                status(version: 2)
            }
        }
    }
    """

    # get the 1st page, will swap to get the params from the frontend call
    variables = {"page": 1, "perPage": 10}

    # make the call to get the data
    async with httpx.AsyncClient() as client:
        try:
            # try to connect get the data from ani-list
            response = await client.post(
                "https://graphql.anilist.co",
                json={"query": query, "variables": variables},
                headers={"Content-Type": "application/json"},
            )

            # test out the fetch
            print(f"Test for the response for /anime/top:{response.content}")
            # raise an error if status isn't successful
            response.raise_for_status()

            # package the data to send of if no error occurs
            data = response.json()

            # check if there is an error in the response I get back
            if "errors" in data:
                # print to the console
                print(f"Here is the error in the data:{data['errors']}")
                # raise an error close the func
                raise HTTPException(status_code=400, detail=data["errors"])

            # return the data to the frontend if the fetch was successful
            return data

        # check for status_code error
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=500,
                detail=str(f"There was an error in the status code {e}"),
            )

        # check if there was an error in Request
        except httpx.RequestError as e:
            raise HTTPException(
                status_code=404, detail=str(f"There was an error getting the data:{e}")
            )


# TODO: MAKE A ROUTE TO GET ANIME THAT MATCHES A SPECIFIC NAME


# NOTE: Route to get specific anime info to pass in into the anime pages
@app.get("/anime/{anime_id}")
async def get_anime_by_id(
    anime_id: int,
):  # pass in the anime_id from the req as a param
    """
    This function returns neccisary info for the anime page
    """
    query = """
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
          large
          color
        }
        bannerImage
        format
        status
        episodes
        averageScore
        genres
        description(asHtml: false)
        studios (isMain: true) {
            nodes {
                id 
                name
                }
        }
        characters(sort: [ROLE, RELEVANCE, ID], perPage: 10) {
         edges {
            role
            node {
                id
            name {
                full
                native
            }
            image {
                large
            }
        }
        voiceActors(language: JAPANESE) {
          id
          name {
            full
            native
          }
          image {
            large
          }
          languageV2
        }
      }
    }
  }
}
    """

    # variables that will be used to get the anime by its id
    variables = {"id": anime_id}

    # send the query to the Ani-list api
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://graphql.anilist.co",
                json={"query": query, "variables": variables},
                headers={"Content-Type": "application/json"},
            )
            response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx) if one happens
            data = response.json()

            # return the data needed for the anime pages
            return data

        # More specific error handling
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"AniList API error: {e.response.text}",
            )
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Request error: {e}")
