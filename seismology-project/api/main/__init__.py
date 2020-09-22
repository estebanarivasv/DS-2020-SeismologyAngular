import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore

# Importing blueprints
from main.controllers import UserController, UsersController
from main.controllers import USeismController, USeismsController
from main.controllers import VSeismController, VSeismsController
from main.controllers import SensorController, SensorsController
from main.resources import auth_blueprint
from main.services.mail_sending import stopped_sensors_blueprint

from main.extensions import db, jwt, out_server_sender, scheduler

# Flask API RESTFUL principal initialization
api = Api()

# Loading environment variables
load_dotenv()

DB_PATH = str(os.getenv("SQLALCHEMY_DB_PATH"))
DB_NAME = str(os.getenv("SQLALCHEMY_DB_NAME"))
DB_URL = "sqlite:////" + DB_PATH + DB_NAME


class Config(object):
    SCHEDULER_JOBSTORES = {
        'default': SQLAlchemyJobStore(url=DB_URL)
    }
    SCHEDULER_API_ENABLED = True


# Function that activates primary keys recognition in the SQLite DB
def activate_primary_keys(connection, _connection_record):
    connection.execute('pragma foreign_keys=ON')


# Function that creates an instance of the Flask application, summing other complements
def create_app():
    # Flask app initialization
    app = Flask(__name__)

    app.config.from_object(Config())

    # Creating database
    if not os.path.exists(DB_PATH + DB_NAME):
        os.mknod(DB_PATH + DB_NAME)

    # Database configuration
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = bool(os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS'))
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL

    # Database initialization in Flask app
    db.init_app(app)

    scheduler.init_app(app)
    scheduler.start()

    @app.before_first_request
    def load_tasks():
        from main.services import tasks

    # Defining secret key for encryption and time of expiration of each access token that will be generated
    app.config['JWT_SECRET_KEY'] = str(os.getenv('JWT_SECRET_KEY'))
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))

    # JWT management initialization in Flask app
    jwt.init_app(app)

    # Defining general configuration for SMTP server
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')

    # Flask mail handler initialization in Flask app
    out_server_sender.init_app(app)

    # When the database is "connected in Flask app, the primary keys will activate"
    with app.app_context():
        from sqlalchemy import event
        event.listen(db.engine, 'connect', activate_primary_keys)

    # Defining urls for each resource
    api.add_resource(SensorController, '/sensor/<id_num>')
    api.add_resource(SensorsController, '/sensors')
    api.add_resource(USeismController, '/unverified-seism/<id_num>')
    api.add_resource(USeismsController, '/unverified-seisms')
    api.add_resource(VSeismController, '/verified-seism/<id_num>')
    api.add_resource(VSeismsController, '/verified-seisms')
    api.add_resource(UserController, '/user/<id_num>')
    api.add_resource(UsersController, '/users')

    # Defining blueprints for each blueprint
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(stopped_sensors_blueprint)

    # Final app initialization
    api.init_app(app)

    return app
