from mongoengine import *
from datetime import datetime

class Prescription(Document):
    userid = StringField(required=True)
    doctorid = StringField(required=True)
    medicines = ListField(required = True)
    created_at = StringField(required = True)
    def __dict__(self):
        return{"medicines":self.medicines,"created_at":self.created_at}