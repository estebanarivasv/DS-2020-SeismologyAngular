from celery import Celery


"""
    Celery instance, this is called the celery application
    
    For instance you can place this in a tasks module. While you can use Celery without any reconfiguration with 
    Flask, it becomes a bit nicer by subclassing tasks and adding support for Flask’s application contexts and 
    hooking it up with the Flask configuration. 


"""
def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery


"""
task example
"""

from flask import Flask

flask_app = Flask(__name__)
flask_app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)
celery = make_celery(flask_app)

@celery.task()
def add_together(a, b):
    return a + b