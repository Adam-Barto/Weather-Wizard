import pandas as pd
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.ensemble import RandomForestClassifier

class df:
    def __init__(self):
        self.df = pd.read_csv('data/us_tornado_dataset_1950_2021.csv')
        self.geolocater = Nominatim(user_agent='my-app')
        self.state = ''
        self.lon = 0.0
        self.lat = 0.0
        self.month = 0
        self.day = 1

    def show_df(self):
        print(self.df)

    def get_geolocation(self, address, attempts=3):
        current_attempt = 0
        while current_attempt < attempts:
            try:
                geolocation = self.geolocater.geocode(address)
                latitude = geolocation.latitude
                longitude = geolocation.longitude
                self.lat = self.df['slat'].iloc[(self.df['slat'] - latitude).abs().argmin()]
                self.lon = self.df['slon'].iloc[(self.df['slon'] - longitude).abs().argmin()]
                state = ((self.df['slat'] - self.lat).abs() + (self.df['elon'] - self.lon).abs()).idxmin()
                return self.df.loc[state, 'st']
            except GeocoderTimedOut:
                current_attempt += 1
                print(f'Timed out after {current_attempt} call(s), retrying')
        raise Exception('FAILED AFTER 3 CALLS')
    def get_oddsV2(self, to_month, from_month, lat, lon):
        filtered_df = self.df[(self.df['slat']>=lat - .5) & (self.df['slat']<= lat + .5) & (self.df['slon']>=lon - .5) & (self.df['slon']<= lon + .5)]
        filtered_df2 = filtered_df[(filtered_df['mo'] >= to_month) & (filtered_df['mo'] <= from_month)]
        print(f'the numerator is ' + str(len(filtered_df2)))
        print(f'the denominator is ' + str(len(filtered_df)))
        total_len = len(filtered_df)
        total_filtered = len(filtered_df2)
        probability = (total_filtered/total_len) * 100
        return f'The odds are {probability:.2f}%'
    def get_odds(self, to_month, from_month, lat, lon):
        filtered_df = self.df[(self.df['slat']>=lat - 1) & (self.df['slon']<= lon + 1).abs().argmin()]
        filtered_df2 = self.df[(self.df['mo']>=to_month) & (self.df['mo']<= from_month)]
        total_filtered = len(filtered_df + filtered_df2)
        total_df = len(self.df)
        probability = total_filtered/total_df
        odds = probability/(1-probability)
        return f'The odds are {odds:.2f}%'

    def run_sim(self):
        X = self.df['']
        y = self.df['']
