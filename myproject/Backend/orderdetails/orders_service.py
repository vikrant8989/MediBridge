from mongoengine import *
from flask import *
from orderdetails import myorder_collection as ocol
from Medicines import medicine_service as medserv
app = Flask(__name__)

def addOrder(data):
    u = ocol.Orders(
        orderid=data["pharmacyid"],pharmacyid=data["pharmacyid"],userid=data["userid"],
        medicines=data["medicines"],status=data["status"],order_date=data["order_date"],
        paidamount=data["paidamount"])
    u.save()
    return u.__dict__()

def ViewAllOrders():
    foundorders = ocol.Orders.objects
    orderlist = [u.__dict__()for u in foundorders]
    return orderlist

def ViewOrderOfPharmacy(id):
    foundorder = ocol.Orders.objects.filter(pharmacyid = id)
    ordermenu = [u.__dict__() for u in foundorder]
    return ordermenu

def updateorderbyid(id,data):
    for u in ocol.Orders.objects(orderid=id):
         for i in data:
            u[i] = data[i] 
         u.save()
    return
    

def helptocalprice(item,quan):
    return item*quan

def setprice(price,foundorder,orderid):
    for u in foundorder:
        if u == "paidamount":
            foundorder[u]=price
    updateorderbyid(orderid,foundorder)
    return
def CalPrice(orderid):
    try:
        foundorder = ocol.Orders.objects.get(orderid = orderid)
        for u in foundorder:
            if u == "medicines":
                price = 0
                for j in foundorder[u]:
                    price += helptocalprice(j[1],j[2])

                setprice(price,foundorder,orderid)
        return {"Total Cost" : price}
    except ocol.Orders.DoesNotExist:
        return "Order not found"