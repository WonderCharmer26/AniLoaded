# backend will be built in this file

# NOTE: Ani-list api has a rate limit of 90 for one minute

# imports
from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx  # for handling the requests on the backend to get data from the Ani-list api

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
    allow_methods=["*"],  # this means allow all methods
    allow_headers=["*"],  # this means allow all headers
)


# test route to check the connection for the backend (removing later)
@app.get("/")
def root():
    return {"test_message": "This is a test message to show the backend is working"}


# route to get the trending anime from Ani-list
@app.get("/trending")
async def get_trending_anime():
    # set up the query to get the trending anime
    query = """

    query ($perPage: Int, $page: Int) {
        Page(page: $page, perPage: $perPage) {
           media(type: ANIME, sort: TRENDING_DESC) {
               id
               title {
                romanji
                english
                native
               }      
               episodes
               coverImage
               large
           } 
        }        
    }"""

    # variables that can be used to get the amount of items that I want
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
            # package the data in a variable to send
            data = response.json()

            # return the data
            return data

        # log the error if it fails
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=str(f"There was an error: {e}"))
