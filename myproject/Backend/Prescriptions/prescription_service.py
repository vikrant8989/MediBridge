import myprescription_collection as mc
# from Doctors import doctor_service as ds
import logging
import requests


# Configure logging
log_filename = 'prescription_service.log'
logging.basicConfig(filename=log_filename, level=logging.ERROR, format='%(asctime)s [%(levelname)s]: %(message)s')

def getallprescription():
    try:
        foundpres = mc.Prescription.objects()
        plist = [u.__dict__() for u in foundpres]
        return plist
    except Exception as e:
        logging.error(f"Error in getallprescription: {e}")
        return {"error": "An error occurred while fetching all prescriptions"}


def add_prescription(data):
    try:
        u = mc.Prescription(
            userid=data["userid"], doctorid=data["doctorid"], medicines=data["medicines"],
            created_at=data["created_at"])
        u.save()
        return u.__dict__()
    except Exception as e:
        logging.error(f"Error in add_prescription: {e}")
        return {"error": "An error occurred while adding the prescription"}


def getallprescriptionbyuserid(userid):
    try:
        # u = mc.Prescription.objects.get(userid=userid)
        u = mc.Prescription.objects(userid=userid)
        plist = []
        for pres in u:
            response = requests.get("http://127.0.0.1:5000//doctors/"+pres.doctorid)
            print(response)
            if response.status_code == 200:
                data = response.text 
            print(data)
            pdata = pres.__dict__()
            pdata["doctorname"]=data
            plist.append(pdata)
        print(plist)
        if plist == []:
            return {"error": "No prescription found for the specified user"}
        return plist
    except mc.Prescription.DoesNotExist:
        return {"error": "No prescription found for the specified user"}
    except Exception as e:
        logging.error(f"Error in getallprescriptionbyuserid: {e}")
        return {"error": "An error occurred while fetching prescriptions for the user"}
