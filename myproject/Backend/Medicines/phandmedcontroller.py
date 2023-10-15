from mongoengine import *
import pharmacies_service as ph
import mypharmacy_collection as myphc
import medicine_service as ms 
# import orders_service as oserv
import string
import random
from flask import *
from flask_cors import CORS

connect("MediBridge")
app = Flask(__name__)
CORS(app)


@app.route("/pharmacies/login")
def check():
    return jsonify(ph.checklogin())

# get all pharmacy
@app.route("/pharmacies")
def getpharmacy():
    return jsonify(ph.getallPharmacies())


# pharmacies registration
@app.route("/pharmacies/register",methods=["POST"])
def addpharmacies():
    data = request.json
    return jsonify(ph.registerPharmacy(data))

# get pharmacies by id
@app.route("/pharmacies/<string:pharmacyId>/")
def getpharmacybyid(pharmacyId):
    return jsonify(ph.getPharmacyByid(pharmacyId))

# get med by pharmacyid
@app.route("/pharmacies/getmed/<string:pharmacyId>/")
def getmedbypharmacyid(pharmacyId):
    print(pharmacyId)
    medidlist = ph.getmedidlist(pharmacyId)
    result = []
    for i in medidlist:
        temp = ms.getmedicinebyid(i)
        result.append(temp)
    return result

# to search pharmacies by name
@app.route("/pharmacies/<string:name>")
def getpharmacybyname(name):
    return jsonify(ph.getPharmacyByName(name))

# to delete pharmacy
@app.route("/pharmacies/<string:pharmacyId>/",methods=["DELETE"])
def delpharmacy(pharmacyId):
    return jsonify(ph.delpharmacybyID(pharmacyId))

# to update pharmacy
@app.route("/pharmacies/<string:pharmacyId>",methods=["PUT"])
def updatePharmacy(pharmacyId):
    data = request.json
    return jsonify(ph.updatePharmacybyid(pharmacyId,data))

# to add medicine
@app.route("/medicines/add",methods=["POST"])
def add_new_medicines():
    data = request.form.to_dict()
    medicineid = ''.join(random.choices(string.ascii_uppercase +string.digits, k=4))
    pharmacyid = data["pharmacyid"]
    fdata = {"medicineid":medicineid,"name":data["name"],"brandname":data["brandname"],"category":data["category"],
            "description":data["description"],"saltcomposition":data["saltcomposition"],"totalstock":data["totalstock"],
            "unitprice":data["unitprice"]}
    imagefile = request.files.get("medicine_image")
    return jsonify(ms.addmedicine(fdata,imagefile,pharmacyid))

# to view all medicine
@app.route("/medicines")
def getallmedicine():
    return jsonify(ms.getAllMed())

# to search medicine by name
@app.route("/medicines/<string:name>")
def getmedbyname(name):
    print(name)
    return jsonify(ms.getmedicinebyname(name))

# to search medicine by category
@app.route("/medicines/<string:cate>")
def getmedbycategory(cate):
    return jsonify(ms.getmedicinebycategory(cate))

# to search medicine by id
@app.route("/medicines/<id>")
def getmedbybyid(id):
    return jsonify(ms.getmedicinebyid(id))

# to update medicine details
@app.route("/medicines/<string:medicineid>",methods=["PUT"])
def updatemed(medicineid):
    data = request.json
    return jsonify(ms.updatMedicine(medicineid,data))

@app.route("/medicines/sort/<string:field>/<int:ch>")
def sortbyfield(field,ch):
    return jsonify(ms.mysort(field,ch))


# to place order
# @app.route("/orders",methods=["POST"])
# def addorder():
#     data = request.json
#     return jsonify(oserv.addOrder(data))

# to view all orders
# @app.route("/orders")
# def vieworder():
#     return jsonify(oserv.ViewAllOrders())

# to get all order from particular pharmacy
# @app.route("/orders/<string:id>")
# def vieworderofpharmacy(id):
#     return jsonify(oserv.ViewOrderOfPharmacy(id))

# to calculate price of particular order
# @app.route("/orders/<string:orderid>",methods=["PUT"])
# def setprice(orderid):
#     return jsonify(oserv.CalPrice(orderid))

@app.route("/get_image/<string:name>")
def getimage(name):
    return ms.get_image(name)

if __name__ == "__main__":
    app.run(port=5001) 


