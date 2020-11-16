"""
REPOSITORIES: In these functions are displayed the main CRUD methods for the model
that work with the flask-sqlalchemy ORM. 
"""
from .main import DBRepository

from .seism import Seism as SeismRepository

from .sensor import Sensor as SensorRepository
from .user import User as UserRepository
