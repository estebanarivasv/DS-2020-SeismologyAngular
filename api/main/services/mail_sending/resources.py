from flask import current_app, render_template
from flask_mail import Message
from smtplib import SMTPException

from main.repositories import DBRepository
from main.models import UserModel, SensorModel
from main.extensions import out_server_sender as mail_sender


class Mail(DBRepository):

    def __init__(self, session):
        self.__db_session = session
        self.__sensors = self.__db_session.query(SensorModel).filter(SensorModel.status == False,
                                                                     SensorModel.active == True)
        self.__recipients = self.__db_session.query(UserModel.email).filter(UserModel.admin == True)

    def get_all(self):
        return self.__sensors, self.__recipients


def send_mail(to, subject, template_directory, **kwargs):
    sender = current_app.config['FLASKY_MAIL_SENDER']
    msg = Message(subject=subject, sender=sender, recipients=[to])
    try:
        # Plain text body template configuration. **kwargs are used by Jinja to display different templates
        msg.body = render_template(template_directory + '.txt', **kwargs)
        
        # HTML body template configuration.
        msg.html = render_template(template_directory + '.html', **kwargs)
        
        mail_sender.send(msg)
        
    except SMTPException:
        print(SMTPException)
        return 'Mail deliver failure'
    return True
