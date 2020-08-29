from flask_restful import Resource
from flask import request
from marshmallow import validate

from main import db
from main.models import UserModel
from main.authentication import admin_login_required
from main.map import UserSchema
from main.resources.Pagination import PaginationResource

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class User(Resource):

    @admin_login_required
    def get(self, id_num):
        user = db.session.query(UserModel).get_or_404(id_num)
        return user_schema.dump(user)

    @admin_login_required
    def delete(self, id_num):
        user = db.session.query(UserModel).get_or_404(id_num)
        db.session.delete(user)
        try:
            db.session.commit()
            return 'User deleted', 204
        except Exception as e:
            db.session.rollback()
            return e, 409

    @admin_login_required
    def put(self, id_num):
        user = db.session.query(UserModel).get_or_404(id_num)
        user_json = request.get_json().items()
        for key, values in user_json:
            setattr(user, key, values)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return e, 409
        return user_schema.dump(user), 201


class Users(Resource):

    @admin_login_required
    def get(self):
        query = db.session.query(UserModel)
        page_number = 1
        elem_per_page = 3
        pag = PaginationResource(query, page_number, elem_per_page)
        for key, value in request.get_json().items():
            query = pag.apply(key, value)
        query, pagination = pag.pagination()
        return users_schema.dump(query.all())

    @admin_login_required
    def post(self):
        try:
            user_json = request.get_json()
            email_exists = db.session.query(UserModel).filter(UserModel.email == user_json["email"]).scalar() is not None
            if email_exists:
                return 'The entered email address has already been registered', 409
            else:
                user = UserModel(
                    email=user_json.get("email"),
                    plain_password=user_json.get("password"),
                    admin=user_json.get("admin")
                )
                db.session.add(user)
                db.session.commit()
                return user_schema.dump(user), 201
        except validate.ValidationError as e:
            return e, 409

"""

def from_json(user_json):
    new_email = user_json.get('email')
    new_password = user_json.get('password')
    new_admin = user_json.get('admin')
    return User(
        email=new_email,
        plain_password=new_password,
        admin=new_admin
    )


"""
