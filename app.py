import flask
from flask import Flask, render_template, request, redirect
import json
from logic import df
app = Flask(__name__)

# transference = "data"
brain = df()

@app.route('/')
def baseline():
    return render_template("index.html")# stuff=transference)


# these are just dummy values
from_month = 1
to_month = 2
lat = 10
lng = 10

@app.route('/datapage', methods=['GET', 'POST'])
def controls():
    global from_month
    global to_month
    global lat
    global lng
    print('controls reached...')
    if request.method == 'GET':
        print('Get data')
        return df.get_odds(brain, from_month=from_month, to_month=to_month, lat=lat, lon=lng)
    #     Give me the Data
    if request.method == 'POST':
        received_data = request.get_json()
        print(f'I got the Data! {received_data}')
        message = received_data['data']
        return_data = {
            "status": "success",
            "message": f"received:{message}"
        }
        from_month = int(message['from'])
        to_month = int(message['to'])
        lat = float(message['lat'])
        lng = float(message['lng'])
        print(return_data)
        return flask.Response(response=df.get_odds(brain, from_month=from_month, to_month=to_month, lat=lat, lon=lng), status=201)


if __name__ == "__main__":
    app.run(debug=True)
