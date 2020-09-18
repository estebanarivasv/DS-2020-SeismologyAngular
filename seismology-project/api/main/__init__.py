import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore

# Importing blueprints and resources
from main.resources import PaginationResource
from main.resources import UserResource, UsersResource
from main.resources import UnverifiedSeismResource, UnverifiedSeismsResource
from main.resources import VerifiedSeismResource, VerifiedSeismsResource
from main.resources import SensorResource, SensorsResource
from main.authentication import auth_blueprint
from main.mail import stopped_sensors_blueprint

from main.extensions.extensions import db, jwt, out_server_sender, scheduler

# Flask API RESTFUL principal initialization
api = Api()

db_path = str(os.getenv('SQLALCHEMY_DB_PATH'))
db_name = str(os.getenv('SQLALCHEMY_DB_NAME'))

db_url = "sqlite:////" + db_path + db_name

class Config(object):
    SCHEDULER_JOBSTORES = {
        'default': SQLAlchemyJobStore(url=db_url)
        }
    SCHEDULER_API_ENABLED = True

# Function that activates primary keys recognition in the SQLite DB
def activate_primary_keys(connection, connection_record):
    connection.execute('pragma foreign_keys=ON')


# Function that creates an instance of the Flask application, summing other complements
def create_app():
    # Flask app initialization
    app = Flask(__name__)

    app.config.from_object(Config())

    # Loading environment variables
    load_dotenv()

    

    # Creating database
    if not os.path.exists(db_path + db_name):
        os.mknod(db_path + db_name)

    # Database configuration
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = bool(os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS'))
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url

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
    api.add_resource(SensorResource, '/sensor/<id_num>')
    api.add_resource(SensorsResource, '/sensors')
    api.add_resource(UnverifiedSeismResource, '/unverified-seism/<id_num>')
    api.add_resource(UnverifiedSeismsResource, '/unverified-seisms')
    api.add_resource(VerifiedSeismResource, '/verified-seism/<id_num>')
    api.add_resource(VerifiedSeismsResource, '/verified-seisms')
    api.add_resource(UserResource, '/user/<id_num>')
    api.add_resource(UsersResource, '/users')

    # Defining blueprints for each blueprint
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(stopped_sensors_blueprint)

    # Final app initialization
    api.init_app(app)

    return app
