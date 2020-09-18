from flask_restful import Resource
from flask import request, jsonify

from main.extensions import db
from main.models import SensorModel
from main.models.user import User as UserModel
from main.authentication import admin_login_required
from main.mapping import SensorSchema
from main.resources.Pagination import PaginationResource

sensor_schema = SensorSchema()
sensors_schema = SensorSchema(many=True)


class Sensor(Resource):

    @admin_login_required
    def get(self, id_num):
        sensor = db.session.query(SensorModel).get_or_404(id_num)
        return sensor_schema.dump(sensor)

    @admin_login_required
    def delete(self, id_num):
        sensor = db.session.query(SensorModel).get_or_404(id_num)
        db.session.delete(sensor)
        try:
            db.session.commit()
            return '', 204
        except Exception:
            db.session.rollback()
            return '', 409

    @admin_login_required
    def put(self, id_num):
        sensor = db.session.query(SensorModel).get(id_num)
        sensor_json = request.get_json().items()
        for key, value in sensor_json:
            if key == 'user_id':
                db.session.query(UserModel).get_or_404(value)
                setattr(sensor, key, value)
            else:
                setattr(sensor, key, value)
        db.session.add(sensor)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return e, 409
        return sensor_schema.dump(sensor), 201


class Sensors(Resource):

    @admin_login_required
    def get(self):
        query = db.session.query(SensorModel)
        page_number = 1
        elem_per_page = 25
        pag = PaginationResource(query, page_number, elem_per_page)
        for key, value in request.get_json().items():
            query = pag.apply(key, value)
        query, _pagination = pag.pagination()
        return sensors_schema.dump(query.all())


    @admin_login_required
    def post(self):
        json = request.get_json()
        user_exists = db.session.query(UserModel).filter(UserModel.id_num == json["user_id"]).scalar() is not None
        if not user_exists:
            return "User not found", 404
        else:
            sensor = sensor_schema.load(request.get_json(), session=db.session)
            db.session.add(sensor)
            db.session.commit()
            return sensor_schema.dump(sensor), 201
