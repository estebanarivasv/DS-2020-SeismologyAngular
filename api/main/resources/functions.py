import pandas as pd
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

DB_PATH = str(os.getenv("SQLALCHEMY_DB_PATH"))
DB_NAME = str(os.getenv("SQLALCHEMY_DB_NAME"))
DB_URL = "sqlite:////" + DB_PATH + DB_NAME


def get_near_seisms(json):
    """
        We get the database table and transform the data in order to get the ids of the nearest seisms
        from the json
    """
    engine = create_engine(DB_URL)
    raw_data = pd.read_sql_table(table_name='seism', con=engine)
    raw_data.drop(
        columns=["magnitude", "datetime", "depth", "sensor_id", "verified"],
        inplace=True)

    raw_data['latitude'] = round(raw_data['latitude'].astype(float), 3)
    raw_data['longitude'] = round(raw_data['longitude'].astype(float), 3)

    """
        1) Get seisms which long and lat are different from the tuples
        2) Merge the generated datasets and the original one. The rows that are not common are eliminated 
        3) IDs list obtention
    """
    lat = json['latitude']
    long = json['longitude']

    raw_data = raw_data[raw_data['latitude'].ge(lat - 1)]
    raw_data = raw_data[raw_data['latitude'].le(lat + 1)]

    raw_data = raw_data[raw_data['longitude'].ge(long - 1)]
    raw_data = raw_data[raw_data['longitude'].ge(long - 1)]

    raw_data.drop(
        columns=["latitude", "longitude"],
        inplace=True)

    return raw_data['id_num'].to_list()
