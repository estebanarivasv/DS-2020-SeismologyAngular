from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field, fields
from main.models import SensorModel
from main.resources import UserSchema


class Sensor(SQLAlchemySchema):
    class Meta:
        model = SensorModel
        include_relationships = True
        load_instance = True
        ordered = True

    id_num = auto_field(dump_only=True)  # Read from db only
    name = auto_field(required=True)
    active = auto_field(required=True)
    ip = auto_field(required=True)
    port = auto_field(required=True)
    status = auto_field(required=True)
    user_id = auto_field(required=True, load_only=True)
    user = fields.Nested(UserSchema, dump_only=True)  # Read from db only
