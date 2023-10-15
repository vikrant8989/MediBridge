from mongoengine import *
import os
from flask import *
from flask import Flask,request,jsonify
import doctor_collection as doc
# import doctor_collection as doc
import logging

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Configure logging
log_filename = 'doctor_service.log'
logging.basicConfig(filename=log_filename, level=logging.ERROR, format='%(asctime)s [%(levelname)s]: %(message)s')


def checklogin(request):
    try:
        data = doc.Doctors.objects
        for u in data:
            if request.authorization and request.authorization.username == u.Dname and request.authorization.password == u.Password:
                return {"id": u.Did}
        return "Invalid Credential"
    except Exception as e:
        logging.error(f"Error in checklogin: {e}")
        return {"error": "An error occurred while checking login credentials"}


def DoctorRegistration(data,image_file):
    if image_file :
        image_filename = os.path.join(app.config['UPLOAD_FOLDER'], data["Dname"])
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(app.config['UPLOAD_FOLDER'])
        image_file.save(image_filename)
    u=doc.Doctors(Dname=data["Dname"],Did=data["Did"],Password=data["Password"],Age=data["Age"],Gender=data["Gender"],
        Experience=data["Experience"],Phone=data["Phone"],Email=data["Email"],Specialization=data["Specialization"],
        Location=data["Location"],Doctor_images = image_file.filename)
    u.save() 
    print("saved")
    return u.__dict__() 

# Define the route to serve images based on the filename
def get_image(image_filename):
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_filename) 
    print(image_path)   
    if os.path.exists(image_path):
        return send_from_directory(app.config['UPLOAD_FOLDER'], image_filename)
    else:
        return "Image not found", 404

def getdoctorByid(did):
    try:
        u = doc.Doctors.objects.get(Did=did)
        return u.__dict__()
    except DoesNotExist as e:
        logging.error(f"Doctor with ID '{did}' not found: {e}")
        return {"error": f"Doctor with ID '{did}' not found"}
    except Exception as e:
        logging.error(f"Error in getdoctorByid: {e}")
        return {"error": "An error occurred"}


def getdoctornameByid(did):
    try:
        u = doc.Doctors.objects.get(Did=did)
        return u.Dname
    except DoesNotExist as e:
        logging.error(f"Doctor with ID '{did}' not found: {e}")
        return {"error": f"Doctor with ID '{did}' not found"}
    except Exception as e:
        logging.error(f"Error in getdoctornameByid: {e}")
        return {"error": "An error occurred"}


def getdocbyname(name):
    try:
        u = doc.Doctors.objects.get(Dname=name)
        return u.__dict__()
    except DoesNotExist as e:
        logging.error(f"Doctor not found with name '{name}': {e}")
        return {"error": f"Doctor not found with name '{name}'"}
    except Exception as e:
        logging.error(f"Error in getdocbyname: {e}")
        return {"error": "An error occurred"}

def deletedoctorByid(did):
    try:
        u = doc.Doctors.objects.get(Did=did)
        u.delete()
        return u.__dict__()
    except DoesNotExist as e:
        logging.error(f"Doctor with ID '{did}' not found for deletion: {e}")
        return {"error": f"Doctor with ID '{did}' not found for deletion"}
    except Exception as e:
        logging.error(f"Error in deletedoctorByid: {e}")
        return {"error": "An error occurred while deleting the doctor"}


 

def updatedoctorByid(did,data):
    for u in doc.Doctors.objects(Did=did):
        for i in data:
            u[i]=data[i]
        u.save()            
    return u.__dict__()


def getalldoctor():
    try:
        founddoctor = doc.Doctors.objects()
        dlist = [u.__dict__() for u in founddoctor]
        return dlist
    except Exception as e:
        logging.error(f"Error in getalldoctor: {e}")
        return {"error": "An error occurred while fetching all doctors"}
   
def checkspzbyproblem(patientcond):
    try:
        problemlist = {
            "Neurologist":["Seizures","Headache","Stroke"],
            "Orthopedic" :["Fractures","Back and Neck Pain","Joint Pain"],
            "Cardiologist":["Heart Attack","Hypertension","Heart Failure"],
            "Dermatologist":["Skin Care","Hair Problem"],
            "Dentist":["Tooth Decay","Tooth Sensitivity"],
            "Urologist":["Urinary Tract Infections(UTI)","Kidney Stones","Bladder Problem"],
            "Psychiatrist":["Depression","Anxiety Disorders","Eating Disorders","Personality Disorders"],
            "General Practitioner":["Cold","Cough","Fever"],
            "Gynecologist":["Pregnancy"]
        }
        foundspz = None
        for spz, problem in problemlist.items():
            if patientcond in problem:
                foundspz = spz
                break
        return foundspz
    except Exception as e:
        logging.error(f"Error in checkspzbyproblem: {e}")
        return {"error": "An error occurred while checking specialization by problem"}

def searchdoctorbyspecialization(spz):
    try:
        doctors = doc.Doctors.objects(Specialization=spz)
        dlist = [u.__dict__() for u in doctors]
        return dlist
    except Exception as e:
        logging.error(f"Error in searchdoctorbyspecialization: {e}")
        return "Some error occurred"

def searchdoctorbyproblem(patientcond):
    try:
        spz = checkspzbyproblem(patientcond)
        if spz:
            return searchdoctorbyspecialization(spz)
        else:
            return {"error": f"No specialization found for the patient condition {patientcond}"}
    except Exception as e:
        logging.error(f"Error in searchdoctorbyproblem: {e}")
        return {"error": "An error occurred while searching doctors by problem"}



