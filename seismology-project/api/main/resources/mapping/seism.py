from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field, fields
from main.models import SeismModel
from main.resources import SensorSchema


class Seism(SQLAlchemySchema):
    class Meta:
        model = SeismModel
        include_relationships = True
        load_instance = True
        ordered = True

    id_num = auto_field(dump_only=True)  # Read from db only
    datetime = auto_field(format="%Y-%m-%d %H:%M:%S", required=True)
    depth = auto_field(required=True)
    magnitude = auto_field(required=True)
    latitude = auto_field(required=True)
    longitude = auto_field(required=True)
    verified = auto_field(required=True)
    sensor_id = auto_field(required=True, load_only=True)
    sensor = fields.Nested(SensorSchema, dump_only=True)  # Read from db only
