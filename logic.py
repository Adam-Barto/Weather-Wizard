import pandas as pd
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
class df:
    def __init__(self):
        self.df = pd.read_csv('data/us_tornado_dataset_1950_2021.csv')
        self.geolocater = Nominatim(user_agent='my-app')
    def show_df(self):
        print(self.df)

    def get_geolocation(self, address, attempts=3):
        current_attempt = 0
        while current_attempt < attempts:
            try:
                geolocation = self.geolocater.geocode(address)
                latitude = geolocation.latitude
                longitude = geolocation.longitude
                closest_lat = self.df['slat'].iloc[(self.df['slat'] - latitude).abs().argmin()]
                closest_long = self.df['slon'].iloc[(self.df['slon'] - longitude).abs().argmin()]
                state = ((self.df['slat'] - closest_lat).abs() + (self.df['elon'] - closest_long).abs()).idxmin()
                return self.df.loc[state, 'st']
            except GeocoderTimedOut:
                current_attempt += 1
                print(f'Timed out after {current_attempt} call(s), retrying')
        raise Exception('FAILED AFTER 3 CALLS')
