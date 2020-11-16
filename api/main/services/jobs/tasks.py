import random
import json
import sqlite3

from main.repositories import SeismRepository, SensorRepository
from main.extensions import scheduler, db
from .functions import get_seisms_from_api, get_ids_to_delete

seism_repo = SeismRepository(verified=False)
sensor_repo = SensorRepository()


@scheduler.task("interval", id="seisms_achiever", seconds=300)
def load_seisms_task():
    # We work with pandas library. First, we obtain the data, erase the unnecessary cols and then, we call the function
    # to load it in the database
    with scheduler.app.app_context():
        print("\n\nTASK: Achieving seisms")
        seisms_data = get_seisms_from_api()

        # We get the available sensor ids list
        sensor_repo.set_db_session(session=db.session)
        ids_list = sensor_repo.get_sensor_id_list()

        for seism in seisms_data:
            sensor_id = int(random.choice(ids_list))
            seisms_data[seism]["latitude"] = str(seisms_data[seism]["latitude"])
            seisms_data[seism]["longitude"] = str(seisms_data[seism]["longitude"])
            seisms_data[seism]["sensor_id"] = sensor_id
            seisms_data[seism]["verified"] = False

            seism_repo.set_addition_json(json.dumps(seisms_data[seism]))
            seism_repo.add()

        print("\n\nSeisms addition done.")

@scheduler.task("interval", id="data_persistance", seconds=3600)
def keep_specific_data():
    with scheduler.app.app_context():
        ids_list = get_ids_to_delete()
        for seism_id in ids_list:
            seism_repo.set_id(seism_id)
            instance = seism_repo.get()
            seism_repo.set_instance(instance=instance)
            seism_repo.delete()