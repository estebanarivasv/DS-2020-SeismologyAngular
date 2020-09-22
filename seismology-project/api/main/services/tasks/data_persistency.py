from main.extensions import scheduler
import requests

"""
    [services] Persistencia de los datos de los sismos (borrar los otros sismos) cada 1 hr. segun las siguientes 
    coordenadas:
    A=(10.075782, -87.475526)
    B=(13.448997, -65.886802)
    C=(-56.393429, -87.629530)
    D=(-57.409798, -55.477882)
"""

@scheduler.task("interval", id="consume_earthquake", seconds=30)
def consume_service():
    query = requests.get(url="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01"
                             "&endtime=2014-01-02", headers={'content-type': 'application/json'})
    # print(query.text)
