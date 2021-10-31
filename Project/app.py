import os
import numpy as np
import random
import matplotlib
from flask import Flask, request
from flask_cors import CORS
import json
#import backend.solve_white_face.cube_solve as solver

app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

@app.route('/validate', methods=['GET'])
def validate():
    # data validation point
    pass

# Want to say put/post but doesn't exactly conform to that and isn't RESTful/standard practice
@app.route('/solve', methods=['GET'])
def solve():
    cube = np.array(json.loads(request.args.get('cube', type=str)))
    transformations = ""
    # call to solver??
    # solver. ?????
    return json.dumps({ "cube" : "".join([line.replace(" ", "") for line in np.array2string(cube, separator=',').splitlines()]), "tfms" : transformations })

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))