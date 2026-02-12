# backend will be built in this file

# NOTE: Ani-list api has a rate limit of 90 for one minute
# NOTE: fastapi in the requirements not installed globally

# imports
import os
from dotenv import load_dotenv
from logging import Logger
import uuid
import httpx  # for handling the requests on the backend to get data from the Ani-list api
from fastapi import Depends, FastAPI, File, Form, UploadFile
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas.category_requests import CategoryFilter
from schemas.discussions import DiscussionsResponse
from utilities.fileFunctions import ext_from_filename
from utilities.genreFunctions import ANILIST_URL, get_cached_genre
from utilities.seasonFunctions import get_cached_seasons

# from dotenv import load_dotenv
from database.supabase_client import supabase


load_dotenv()

# .env import variables will be added in later
storage_key_discussion = os.getenv("STORAGE_KEY_DISCUSSION")


# create the app object
app = FastAPI()

# add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,  # this is the middleware
    allow_origins=[
        "http://localhost:5173"
        # "*"
    ],  # allow all origins (change to site url later on in prod)
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


# route to get genres from AniList (might update the params to get the genre and pass it in to fetch from the anilist)
@app.get("/anime/genres")
async def get_genres():
    """Fetch all genres from AniList and return cached list."""
    return {"genres": await get_cached_genre()}


# route to get the seasons from the backend (might update the params to get the genre and pass it in to fetch from the anilist)


@app.get("/anime/seasons")
async def get_seasons():
    """Fetch all seasons from AniList and return cached list."""
    return {"seasons": await get_cached_seasons()}


# route to get the filtered anime options from AniList
@app.get("/anime/categories")
async def get_categories(filters: CategoryFilter = Depends()):
    # filter is set up in a seperate schema file

    variables: dict[str] = {}  # initialize variables to store the parameters

    # check if filters are sent as params in the request
    if filters.search:
        variables["search"] = filters.search

    # set the sorting bases on if search is used
    variables["sort"] = ["SEARCH_MATCH"] if filters.search else ["POPULARITY_DESC"]

    if filters.genres:
        # store the variables in the dict
        variables["genres"] = [filters.genres]  # package as an array
    if filters.season:
        # store the variables in the dict
        variables["season"] = filters.season
    # account for the pages params if there are any
    if filters.page:
        variables["page"] = filters.page
    # NOTE: Might not use the perPage section, might harwire in the backend
    if filters.perPage:
        variables["perPage"] = filters.perPage

    # query for anilist (genre and season passed into the query)
    # NOTE: ADD IN PAGINATION SO THAT THERE ARE ONLY A VIEW ANIME PER PAGE AND THE USER CAN SCOURE THROUGH THE REST
    query = """
    query($search: String, $sort: [MediaSort], $perPage: Int, $page: Int, $genres: [String], $season: MediaSeason) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                hasNextPage
                perPage
            }
            media(search: $search, type: ANIME, genre_in: $genres, season: $season, sort: $sort){
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
                season
                averageScore
                status(version: 2)
            } 
        }
    }
    """

    # use pass in the variables and make the request
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                ANILIST_URL,
                json={
                    "query": query,
                    "variables": variables,  # variables used if there are any
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


# TODO: MAKE A ROUTE FOR THE SPECIFIC DISCUSSION PAGE TO GET THE DISCUSSION FROM THE DB
@app.get("/discussions", response_model=DiscussionsResponse)
async def get_discussions():
    """
    This function returns all the discussions for the discussions page
    """
    try:
        # get all the discussions
        response = supabase.table("discussions").select("*").execute()

        # test

        # return data
        return {
            "data": response.data,
            "total": len(response.data),
        }  # add in total for pagination later on
    # might change the error message for better logging
    except Exception as e:
        raise e


# Route to get a specific discussion by ID
@app.get("/discussions/{discussion_id}")
async def get_discussion_by_id(discussion_id: str):
    """
    This function returns a specific discussion by its ID
    """
    try:
        # Get the discussion by id from the database
        response = (
            supabase.table("discussions")
            .select("*")
            .eq("id", discussion_id)
            .single()
            .execute()
        )

        # Check if discussion exists
        if not response.data:
            raise HTTPException(
                status_code=404, detail=f"Discussion with id {discussion_id} not found"
            )

        return response.data

    except Exception as e:
        # Handle supabase errors
        if hasattr(e, "code") and e.code == "PGRST116":
            raise HTTPException(
                status_code=404, detail=f"Discussion with id {discussion_id} not found"
            )
        raise HTTPException(
            status_code=500, detail=f"Error fetching discussion: {str(e)}"
        )


# Route to get comments for a specific discussion
@app.get("/discussions/{discussion_id}/comments")
async def get_discussion_comments(discussion_id: str):
    """
    This function returns all comments for a specific discussion
    """
    try:
        # Get all comments for the discussion
        response = (
            supabase.table("discussions_comments")
            .select("*")
            .eq("discussion_id", discussion_id)
            .order("created_at", desc=False)  # Oldest first
            .execute()
        )

        return {"data": response.data, "total": len(response.data)}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching comments: {str(e)}"
        )


# Route for making new discussions
@app.post("/discussion")
async def post_new_discussion(
    title: str = Form(...),
    body: str = Form(...),
    is_spoiler: bool = Form(...),
    is_locked: bool = Form(...),
    thumbnail: UploadFile | None = File(None),
    episode_number: int | None = Form(None),
    season_number: int | None = Form(None),
):
    # store the thumbnail in order to send off
    thumbnail_path = None
    thumbnail_public_url = None
    # check if there is a thumbnail
    if thumbnail is not None:
        # allowed types
        allowed = {"image/jpeg", "image/png", "image/webp"}
        # check to see if the file type is allowed
        if thumbnail.content_type not in allowed:
            raise HTTPException(
                status_code=415, detail="Thumnail must be a png, jpeg or webp file"
            )
        file_bytes = await thumbnail.read()

        # make the max bytes 5mb
        max_bytes = 5 * 1024 * 1024
        if len(file_bytes) > max_bytes:
            raise HTTPException(
                status_code=413,
                detail="Thumbnail is too large to be uploaded (max: 5mb)",
            )
        # get the file type from the name
        ext = ext_from_filename(thumbnail.filename or "")

        if not ext:
            # make which ever one matches the content type
            ext = {
                "image/jpeg": ".jpg",
                "image/png": ".png",
                "image/webp": ".webp",
            }[thumbnail.content_type]

        # create uniqe file path to send to the bucket
        thumbnail_path = f"threads/{uuid.uuid4().hex}{ext}"

        try:
            supabase.storage.from_(storage_key_discussion).upload(
                path=thumbnail_path,  # custom file path
                file=file_bytes,  # file bytes that get stored up
                file_options={"content-type": thumbnail.content_type, "upsert": False},
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Upload of file failed: {e}")

        try:
            # try to get the public url to store into the database
            thumbnail_public_url = supabase.storage.from_(
                storage_key_discussion
            ).get_public_url(thumbnail_path)
        except Exception:
            # if not store none seeing as there must be no thumbnail posted
            thumbnail_public_url = None

    # Payload that i'll send back
    payload = {
        "title": title.strip(),  # get rid of extra spaces (might change)
        "body": body.strip(),
        "is_spoiler": is_spoiler,
        "is_locked": is_locked,
        "thumbnail_path": thumbnail_path,
        "thumbnail_url": thumbnail_public_url,
    }

    # try to send the needed data to the database
    try:
        # add the data from the request to the database
        res = supabase.table("discussions").insert(payload).execute()
    except Exception as e:
        # if there is a path for the thumbnail
        if thumbnail_path:
            try:
                # remove the file if it fails to add to the database
                supabase.storage.from_(storage_key_discussion).remove([thumbnail_path])
            except Exception:
                # doesn't matter
                pass
        # return a regular failed message
        raise HTTPException(status_code=500, detail=f"DB insert failed: {e}")

    # store the data to return to validate success
    success = (res.data or None)[0]

    # return the data
    return {"discussion": success}


# TODO: MAKE A ROUTE FOR THE SPECIFIC DISCUSSION PAGE TO POST DISCUSSIONS TO THE DB
