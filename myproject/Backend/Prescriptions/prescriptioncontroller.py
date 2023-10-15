from flask import *
import prescription_service as ps
from flask_cors import CORS
from mongoengine import *

connect("MediBridge")

app = Flask(__name__)
CORS(app)

@app.route('/prescription')
def getall():
    return jsonify(ps.getallprescription())

@app.route("/prescription/add",methods = ["POST"])
def add():
    data = request.json
    print(data)
    return jsonify(ps.add_prescription(data))

@app.route('/prescription/<userid>')
def view_prescription(userid):
    print(userid)
    return jsonify(ps.getallprescriptionbyuserid(userid))

if __name__ == '__main__':
    app.run(port=5003)
