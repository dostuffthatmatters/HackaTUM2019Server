from webapp import db

class Edit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime)

    repository_id = db.Column(db.String)
    commit_id = db.Column(db.String)
    file_id = db.Column(db.String)
    user_id = db.Column(db.String)
    
    def __repr__(self):
        return f"Edit(id: {self.id}, " \
               f"timestamp: {self.timestamp}, " \
               f"repository: {self.repository_id}, " \
               f"commit_id: {self.commit_id}, " \
               f"file_id: {self.file_id}, " \
               f"user_id: {self.user_id})"