from flask import Flask, request
import requests

app = Flask(__name__)

@app.route('/')
def hello():
    return app.send_static_file('index.html')

@app.route('/display',methods=["GET"])
def display():
    key = request.args
    print('key')
    return 'displayyyyyyyyyyyyy'

if __name__ == '__main__':
    app.run()
