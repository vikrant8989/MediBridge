from mongoengine import *

class Appointment(Document):
    doctorid = StringField()
    userid = StringField() 
    appointment_datetime = StringField()
    def __dict__(self):
        return{ "userid":self.userid,"doctorid":self.doctorid,"appointment_datetime":self.appointment_datetime}