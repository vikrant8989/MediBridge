from mongoengine import *

class Pharmacy(Document):
    pharmacyid = StringField(max_length=50)
    name = StringField(max_length=50,required = True)
    password = StringField(max_length=50)
    address = StringField(max_length=200)
    phone_number = StringField(max_length=20)
    operating_hours = StringField()
    owner = StringField()
    reviews = ListField(StringField())
    medref = ListField()
    def __dict__(self):
        return {"pharmacyid":self.pharmacyid,"name":self.name,"password":self.password,"address":self.address,
                "phone_number":self.phone_number,"operating_hours":self.operating_hours,
                "owner":self.owner,"reviews":self.reviews,"medref":self.medref}
    