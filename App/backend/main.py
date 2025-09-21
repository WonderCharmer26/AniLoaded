# backend will be built in this file

# NOTE: Ani-list api has a rate limit of 90 for one minute

# imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
