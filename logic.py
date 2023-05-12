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
        self.month = 9
        self.day = 15
        
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

    def get_odds(self):
        filtered_df = self.df[(self.df['slat']>=self.lat -1) & (self.df['slon']<= self.lat + 1)]
        filtered_df2 = self.df[(self.df['mo']>=self.month - 1) & (self.df['mo']<= self.month + 1)]
        total_filtered = len(filtered_df + filtered_df2)
        total_df = len(self.df)
        probability = total_filtered/total_df
        odds = probability/(1-probability)
        return f'The odds are {odds:.2f}%'

    def run_sim(self):
        X = self.df['']
        y = self.df['']
