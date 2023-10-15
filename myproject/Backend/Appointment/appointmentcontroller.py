from flask import *
import appointment_service as Aps
from flask_cors import CORS
from mongoengine import *


connect("MediBridge")

app = Flask(__name__)
CORS(app)


@app.route("/book_appointment/<doctor_id>/<userid>/<appointment>",methods = ["POST"])
def book(doctor_id,userid,appointment):
    return Aps.bookAppointment(appointment,userid,doctor_id)

@app.route("/appointment/<doctor_id>/")
def getapp(doctor_id):
    print(doctor_id)
    return Aps.getallAppointment(doctor_id)

if __name__ == "__main__":
    app.run(port=5004) 