

def to_json(self):
    self.user = db.session.query(User).get(self.user_id)
    # Verifies if the user id exists in the database chart
    try:
        sensor_json = {
            'id_num': self.id_num,
            'name': str(self.name),
            'ip': str(self.ip),
            'port': self.port,
            'status': self.status,
            'active': self.active,
            'user': self.user.to_json()
        }
    except AttributeError:
        sensor_json = {
            'id_num': self.id_num,
            'name': str(self.name),
            'ip': str(self.ip),
            'port': self.port,
            'status': self.status,
            'active': self.active,
            'user_id': self.user_id
        }
    return sensor_json

@staticmethod
def from_json(sensor_json):
    new_name = sensor_json.get('name')
    new_ip = sensor_json.get('ip')
    new_port = sensor_json.get('port')
    new_status = sensor_json.get('status')
    new_active = sensor_json.get('active')
    new_user_id = sensor_json.get('user_id')

    return Sensor(
        name=new_name,
        ip=new_ip,
        port=new_port,
        status=new_status,
        active=new_active,
        user_id=new_user_id
    )