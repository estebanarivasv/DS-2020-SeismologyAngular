from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_apscheduler import APScheduler

# Database principal initialization
db = SQLAlchemy()

# Authentication handler principal initialization
jwt = JWTManager()

# Outgoing server sender principal initialization
out_server_sender = Mail()

# Python scheduler principal initialization
scheduler = APScheduler()
