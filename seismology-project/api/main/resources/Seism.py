from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt_claims
from random import randint, uniform
from datetime import datetime

from main.extensions.extensions import db
from main.models import SeismModel
from main.models.Sensor import Sensor as SensorModel
from main.authentication import admin_login_required
from main.map import SeismSchema
from main.resources.Pagination import PaginationResource

seism_schema = SeismSchema()
seisms_schema = SeismSchema(many=True)


class VerifiedSeism(Resource):

    def get(self, id_num):
        verified_seism = db.session.query(SeismModel).get_or_404(id_num)
        return seism_schema.dump(verified_seism)

    @admin_login_required
    def put(self, id_num):
        verified_seism = db.session.query(SeismModel).get_or_404(id_num)
        data = request.get_json().items()
        for key, value in data:
            if key == 'datetime':
                setattr(verified_seism, key, datetime.strptime(value, "%Y-%m-%d %H:%M:%S"))
            else:
                setattr(verified_seism, key, value)

        db.session.add(verified_seism)
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            return '', 409
        return seism_schema.dump(verified_seism), 201


class VerifiedSeisms(Resource):

    # Define filters, sorting, pagination

    def get(self):
        query = db.session.query(SeismModel).filter(SeismModel.verified == True)
        page_number = 1
        elem_per_page = 25
        pag = PaginationResource(query, page_number, elem_per_page)
        for key, value in request.get_json().items():
            query = pag.apply(key, value)
        query, pagination = pag.pagination()
        return seisms_schema.dump(query.all())

    @admin_login_required
    def post(self):
        seism = SeismModel(
            datetime=datetime(
                randint(2000, 2020),
                randint(1, 12),
                randint(1, 28),
                randint(00, 23),
                randint(0, 59),
                randint(0, 59)
            ),
            depth=randint(5, 250),
            magnitude=round(uniform(2.0, 5.5), 1),
            latitude=uniform(-90, 90),
            longitude=uniform(-180, 180),
            verified=True,
            sensor_id=2
        )
        db.session.add(seism)
        db.session.commit()
        return seism_schema.dump(seism), 201


class UnverifiedSeism(Resource):

    @jwt_required
    def get(self, id_num):
        unverified_seism = db.session.query(SeismModel).get_or_404(id_num)
        return seism_schema.dump(unverified_seism)

    @jwt_required
    def delete(self, id_num):
        unverified_seism = db.session.query(SeismModel).get_or_404(id_num)
        db.session.delete(unverified_seism)
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            return '', 409
        return '', 204

    @jwt_required
    def put(self, id_num):
        unverified_seism = db.session.query(SeismModel).get_or_404(id_num)
        data = request.get_json().items()
        for key, value in data:
            if key == 'datetime':
                setattr(unverified_seism, key, datetime.strptime(value, "%Y-%m-%d %H:%M:%S"))
            else:
                setattr(unverified_seism, key, value)
        db.session.add(unverified_seism)
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            return '', 409
        return seism_schema.dump(unverified_seism), 201


class UnverifiedSeisms(Resource):

    @jwt_required
    def get(self):
        page_number = 1
        elem_per_page = 10

        # We obtain the user's identity and the JWT claims. We filter the seisms for assigned for the logged user
        user_id = int(get_jwt_identity())
        claims = get_jwt_claims()

        # Filters in unverified_seisms
        query = db.session.query(SeismModel).filter(SeismModel.verified == False)

        if not claims['admin']:
            # Filters the left associated seisms with the seismologist
            query = query.filter(SensorModel.user_id == user_id)

        pag = PaginationResource(query, page_number, elem_per_page)
        for key, value in request.get_json().items():
            query = pag.apply(key, value)
        query, pagination = pag.pagination()
        return seisms_schema.dump(query.all())

    @admin_login_required
    def post(self):
        seism = SeismModel(
            datetime=datetime(
                randint(2000, 2020),
                randint(1, 12),
                randint(1, 28),
                randint(00, 23),
                randint(0, 59),
                randint(0, 59)
            ),
            depth=randint(5, 250),
            magnitude=round(uniform(2.0, 5.5), 1),
            latitude=uniform(-90, 90),
            longitude=uniform(-180, 180),
            verified=False,
            sensor_id=2
        )
        db.session.add(seism)
        db.session.commit()
        return seism_schema.dump(seism), 201
