from webapp import app
from flask import render_template


@app.route("/")
def visual():
    return render_template("index.html")
