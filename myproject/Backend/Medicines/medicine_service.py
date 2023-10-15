from mongoengine import *
from flask import *
import os
import mymedicine_collection as medcol
import pharmacies_service as pc

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def addmedicine(data,image_file,pharmacyid):
    if image_file :
        image_filename = os.path.join(app.config['UPLOAD_FOLDER'], data["name"])
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(app.config['UPLOAD_FOLDER'])
        
        image_file.save(image_filename)
    u = medcol.Medicine(
        medicineid=data["medicineid"],name=data["name"],brandname=data["brandname"],
        category=data["category"],description=data["description"],saltcomposition=data["saltcomposition"],
        totalstock=data["totalstock"],unitprice=data["unitprice"],medicine_image = image_file.filename)
    u.save() 
    pc.updatemedrefofpharmacy(pharmacyid,data["medicineid"])
    return u.__dict__()

# Define the route to serve images based on the filename
def get_image(image_filename):
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_filename) 
    if os.path.exists(image_path):
        return send_from_directory(app.config['UPLOAD_FOLDER'], image_filename)
    else:
        return "Image not found", 404

def getAllMed():
    foundmed = medcol.Medicine.objects
    medlist = [u.__dict__()for u in foundmed]
    return medlist
  
def getmedicinebyname(name):
    try: 
        u = medcol.Medicine.objects.get(name = name)
        return u.__dict__()
    except medcol.Medicine.DoesNotExist:
        return "Medicine not Found"
    
def getmedicinebycategory(cate):
    try: 
        u = medcol.Medicine.objects.get(category = cate)
        return u.__dict__()
    except medcol.Medicine.DoesNotExist:
        return "Category not found"

def getmedicinebyid(id):
    try: 
        u = medcol.Medicine.objects.get(medicineid = id)
        return u.__dict__()
    except medcol.Medicine.DoesNotExist:
        return "ID not found"
    
def updatMedicine(medicineid,data):
    for u in medcol.Medicine.objects(medicineid=medicineid):
         for i in data:
            u[i] = data[i] 
         u.save()
    return u.__dict__()

def findpricebyname(name,pharmacyid):
    print(name,pharmacyid)
    try:
        foundorder = medcol.Medicine.objects.filter(pharmacyid = pharmacyid)
        print(foundorder)
    except medcol.Medicine.DoesNotExist:
        return "Medicine not found"

def mysort(field,isreverse):
    foundmed = medcol.Medicine.objects
    medlist = [u.__dict__()for u in foundmed]
    medlist.sort(key=lambda m : m[field],reverse=isreverse)
    return medlist