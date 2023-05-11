import flask
from flask import Flask, render_template, request
import json

app = Flask(__name__)


@app.route('/')
def baseline():
    return render_template("index.html")


@app.route('/', methods=['GET', 'POST'])
def controls():
    print('controls reached...')
    if request.method == 'GET':
        with open('controls.json', 'r') as f:
            data = json.load(f)
            print(data)
            return flask.jsonify(data)
    if request.method == 'POST':
        received_data = request.get_json()
        print(f'I got the Data!{received_data}')
        message = received_data['data']
        return_data = {
            "status": "success",
            "message": f"received:{message}"
        }
        return flask.Response(response=json.dumps(return_data), status=201)


if __name__ == "__main__":
    app.run(debug=True)
