from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt_claims
import json

from main.resources import admin_login_required, get_admin_status
from main.repositories import SeismRepository
from main.mapping import SeismSchema
from main.resources import get_near_seisms

"""
    In order to make CRUD methods, we instance the SeismRepository class.
"""

seism_schema = SeismSchema()
seisms_schema = SeismSchema(many=True)


class GeneralSeisms(Resource):
    @admin_login_required
    def get(self):
        seism_repo = SeismRepository()
        data = request.get_json()

        ids_list = get_near_seisms(data)

        seisms = []
        for id_num in ids_list:
            seism_repo.set_id(id_num)
            s_dict = seism_schema.dumps(seism_repo.get())
            seisms.append(json.loads(s_dict))

        return jsonify(seisms)


class VerifiedSeism(Resource):

    def get(self, id_num):
        seism_repo = SeismRepository(verified=True)
        seism_repo.set_id(id_num)
        return seism_schema.dump(seism_repo.get_or_404())

    # @admin_login_required
    def put(self, id_num):
        seism_repo = SeismRepository(verified=True)
        seism_repo.set_id(id_num)

        seism = seism_repo.get_or_404()

        # We replace the seism model data for the json data
        json = request.get_json().items()
        seism_repo.set_input_json(json=json)
        seism_repo.set_instance(instance=seism)

        return seism_repo.modify()


class VerifiedSeisms(Resource):

    def get(self):
        seism_repo = SeismRepository(verified=True)

        if request.get_json():
            return "This method does not accept json format", 403

        data = request.args
        seism_repo.set_filters(data=data)

        return seism_repo.get_all()


class UnverifiedSeism(Resource):

    @jwt_required
    def get(self, id_num):
        seism_repo = SeismRepository(verified=False)
        seism_repo.set_id(id_num)

        return seism_schema.dump(seism_repo.get_or_404())

    @jwt_required
    def delete(self, id_num):
        seism_repo = SeismRepository(verified=False)
        seism_repo.set_id(id_num)

        unverified_seism = seism_repo.get_or_404()

        seism_repo.set_instance(unverified_seism)

        return seism_repo.delete()

    @jwt_required
    def put(self, id_num):
        seism_repo = SeismRepository(verified=False)
        seism_repo.set_id(id_num)

        seism = seism_repo.get_or_404()

        json = request.get_json().items()
        seism_repo.set_input_json(json=json)
        seism_repo.set_instance(instance=seism)

        return seism_repo.modify()


class UnverifiedSeisms(Resource):

    @jwt_required
    def get(self):
        seism_repo = SeismRepository(verified=False)

        if request.get_json():
            return "This method does not accept json format", 403

        # We obtain the user's identity and the JWT claims. We filter the seisms for assigned for the logged user

        seism_repo.set_user_id(user_id=int(get_jwt_identity()))
        admin = get_admin_status(get_jwt_claims())
        seism_repo.set_admin_value(value=admin)

        data = request.args
        seism_repo.set_filters(data=data)

        return seism_repo.get_all()
