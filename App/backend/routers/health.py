from fastapi import APIRouter

router = APIRouter()


# test route to check the connection for the backend (removing later)
@router.get("/")
def root():
    return {"test_message": "This is a test message to show the backend is working"}
