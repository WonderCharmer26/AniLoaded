import httpx  # for handling the requests on the backend to get data from the Ani-list api
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from schemas.category_requests import CategoryFilter
from utilities.cache import get_cache, set_cache
from utilities.genreFunctions import ANILIST_URL, get_cached_genre
from utilities.seasonFunctions import get_cached_seasons

router = APIRouter()

# Constant times for the cache
CATEGORIES_CACHE_TTL_SECONDS = 300
POPULAR_CACHE_TTL_SECONDS = 600
TRENDING_CACHE_TTL_SECONDS = 600
TOP_CACHE_TTL_SECONDS = 600
ANIME_BY_ID_CACHE_TTL_SECONDS = 1800


def build_cache_key(prefix: str, **parts: object) -> str:
    ordered_parts = [f"{key}={parts[key]}" for key in sorted(parts)]
    if not ordered_parts:
        return prefix
    return f"{prefix}:{':'.join(ordered_parts)}"


# route to get genres from AniList (might update the params to get the genre and pass it in to fetch from the anilist)
@router.get("/anime/genres")
async def get_genres():
    """Fetch all genres from AniList and return cached list."""
    return {"genres": await get_cached_genre()}


# route to get the seasons from the backend (might update the params to get the genre and pass it in to fetch from the anilist)
@router.get("/anime/seasons")
async def get_seasons():
    """Fetch all seasons from AniList and return cached list."""
    return {"seasons": await get_cached_seasons()}


# route to get the filtered anime options from AniList
@router.get("/anime/categories")
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
    if filters.perPage:
        variables["perPage"] = filters.perPage

    cache_key = build_cache_key(
        "anime:categories",
        genres=filters.genres or "",
        page=variables.get("page", 1),
        perPage=variables.get("perPage", 10),
        search=filters.search or "",
        season=filters.season or "",
        sort=variables["sort"][0],
    )
    cached_data = get_cache(cache_key)
    if cached_data is not None:
        return cached_data

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

            set_cache(cache_key, data, CATEGORIES_CACHE_TTL_SECONDS)

            # otherwise return the data
            return data

        except httpx.HTTPStatusError as error:
            raise HTTPException(status_code=404, detail=f"The error is: {error}")


# route to get the popular anime from Ani-list
@router.get("/anime/popular")
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

    cache_key = build_cache_key(
        "anime:popular", page=variables["page"], perPage=variables["perPage"]
    )
    cached_data = get_cache(cache_key)
    if cached_data is not None:
        return cached_data

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

            set_cache(cache_key, data, POPULAR_CACHE_TTL_SECONDS)

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
@router.get("/anime/trending")
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

    cache_key = build_cache_key(
        "anime:trending", page=variables["page"], perPage=variables["perPage"]
    )
    cached_data = get_cache(cache_key)
    if cached_data is not None:
        return cached_data

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

            set_cache(cache_key, data, TRENDING_CACHE_TTL_SECONDS)

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
@router.get("/anime/top")  # get all the top anime (no parameters needed)
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

    cache_key = build_cache_key(
        "anime:top", page=variables["page"], perPage=variables["perPage"]
    )
    cached_data = get_cache(cache_key)
    if cached_data is not None:
        return cached_data

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

            set_cache(cache_key, data, TOP_CACHE_TTL_SECONDS)

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
@router.get("/anime/{anime_id}")
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

    cache_key = build_cache_key("anime:by_id", anime_id=anime_id)
    cached_data = get_cache(cache_key)
    if cached_data is not None:
        return cached_data

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

            set_cache(cache_key, data, ANIME_BY_ID_CACHE_TTL_SECONDS)

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
