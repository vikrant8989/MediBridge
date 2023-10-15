from mongoengine import *
from flask import *
from flask_cors import CORS
import doctor_service as ds
import string
import random
from bardapi import Bard
import os
os.environ["_BARD_API_KEY"]="bwghD07NZ0nXd5WDspRa20JuRXQVwttyN2xDO6XBpfaPdKBUBd0gMCMyScxzOPVtd7aDMA."

connect("MediBridge")
app = Flask(__name__)
CORS(app)

@app.route("/Doctor/login")
def logindoc():
    return ds.checklogin(request)

@app.route("/Doctors/Registration",methods=["POST"])
def add_doctor():
    data = request.form.to_dict()
    Did = ''.join(random.choices(string.ascii_uppercase +string.digits, k=4))
    data = {"Did":Did,"Dname":data["Dname"],"Password":data["Password"],"Gender":data["Gender"],"Age":data["Age"],
            "Experience":data["Experience"],"Phone":data["Phone"],"Email":data["Email"],
            "Specialization":data["Specialization"],"Location":data["Location"]}
    imagefile = request.files.get("doctor_image")
    print(imagefile)
    return jsonify(ds.DoctorRegistration(data,imagefile))


# get doctor by id
@app.route("/Doctor/<string:did>")
def get_doctor_BY_ID(did):
    return jsonify(ds.getdoctorByid(did))


@app.route("/Doctors/<string:name>")
def getbyname(name):
    print(name)
    return jsonify(ds.getdocbyname(name))
 
#Delete Doctor by Id
@app.route("/Doctors/<int:did>/",methods=["DELETE"])
def delete_doctor_BY_ID(did):
    return jsonify(ds.deletedoctorByid(did))

#Update Doctor by Id
@app.route("/Doctors/<string:did>/",methods=["PUT"])
def update_doctor_BY_ID(did):
    data=request.json
    return jsonify(ds.updatedoctorByid(did,data))

@app.route("/doctors/<string:did>/")
def getdoctornameByid(did):
    return ds.getdoctornameByid(did)


#to get all doctors
@app.route("/Doctors")
def getalldoctor():
    return jsonify(ds.getalldoctor())

#Find doctor in nearby location
@app.route("/find_nearby_doctors")
def find_nearby_doctors(latitude,longitude,max_distance_km=10):
    return jsonify(ds.findnearbyDoctors(latitude,longitude,max_distance_km=10))

#Rating and Review of doctors
@app.route("/reviews",methods=["POST"])
def submit_reviews():
    data=request.json
    return jsonify(ds.ReviewsRating(data))

# search doctor by problem
@app.route("/doctors/search/<string:field>/")
def getdoctor(field):
    print(field)
    return jsonify(ds.searchdoctorbyproblem(field))

# search by spz
@app.route("/doctors/search/spz/<string:field>/")
def getDoctor(field):
    print(field)
    return jsonify(ds.searchdoctorbyspecialization(field))


@app.route('/get_image/<string:image_filename>')
def getimagebyname(image_filename):
    return ds.get_image(image_filename)

@app.route("/chat/<problem>")
def getresponsefromai(problem):
    add_text = "Just give me specialization of doctor if "
    input_text = problem
    input_text = add_text + input_text + " give me one word answer"
    res = Bard().get_answer(input_text)['content']
    print(res)
    return res

if __name__ == "__main__":
    app.run()
