
from flask_restful import Resource
from flask import request
from datetime import datetime
from sqlalchemy import asc

from webapp.models import Edit
from webapp import db


class File(Resource):
    def get(self, repositoryID, commitID, fileID):
        result = Edit.query.filter(Edit.repository_id == repositoryID).filter(Edit.commit_id == commitID).filter(
            Edit.file_id == fileID).first()

        if result is None:
            return {
                "status": "OK",
                "edit": {}
            }
        else:
            return {
                "status": "CONFLICT",
                "edit": {
                    "repository_id": result.repository_id,
                    "commit_id": result.commit_id,
                    "file_id": result.file_id,
                    "user_id": result.user_id,
                    "timestamp": str(result.timestamp)
                }
            }

    def put(self, repositoryID, commitID, fileID):
        userID = request.form['user_id']
        resultObj = None

        checkExisting = Edit.query.filter(Edit.repository_id == repositoryID).filter(Edit.commit_id == commitID).filter(
            Edit.file_id == fileID).first()
        if checkExisting is not None and checkExisting.user_id == userID:
            checkExisting.timestamp = datetime.today()
            db.session.commit()
            resultObj = checkExisting
        elif checkExisting is not None and checkExisting.user_id != userID:
            return {
                "status": "ERROR"
            }
        else:
            resultObj = Edit(repository_id=repositoryID, commit_id=commitID, file_id=fileID, timestamp=datetime.today(),
                             user_id=userID)
            db.session.add(resultObj)
            db.session.commit()

        return {
            "status": "OK",
            "edit": {
                "repository_id": resultObj.repository_id,
                "commit_id": resultObj.commit_id,
                "file_id": resultObj.file_id,
                "user_id": resultObj.user_id,
                "timestamp": str(resultObj.timestamp)
            }
        }

    def delete(self, repositoryID, commitID, fileID):
        Edit.query.filter(Edit.repository_id == repositoryID)\
            .filter(Edit.commit_id == commitID)\
            .filter(Edit.file_id == fileID).delete()
        db.session.commit()

        result = {
            "status": "OK",
            "edit": []
        }

        return result


class History(Resource):
    def get(self, repositoryID, commitID):

        queriedObjects = Edit.query.filter(Edit.repository_id == repositoryID).filter(
            Edit.commit_id == commitID).order_by(asc(Edit.timestamp)).all()

        results = {
            "status": "OK",
            "edit": []
        }

        for obj in queriedObjects:
            results["edit"].append(
                {"repository_id": obj.repository_id, "commit_id": obj.commit_id, "user_id": obj.user_id,
                 "file_id": obj.file_id, "timestamp": str(obj.timestamp)})
        return results

    def delete(self, repositoryID, commitID):
        Edit.query.filter(Edit.repository_id == repositoryID).filter(Edit.commit_id == commitID).delete()
        db.session.commit()

        result = {
            "status": "OK",
            "edit": []
        }

        return result
