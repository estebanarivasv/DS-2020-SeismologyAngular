"""
CONTROLLERS:
We are working with an MVC structure. The controllers accept json inputs and 
stores or achieve the data from the system's DB.
"""

from .seism import UnverifiedSeism as USeismController
from .seism import UnverifiedSeisms as USeismsController
from .seism import VerifiedSeism as VSeismController
from .seism import VerifiedSeisms as VSeismsController

from .sensor import Sensor as SensorController
from .sensor import Sensors as SensorsController

from .user import User as UserController
from .user import Users as UsersController

from .pagination import Pagination as PagController
