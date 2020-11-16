import pandas as pd

import os
from sqlalchemy import create_engine

from dotenv import load_dotenv

load_dotenv()

DB_PATH = str(os.getenv("SQLALCHEMY_DB_PATH"))
DB_NAME = str(os.getenv("SQLALCHEMY_DB_NAME"))
DB_URL = "sqlite:////" + DB_PATH + DB_NAME


def get_seisms_from_api():
    """
        We read the webpage's output, transform the data and return the seisms dict
    """
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

    return raw_data.to_dict(orient="index")


def get_ids_to_delete():
    """
        We get the database table and transform the data in order to get the ids of the seisms
        to delete
    """
    engine = create_engine(DB_URL)
    elem_to_keep = [(10.075782, -87.475526),
                    (13.448997, -65.886802),
                    (-56.393429, -87.629530),
                    (-57.409798, -55.477882)]
    raw_data = pd.read_sql_table(table_name='seism', con=engine)
    raw_data.drop(
        columns=["magnitude", "datetime", "depth", "sensor_id"],
        inplace=True)
    raw_data = raw_data[(raw_data.verified == False)]
    raw_data.drop(
        columns=["verified"],
        inplace=True)

    raw_data['latitude'] = round(raw_data['latitude'].astype(float), 3)
    raw_data['longitude'] = round(raw_data['longitude'].astype(float), 3)

    # raw_data = raw_data[(raw_data['latitude'] == 33.860000) & (raw_data['longitude'] == -117.523500)]

    datasets = []
    """
        1) Get seisms which long and lat are different from the tuples
        2) Merge the generated datasets and the original one. The rows that are not common are eliminated 
        3) IDs list obtention
    """
    for (lat, long) in elem_to_keep:
        table = raw_data[(raw_data['latitude'] != round(lat, 3)) & (raw_data['longitude'] != round(long, 3))]
        datasets.append(table)

    for i in range(len(datasets)):
        df = datasets[i]
        raw_data = raw_data.merge(df, how='inner', indicator=False)  # Common rows btw raw_data and table

    raw_data.drop(
        columns=["latitude", "longitude"],
        inplace=True)

    return raw_data['id_num'].to_list()
