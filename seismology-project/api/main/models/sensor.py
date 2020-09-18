from main.extensions import db

class Sensor(db.Model):
    id_num = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ip = db.Column(db.String(50), nullable=False)
    port = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id_num"), nullable=True)
    user = db.relationship("User", back_populates="sensors", uselist=False, single_parent=True)
    seisms = db.relationship("Seism", back_populates="sensor", passive_deletes="all", single_parent=True)

    def __repr__(self):
        return f'<Sensor {self.id_num} {self.name} >'
