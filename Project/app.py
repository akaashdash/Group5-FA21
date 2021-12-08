import os
import numpy as np
import random
import matplotlib
from flask import Flask, request
from flask_cors import CORS
import json
import backend.cube_solve as solver

app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

# Validate that an input cube is a possible state; This can be post because the only response we need is a status; UNUSED
@app.route('/validate', methods=['POST'])
def validate():
    cube = np.array(json.loads(request.form["cube"]))
    pass

# Solve an input cube; Want to say put/post but doesn't exactly conform to that and isn't RESTful/standard practice
@app.route('/solve', methods=['GET'])
def solvePassed():
    cube = np.array(json.loads(request.args.get('cube', type=str)))
    # "".join([line.replace(" ", "") for line in np.array2string(shuffled, separator=',').splitlines()]) - converts np ndarray to str
    solved, steps = solver.solve(cube)
    return json.dumps({  "scrambled" : cube.tolist(), "solved" : solved.tolist(), "solution" : steps })

# Get a randomly scrabled cube, the transformations that shuffled it, and a solution
@app.route('/scrambled', methods=['GET'])
def rand():
    cube = np.arange(54).reshape(6, 3, 3)
    shuffled, tfms = solver.scramble(cube, 5)
    solution = []
    for i in tfms[::-1]: solution.append(solver.rev_moves[i]) # for now we will simply reverse the tfms list for a solution
    return json.dumps({ "scrambled" : shuffled.tolist(), "solved" : cube.tolist(), "solution" : solution })

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))