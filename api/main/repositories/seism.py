from datetime import datetime
from flask import jsonify
from flask import json

from main.extensions import db
from main.models import SeismModel, SensorModel
from main.repositories import DBRepository
from main.resources import PagController, get_seism_existance
from main.mapping import SeismSchema

seism_schema = SeismSchema(session=db.session)
seisms_schema = SeismSchema(many=True, session=db.session)


class Seism(DBRepository):

    def __init__(self, verified=None):
        self.__verified = verified
        self.__id_num = 0
        self.__model_instance = None
        self.__input_json = {}
        self.__url_args = {}
        self.__addition_json = ""
        self.__user_id = 0
        self.__admin = None

    def set_id(self, id_num):
        self.__id_num = id_num

    def set_instance(self, instance):
        self.__model_instance = instance

    def set_input_json(self, json):
        self.__input_json = json

    def set_filters(self, data):
        filter_data = {'filter': []}
        try:
            if data['sort_by'] and data['direction']:
                filter_data['sort_by'] = [{
                    "model": "Seism",
                    "field": str(data['sort_by']),
                    "direction": str(data['direction'])
                }]
        except KeyError:
            if data['sort_by'] and data['direction']:
                filter_data['sort_by'] = [{
                    "model": "Seism",
                    "field": "id_num",
                    "direction": "asc"
                }]

        for key, value in data.items():
            try:
                if key == 'page':
                    filter_data['page'] = value

                if key == 'elem_per_page':
                    filter_data['elem_per_page'] = data['elem_per_page']

                if key == "mag_min":
                    filter_data['filter'].append({"field": "magnitude", "op": ">=", "value": float(data['mag_min'])})

                if key == "mag_max":
                    filter_data['filter'].append({"field": "magnitude", "op": "<=", "value": float(data['mag_max'])})

                if key == "depth_min":
                    filter_data['filter'].append({"field": "depth", "op": ">=", "value": int(data['depth_min'])})

                if key == "depth_max":
                    filter_data['filter'].append({"field": "depth", "op": "<=", "value": int(data['depth_max'])})

                if key == "from_date":
                    filter_data['filter'].append({"field": "datetime", "op": ">=", "value": data['from_date']})

                if key == "to_date":
                    filter_data['filter'].append({"field": "datetime", "op": "<=", "value": data['to_date']})

                if key == "sensor_id":
                    filter_data['filter'].append({"field": "sensor_id", "op": "==", "value": int(data['sensor_id'])})
            except KeyError:
                pass

        self.set_input_json(json=filter_data)

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
        pagination = PagController(seisms, self.__input_json)
        query, pagination = pagination.get_filtered_query()
        return query, pagination

    def get_or_404(self):
        seism = db.session.query(SeismModel).get_or_404(self.__id_num)
        return seism

    def get(self):
        seism = db.session.query(SeismModel).get(self.__id_num)
        return seism

    def get_all(self):
        pag_data = None
        query = None

        if self.__user_id != 0 and self.__admin is not None:
            if not self.__admin:
                query, pag_data = self.get_all_by_seismologist()
        else:
            seisms = self.get_query()
            pagination = PagController(seisms, self.__input_json)
            query, pag_data = pagination.get_filtered_query()

        seisms_dict = {
            'seisms': json.loads(seisms_schema.dumps(query)),
            'pagination': {
                'page_number': pag_data[0],
                'page_size': pag_data[1],
                'num_pages': pag_data[2],
                'total_results': pag_data[3]
            }
        }

        return seisms_dict

    def add(self):
        if self.__addition_json != "":
            instance = seism_schema.loads(self.__addition_json)
            seism_schema.verified = self.__verified
            seism_exists = get_seism_existance(datetime=instance.datetime)
            if seism_exists:
                return 'Seism already exists', 409
            else:
                self.__model_instance = instance

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
