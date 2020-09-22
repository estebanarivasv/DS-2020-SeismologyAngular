from marshmallow import validate

from main.models import UserModel, SeismModel
from main.extensions import db

"""
    We separate the validations from the controllers in order to help the 
    project's modularity
"""


def get_admin_status(claims):
    if claims['admin']:
        return True
    else:
        return False


def get_email_existance(email):
    try:
        email_exists = db.session.query(UserModel).filter(UserModel.email == email).scalar() is not None
        if email_exists:
            return 'The entered email address has already been registered', 409
    except validate.ValidationError as e:
        return e, 409


def get_user_existance(user_id):
    try:
        user_exists = db.session.query(UserModel).filter(UserModel.id_num == user_id).scalar() is not None
        if user_exists:
            return True
        else:
            return False
    except validate.ValidationError as e:
        return e, 409


def get_seism_existance(datetime):
    try:
        seism_exists = db.session.query(SeismModel).filter(SeismModel.datetime == datetime).scalar() is not None
        if seism_exists:
            return True
        else:
            return False
    except validate.ValidationError as e:
        return e, 409
