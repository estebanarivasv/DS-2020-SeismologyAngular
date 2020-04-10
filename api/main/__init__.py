import os

from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

import main.resources as resources

api = Api()
db = SQLAlchemy()


def create_app():

    app = Flask(__name__)

    load_dotenv()

    if not os.path.exists(os.getenv('SQLALCHEMY_DATABASE_PATH') + os.getenv('SQLALCHEMY_DATABASE_NAME')):
        os.mknod(os.getenv('SQLALCHEMY_DATABASE_PATH') + os.getenv('SQLALCHEMY_DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_TRACK_URI'] = 'sqlite:////' + os.getenv('SQLALCHEMY_DATABASE_PATH') + os.getenv('SQLALCHEMY_DATABASE_NAME')

    db.init_app(app)

    api.add_resource(resources.SensorResource, '/sensor/<id_num>')
    api.add_resource(resources.SensorsResource, '/sensors')
    api.add_resource(resources.UnverifiedSeismResource, '/unverified-seism/<id_num>')
    api.add_resource(resources.UnverifiedSeismsResource, '/unverified-seisms')
    api.add_resource(resources.VerifiedSeismResource, '/verified-seism/<id_num>')
    api.add_resource(resources.VerifiedSeismsResource, '/verified-seisms')

    api.init_app(app)

    return app

