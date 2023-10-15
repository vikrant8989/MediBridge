from mongoengine import *
from flask import *
import os
import mypharmacy_collection as my
import string
import random
import logging

app = Flask(__name__)


# Configure logging
log_filename = 'pharmacies_service.log'
logging.basicConfig(filename=log_filename, level=logging.ERROR, format='%(asctime)s [%(levelname)s]: %(message)s')

def checklogin():
    try:
        data = my.Pharmacy.objects
        for u in data:
            if request.authorization and request.authorization.username == u.name and request.authorization.password == u.password:
                return {"id": u.pharmacyid}
        return "Invalid Credential"
    except Exception as e:
        logging.error(f"Error in checklogin: {e}")
        return {"error": "An error occurred during login"}


def getallPharmacies():
    try:
        foundpharmacy = my.Pharmacy.objects
        userslist = [u.__dict__() for u in foundpharmacy]
        return userslist
    except Exception as e:
        logging.error(f"Error in getallPharmacies: {e}")
        return {"error": "An error occurred while fetching all pharmacies"}


def registerPharmacy(data):
    try:
        pharmacyid = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
        u = my.Pharmacy(
            pharmacyid=pharmacyid, name=data["name"], password=data["password"],
            address=data["address"], phone_number=data["phoneno"],
            operating_hours=data["operatinghour"], owner=data["owner"])
        u.save()
        return u.__dict__()
    except Exception as e:
        logging.error(f"Error in registerPharmacy: {e}")
        return {"error": "An error occurred while registering the pharmacy"}


def getPharmacyByid(pharmacyId):
    try:
        u = my.Pharmacy.objects.get(pharmacyid=pharmacyId)
        return u.__dict__()
    except my.Pharmacy.DoesNotExist:
        return {"error": f"Pharmacy with ID '{pharmacyId}' not found"}
    except Exception as e:
        logging.error(f"Error in getPharmacyByid: {e}")
        return {"error": "An error occurred while fetching pharmacy by ID"}


def getPharmacyByName(name):
    try:
        u = my.Pharmacy.objects.get(name=name)
        return u.__dict__()
    except my.Pharmacy.DoesNotExist:
        return {"error": f"Pharmacy with name '{name}' not found"}
    except Exception as e:
        logging.error(f"Error in getPharmacyByName: {e}")
        return {"error": "An error occurred while fetching pharmacy by name"}


def getmedidlist(id):
    try:
        u = my.Pharmacy.objects.get(pharmacyid=id)
        u = u.__dict__()
        print(u)
        return u["medref"]
    except my.Pharmacy.DoesNotExist:
        return {"error": f"Pharmacy with ID '{id}' not found"}
    except Exception as e:
        logging.error(f"Error in getmedidlist: {e}")
        return {"error": "An error occurred while fetching medication ID list"}



def delpharmacybyID(pharmacyId):
    delu = my.Pharmacy.objects.get(pharmacyid = pharmacyId)
    delu.delete()
    return delu.__dict__()

def updatePharmacybyid(pharmacyId,data):
    for u in my.Pharmacy.objects(pharmacyid=pharmacyId):
         for i in data:
            u[i] = data[i] 
         u.save()
    return u.__dict__()

def updatemedrefofpharmacy(pharmacyId, val):
    try:
        for u in my.Pharmacy.objects(pharmacyid=pharmacyId):
            u["medref"].append(val) 
            u.save()
    except my.Pharmacy.DoesNotExist:
        return {"error": f"Pharmacy with ID '{pharmacyId}' not found"}
    except Exception as e:
        logging.error(f"Error in updatemedrefofpharmacy: {e}")
        return {"error": "An error occurred while updating medication references for the pharmacy"}

    

