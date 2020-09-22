from werkzeug.local import LocalProxy
import pandas as pd
import random

from main.repositories import SeismRepository, SensorRepository
from main.extensions import scheduler

seism_repo = SeismRepository(verified=False)
sensor_repo = SensorRepository()

db = LocalProxy(get_db)
"""
[services] Obtencion de datos de sismos cada 5 min. Llamar de manera automatica a la creación de objetos.


    URL - https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson
    
    - Default parameters
        starttime	String  NOW - 30 days
        endtime	    String  present time	
        
"""


@scheduler.task("interval", id="seisms_achiever", seconds=30)
def get_seisms():
    # We work with pandas library. First, we obtain the data, erase the unnecessary cols and then, we call the function
    # to load it in the database
    print("\n\nTASK: Achieving seisms")
    pd_json = pd.read_csv("https://earthquake.usgs.gov/fdsnws/event/1/query?format=csv")
    pd_json.drop(columns=["magType", "nst", "gap", "dmin", "rms", "net", "id", "updated", "place", "type", "magError",
                          "horizontalError", "depthError", "magNst", "status", "locationSource", "magSource"],
                 inplace=True)
    pd_json.rename(columns={"time": "datetime", "mag": "magnitude"}, inplace=True)

    json = pd_json.to_dict()

    for i in json:
        with app.app_context():
            sensor_repo.set_db_session(session=db_app.session)
        ids_list = sensor_repo.get_sensor_id_list()
        sensor_id = int(random.choice(ids_list))
        i["sensor_id"] = sensor_id
        seism_repo.set_addition_json(json.dumps(i))
        seism_repo.add()

    """
    SI YASTÁ, NO LO AGREGAMOS
    datetime == time
    depth = 
    magnitude == mag
    latitude = 
    longitude =
    verified = False
    sensor_id = # De los que haya, asignar cualquiera
    """
