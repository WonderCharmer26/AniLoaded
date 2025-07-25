# AniLoaded

# Create your virtual environment

python -m venv venv

# Activate virtual environment

## Since we're on Mac:

source venv/bin/activate

# Install Dependencies

pip install -r requirements.txt

# If your installing any other packages

pip install package-name
pip freeze > requirements.txt
git add requirements.txt
git commit -m "Add package-name dependency"

# After your done working

type "deactivate" in the same terminal you opened to launch the venv

