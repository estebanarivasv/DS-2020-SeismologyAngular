from main.extensions import db
from main.resources.mapping import SeismSchema
from main.models import SeismModel
from main.repositories import DBRepository

schema = SeismSchema()

class Seism(DBRepository):
    def __init__(self, id_num):
        self.__id_num = id_num
        self.__seism_model = SeismModel

    def add(self, param={}):
        seism = schema.load(param)
        db.session.add(seism)
        try:
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            return False

    def get(self):
        pass

    def get_or_404(self):
        pass

    def get_all(self):
        pass

    def delete(self):
        pass