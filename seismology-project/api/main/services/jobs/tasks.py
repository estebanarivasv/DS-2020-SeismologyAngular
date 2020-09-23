import pandas as pd
import random
import json
import datetime as dt

from main.repositories import SeismRepository, SensorRepository
from main.extensions import scheduler, db

seism_repo = SeismRepository(verified=False)
sensor_repo = SensorRepository()

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
    with scheduler.app.app_context():
        print("\n\nTASK: Achieving seisms")
        raw_data = pd.read_csv("https://earthquake.usgs.gov/fdsnws/event/1/query?format=csv")
        raw_data.drop(
            columns=["magType", "nst", "gap", "dmin", "rms", "net", "id", "updated", "place", "type", "magError",
                     "horizontalError", "depthError", "magNst", "status", "locationSource", "magSource"],
            inplace=True)

        raw_data.rename(columns={"time": "datetime", "mag": "magnitude"}, inplace=True)

        raw_data['datetime'] = pd.to_datetime(raw_data['datetime'])
        raw_data['datetime'] = raw_data['datetime'].dt.strftime('%Y-%m-%d %H:%M:%S')
        raw_data['depth'] = raw_data['depth'].astype('int32')

        print("\n\nSeisms data obtained.")

        seisms_data = raw_data.to_dict(orient="index")

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


"""
    [services] Persistencia de los datos de los sismos (borrar los otros sismos) cada 1 hr. segun las siguientes 
    coordenadas:
    A=(10.075782, -87.475526)
    B=(13.448997, -65.886802)
    C=(-56.393429, -87.629530)
    D=(-57.409798, -55.477882)
"""

"""
@scheduler.task("interval", id="consume_earthquake", seconds=30)
def consume_service():
    query = requests.get(url="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01"
                             "&endtime=2014-01-02", headers={'content-type': 'application/json'})
    # print(query.text)
"""

"""
[services] Devolución de sismos mas cercanos a las coordenadas ingresadas por json.
"""

# http://api.geonames.org/findNearbyJSON?lat=52&lng=30&username=demo
#
