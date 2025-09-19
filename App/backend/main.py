# backend will be built in this file

# NOTE: Ani-list api has a rate limit of 90 for one minute

# imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
