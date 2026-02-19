import os
import uuid
from dotenv import load_dotenv
from fastapi import APIRouter, File, Form, UploadFile
from fastapi.exceptions import HTTPException
from database.supabase_client import supabase
from schemas.discussions import DiscussionsResponse
from utilities.fileFunctions import ext_from_filename


# Api router
router = APIRouter()

# load in env
load_dotenv()

# key for the storage container in supabase
storage_key_discussion = os.getenv("STORAGE_KEY_DISCUSSION")

print(storage_key_discussion)


# gets all the discussions from the database
@router.get("/discussions", response_model=DiscussionsResponse)
async def get_discussions():
    """
    This function returns all the discussions for the discussions page
    """
    try:
        # get all the discussions
        response = supabase.table("discussions").select("*").execute()

        # return data
        return {
            "data": response.data,
            "total": len(response.data),
        }  # add in total for pagination later on
    # might change the error message for better logging
    except Exception as e:
        raise e


# Route to get a specific discussion by ID
@router.get("/discussions/{discussion_id}")
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
@router.get("/discussions/{discussion_id}/comments")
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
@router.post("/discussion")
async def post_new_discussion(
    # get the form info from frontend
    category_id: str = Form(...),
    title: str = Form(...),
    body: str = Form(...),
    is_spoiler: bool = Form(...),
    is_locked: bool = Form(...),
    thumbnail: UploadFile | None = File(None),  # optional params
    episode_number: int | None = Form(None),  # optional params
    season_number: int | None = Form(None),  # optional params
):
    # variables to hold the thumbnail info
    thumbnail_path = None
    thumbnail_public_url = None

    # check if there is a thumbnail in the request
    if thumbnail is not None:
        # allowed types for the file sent (might not need)
        allowed = {"image/jpeg", "image/png", "image/webp"}
        # check to see if the file type is allowed
        if thumbnail.content_type not in allowed:
            raise HTTPException(
                status_code=415, detail="Thumnail must be a png, jpeg or webp file"
            )
        # store the thumbnail
        file_bytes = await thumbnail.read()

        # make the max bytes 5mb to help with storage (might make bigger)
        max_bytes = 5 * 1024 * 1024
        # make sure the file size is not bigger than the allowed
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
            # upload the thumbnail to the storage bucket
            supabase.storage.from_(storage_key_discussion).upload(
                path=thumbnail_path,  # custom file path
                file=file_bytes,  # file bytes that get stored up
                file_options={"content-type": thumbnail.content_type, "upsert": False},
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Upload of file failed: {e}")

        try:
            # try to get the public url to send to database to help link database to bucket
            thumbnail_public_url = supabase.storage.from_(
                storage_key_discussion
            ).get_public_url(thumbnail_path)
        except Exception:
            # if not store none seeing as there must be no thumbnail posted
            thumbnail_public_url = None

    # Payload that i'll send to the database
    payload = {
        "category_id": category_id,
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
