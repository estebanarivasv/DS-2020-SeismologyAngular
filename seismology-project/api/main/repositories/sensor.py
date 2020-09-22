from main.extensions import db
from main.models import SensorModel
from main.repositories import DBRepository
from main.repositories.user import User as UserRepository
from main.resources import SensorSchema, PagController

sensor_schema = SensorSchema()
sensors_schema = SensorSchema(many=True)


class Sensor(DBRepository):
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
        sensor = db.session.query(SensorModel)
        return sensor

    def get_sensor_id_list(self):
        if self.__db_session is not None:
            id_list = []
            sensors = self.__db_session.query(SensorModel).all()
            for sensor in sensors:
                id_list.append(sensor.id_num)
            return id_list

    def get_or_404(self):
        sensor = db.session.query(SensorModel).get_or_404(self.__id_num)
        return sensor

    def get(self):
        sensor = db.session.query(SensorModel).get(self.__id_num)
        return sensor

    def get_all(self):
        page_number = 1
        elem_per_page = 25

        sensors = self.get_query()

        pag = PagController(sensors, page_number, elem_per_page)

        for key, value in self.__input_json:
            sensors = pag.apply(key, value)

        sensors, _pagination = pag.pagination()

        return sensors_schema.dump(sensors.all())

    def add(self):
        if self.__addition_json != "":
            self.__model_instance = sensor_schema.load(self.__addition_json, session=db.session)

        if self.__model_instance is not None:
            db.session.add(self.__model_instance)
            try:
                db.session.commit()
                return sensor_schema.dump(self.__model_instance), 201
            except Exception as error:
                db.session.rollback()
                print("\nSensor addition error: ", error)
                return "Error in HTTP Method", 409

    def modify(self):
        if self.__model_instance is not None:
            for key, value in self.__input_json:
                if key == 'user_id':
                    user_repo = UserRepository()
                    user_repo.set_id(value)

                    user_repo.get_or_404()

                    setattr(self.__model_instance, key, value)
                else:
                    setattr(self.__model_instance, key, value)
            return self.add()

    def delete(self):
        if self.__model_instance is not None:
            db.session.delete(self.__model_instance)
            try:
                db.session.commit()
                return 'Successful sensor deletion', 204
            except Exception as error:
                db.session.rollback()
                print("\nSensor deletion error: ", error)
                return 'Error making the HTTP method', 409
