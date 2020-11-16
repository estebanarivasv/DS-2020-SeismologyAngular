from flask import request
from flask_restful import Resource

from main.repositories import SensorRepository
from main.resources import admin_login_required, get_user_existance
from main.mapping import SensorSchema

sensor_schema = SensorSchema()

"""
    In order to make CRUD methods, we instance the SensorRepository class.
"""


class Sensor(Resource):

    @admin_login_required
    def get(self, id_num):
        sensor_repo = SensorRepository()
        sensor_repo.set_id(id_num)

        return sensor_schema.dump(sensor_repo.get_or_404())

    @admin_login_required
    def delete(self, id_num):
        sensor_repo = SensorRepository()
        sensor_repo.set_id(id_num)
        sensor = sensor_repo.get_or_404()

        sensor_repo.set_instance(sensor)
        return sensor_repo.delete()

    @admin_login_required
    def put(self, id_num):
        sensor_repo = SensorRepository()

        sensor_repo.set_id(id_num)
        sensor = sensor_repo.get_or_404()

        json = request.get_json().items()
        sensor_repo.set_input_json(json=json)
        sensor_repo.set_instance(instance=sensor)

        return sensor_repo.modify()


class Sensors(Resource):

    @admin_login_required
    def get(self):
        sensor_repo = SensorRepository()

        json = request.get_json().items()
        sensor_repo.set_input_json(json=json)

        return sensor_repo.get_all()


    @admin_login_required
    def post(self):
        sensor_repo = SensorRepository()

        if request.get_json():
            json = request.get_json()
            user_exists = get_user_existance(json["user_id"])

            if user_exists:
                sensor_repo.set_addition_json(json=json)
                return sensor_repo.add()
            else:
                return "User not found", 404

        return sensor_repo.add()
