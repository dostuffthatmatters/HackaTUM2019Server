from webapp import app

@app.route('/status')
def hello_world():
    return 'Running', 200

