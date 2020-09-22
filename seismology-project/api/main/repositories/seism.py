from datetime import datetime

from main.extensions import db

from main.models import SeismModel, SensorModel
from main.repositories import DBRepository

from main.resources import SeismSchema, UserValidator, PagController

seism_schema = SeismSchema()
seisms_schema = SeismSchema(many=True)

validator = UserValidator


class Seism(DBRepository):

    def __init__(self, verified=None):
        self.__verified = verified
        self.__id_num = 0
        self.__model_instance = None
        self.__input_json = ""
        self.__addition_json = ""
        self.__user_id = 0
        self.__admin = None

    def set_id(self, id_num):
        self.__id_num = id_num

    def set_instance(self, instance):
        self.__model_instance = instance

    def set_input_json(self, json):
        self.__input_json = json

    def set_addition_json(self, json):
        self.__addition_json = json

    def set_user_id(self, user_id):
        self.__user_id = user_id

    def set_admin_value(self, value):
        self.__admin = value

    def get_query(self):
        seism = db.session.query(SeismModel).filter(SeismModel.verified == self.__verified)
        return seism

    def get_all_by_seismologist(self):
        seisms = self.get_query()
        seism = seisms.filter(SensorModel.user_id == self.__user_id)
        return seism

    def get_or_404(self):
        seism = db.session.query(SeismModel).get_or_404(self.__id_num)
        return seism

    def get(self):
        seism = db.session.query(SeismModel).get(self.__id_num)
        return seism

    def get_all(self):
        page_number = 1
        if self.__verified is False:
            elem_per_page = 10
        else:
            elem_per_page = 25

        seisms = self.get_query()

        pag = PagController(seisms, page_number, elem_per_page)

        if self.__user_id != 0 and self.__admin is not None:
            if not self.__admin:
                seisms = self.get_all_by_seismologist()
        else:
            seisms = self.get_query()

        # We get the json and apply filters and sorting
        for key, value in self.__input_json:
            seisms = pag.apply(key, value)

        # We apply the pagination
        seisms, _pagination = pag.pagination()
        return seisms_schema.dump(seisms.all())

    def add(self):
        if self.__addition_json != "":
            self.__model_instance = seism_schema.load(self.__addition_json, session=db.session)

        if self.__model_instance is not None:
            db.session.add(self.__model_instance)
            try:
                db.session.commit()
                return seism_schema.dump(self.__model_instance), 201
            except Exception as error:
                db.session.rollback()
                print("\nSeism addition error: ", error)
                return 'Error making the HTTP method', 409

    def modify(self):
        if self.__model_instance is not None:
            for key, value in self.__input_json:
                if key == 'datetime':
                    setattr(self.__model_instance, key, datetime.strptime(value, "%Y-%m-%d %H:%M:%S"))
                else:
                    setattr(self.__model_instance, key, value)
            return self.add()

    def delete(self):
        if self.__model_instance is not None:
            db.session.delete(self.__model_instance)
            try:
                db.session.commit()
                return 'Success deleting seism', 204
            except Exception as error:
                db.session.rollback()
                print("\nSeism deletion error: ", error)
                return 'Error making the HTTP method', 409
