import os
import sys

# Get the absolute path to the root of the repository
# __file__ is api/index.py
repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
backend_dir = os.path.join(repo_root, 'backend')

# Add backend directory to sys.path so Python can find the Django project
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Import the WSGI application (which is exposed as 'app' in wsgi.py)
from config.wsgi import app
