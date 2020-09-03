from main.extensions.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    id_num = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, index=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    admin = db.Column(db.Boolean, nullable=False)
    sensors = db.relationship("Sensor", back_populates="user")

    # Password security management
    @property
    def plain_password(self):
        raise AttributeError("The password can not be obtained. It is strictly prohibited.")
        # We won't obtain the password accessing with a get method

    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)
        # We encrypt the plain text password from the JSON received in the user registration

    def validate_password(self, password):
        return check_password_hash(self.password, password)
        # Compares the received password with the database password

    # User object representation
    def __repr__(self):
        return '<User: %r >' % self.email