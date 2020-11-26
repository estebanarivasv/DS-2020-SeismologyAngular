import json

from flask import jsonify

from main.extensions import db

from main.models import UserModel
from main.repositories import DBRepository
from main.resources import PagController
from main.mapping import UserSchema

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class User(DBRepository):
    __id_num = 0
    __model_instance = None
    __input_json = ""
    __addition_json = ""
    __db_session = None

    def set_id(self, id_num):
        self.__id_num = id_num

    def set_instance(self, instance):
        self.__model_instance = instance

    def set_input_json(self, json):
        self.__input_json = json

    def set_addition_json(self, json):
        self.__addition_json = json

    def set_db_session(self, session):
        self.__db_session = session

    def get_query(self):
        user = db.session.query(UserModel)
        return user

    def get_or_404(self):
        user = db.session.query(UserModel).get_or_404(self.__id_num)
        return user

    def get(self):
        user = db.session.query(UserModel).get(self.__id_num)
        return user

    def get_all(self):

        return users_schema.dump(self.get_query().all())

    def get_users_id_list(self):
        if self.__db_session is not None:
            users = db.session.query(UserModel).all()
            u_ids_list = []
            for user in users:
                u_ids_list.append(user.id_num)
            return u_ids_list

    def add(self):
        if self.__addition_json != "":
            instance = UserModel(
                email=self.__addition_json.get("email"),
                plain_password=self.__addition_json.get("password"),
                admin=self.__addition_json.get("admin")
            )
            self.__model_instance = instance

        if self.__model_instance is not None:
            db.session.add(self.__model_instance)
            try:
                db.session.commit()
                return user_schema.dump(self.__model_instance), 201
            except Exception as error:
                db.session.rollback()
                print("\nUser operation error: ", error)
                return 'Error in operation', 409

    def modify(self):
        if self.__model_instance is not None:
            for key, values in self.__input_json:
                setattr(self.__model_instance, key, values)
            return self.add()

    def delete(self):
        if self.__model_instance is not None:
            db.session.delete(self.__model_instance)
            try:
                db.session.commit()
                return 'User deleted', 204
            except Exception as error:
                db.session.rollback()
                print("\nUser deletion error: ", error)
                return 'Error deleting user', 409
