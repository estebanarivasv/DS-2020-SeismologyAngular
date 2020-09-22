from flask_restful import Resource
from flask import request

from main.resources import admin_login_required
from main.resources import UserSchema
from main.resources import get_email_existance

from main.repositories import UserRepository

user_schema = UserSchema()

"""
    In order to make CRUD methods, we instance the USerRepository class.
"""


class User(Resource):

    @admin_login_required
    def get(self, id_num):
        user_repo = UserRepository()
        user_repo.set_id(id_num)

        return user_schema.dump(user_repo.get_or_404())

    @admin_login_required
    def delete(self, id_num):
        user_repo = UserRepository()

        user_repo.set_id(id_num)
        user = user_repo.get_or_404()

        user_repo.set_instance(instance=user)
        return user_repo.delete()

    @admin_login_required
    def put(self, id_num):
        user_repo = UserRepository()

        user_repo.set_id(id_num)
        user = user_repo.get_or_404()
        user_repo.set_instance(user)

        json = request.get_json().items()
        user_repo.set_input_json(json=json)

        return user_repo.modify()


class Users(Resource):

    @admin_login_required
    def get(self):
        user_repo = UserRepository()

        json = request.get_json().items()
        user_repo.set_input_json(json=json)

        return user_repo.get_all()

    @admin_login_required
    def post(self):
        user_repo = UserRepository()

        json = request.get_json()
        get_email_existance(json["email"])

        user_repo.set_addition_json(json=json)
        return user_repo.add()
