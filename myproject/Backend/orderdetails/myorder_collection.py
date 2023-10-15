from mongoengine import *
from datetime import datetime

class Orders(Document):
    orderid = StringField()
    pharmacyid = StringField()
    userid = StringField()
    # to store med name and quant  
    medicines = ListField()
    status = StringField()
    order_date = DateField()
    paidamount = FloatField()
    def __dict__(self):
        return {"orderid":self.orderid,"pharmacyid":self.pharmacyid,"userid":self.userid,"medicines":self.medicines,
                "status":self.status,"order_date":self.order_date,
                "paidamount":self.paidamount}
