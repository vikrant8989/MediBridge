from mongoengine import *

class Medicine(Document):
    medicineid = StringField(max_length=50)
    # medicineid = SequenceField()
    name = StringField(max_length=50,required = True)
    brandname = StringField(max_length=200)
    category = StringField(max_length=20)
    description = StringField(max_length=10000)
    saltcomposition = StringField(max_length=200)
    totalstock = IntField()
    unitprice = FloatField()
    medicine_image = StringField()
    def __dict__(self):
        return {"medicineid":self.medicineid,"name":self.name,"brandname":self.brandname,
                "category":self.category,"description":self.description,
                "saltcomposition":self.saltcomposition,"totalstock":self.totalstock,
                "unitprice":self.unitprice,"medicine_image":self.medicine_image}
    