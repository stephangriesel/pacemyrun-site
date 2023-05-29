# main.py
from flask import Flask
from app1 import app1
from app2 import app2

app = Flask(__name__)
app.register_blueprint(app1, url_prefix='/app1')
app.register_blueprint(app2, url_prefix='/app2')

if __name__ == '__main__':
    app.run(debug=True)
