from marshmallow import validate
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from main.models import SeismModel


class Seism(SQLAlchemySchema):
    class Meta:
        model = SeismModel
        include_relationships = True
        load_instance = True
