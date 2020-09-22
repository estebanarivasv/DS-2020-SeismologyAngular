from .resources import send_mail
from .resources import Mail as MailRepository
from main.extensions import db

from flask import Blueprint

mail = Blueprint('sensors', __name__, url_prefix='/sensors')


# Sends an email with the sensors that are not working anymore to the software administrator
@mail.route('/status', methods=['GET'])
def get():
    repo = MailRepository(session=db)

    stopped_sensors, admins_mail = repo.get_all()
    subject = "Sensors not working at the moment"
    t_dir = "mail/sensors_status"

    # Turning emails into an array
    recipients = [email for email, in admins_mail]

    for to in recipients:
        sent = send_mail(to=to, subject=subject, template_directory=t_dir, sensors=stopped_sensors)
        try:
            if sent:
                return 'The email/emails has been sent.', 200
            else:
                return str(sent), 502
        except Exception as error:
            return str(error), 409
