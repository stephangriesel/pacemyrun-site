# app2_blueprint.py
from flask import Blueprint, render_template, request

app2 = Blueprint('app2', __name__)


@app2.route('/')
def home():
    return render_template('pacecalculator.html')


@app2.route('calculate', methods=['POST'])
def calculate():
    time = float(request.form['time'])
    distance = float(request.form['distance'])
    avg_pace = time / distance

    # A simple way to start slow and increase pace
    # Let's assume the pace increases linearly
    num_sections = 5
    paces = []
    for i in range(num_sections):
        pace = avg_pace * (1 + 0.1 * (i / (num_sections - 1)))
        paces.append(pace)

    return render_template('paceresult.html', paces=paces)


if __name__ == '__main__':
    app2.run(host='0.0.0.0', port=5080, debug=True)
