from marshmallow import validate
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from main.models import UserModel


class User(SQLAlchemySchema):
    class Meta:
        model = UserModel
        include_relationships = True
        load_instance = True

    id_num = auto_field(dump_only=True)  # Read from db only
    email = auto_field(required=True, validate=validate.Email())
    admin = auto_field(required=True)
