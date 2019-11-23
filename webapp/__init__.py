from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import os

app = Flask(__name__)
CORS(app)

if os.getenv("DATABASE_URL") is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite3"

app.config["SECRET_KEY"] = "secret_key_hide_this_!!!".encode('utf8')

db = SQLAlchemy(app)
api = Api(app)

from webapp.resources import File, History, Commit, Repository

api.add_resource(History, '/repository/<string:repositoryID>/commit/<string:commitID>/')
api.add_resource(File, '/repository/<string:repositoryID>/commit/<string:commitID>/file/<string:fileID>/')

api.add_resource(Commit, '/repository/<string:repositoryID>/')
api.add_resource(Repository, '/')

from webapp import routes
