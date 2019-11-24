from webapp import app
from flask import render_template

import time

from webapp.models import Edit

@app.route("/visual", methods=["GET"])
@app.route("/visual/", methods=["GET"])
def visual_root():
    return render_template("index.html")

@app.route("/visual/<path:path>", methods=["GET"])
def visual(path):
    return render_template("index.html")

@app.route("/fetchall", methods=["GET"])
def fetch_all():
    edits = Edit.query.all()

    time.sleep(2)

    repositories = {
        "count": 0,
        "ids": [],
        "records": {}
    }

    for edit in edits:
        if edit.repository_id not in repositories["ids"]:
            repositories["ids"].append(edit.repository_id)
            repositories["count"] += 1

    for repository_id in repositories["ids"]:
        edits = Edit.query.filter(Edit.repository_id == repository_id).all()

        commits = {
            "count": 0,
            "ids": [],
            "records": {}
        }

        for edit in edits:
            if edit.commit_id not in commits["ids"]:
                commits["ids"].append(edit.commit_id)
                commits["count"] += 1

        repositories["records"][repository_id] = commits

    print(repositories)

    for repository_id in repositories["ids"]:
        for commit_id in repositories["records"][repository_id]["ids"]:
            queried_edits = Edit.query.filter(Edit.repository_id == repository_id).filter(Edit.commit_id == commit_id).all()

            edits = {
                "count": 0,
                "ids": [],
                "records": []
            }

            for edit in queried_edits:
                edits["ids"].append(edit.file_id)
                edits["count"] += 1

                edit_representation = {
                    "file_id": edit.file_id,
                    "user_id": edit.user_id,
                    "timestamp": edit.timestamp
                }

                edits["records"].append(edit_representation)

                repositories["records"][repository_id]["records"][commit_id] = edits

    return {"records": repositories}






