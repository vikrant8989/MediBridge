from mongoengine import *

class Doctors(Document):
    Dname=StringField(required=True)
    Did=StringField()
    Password = StringField(required = True)
    Gender=StringField()
    Age=IntField()
    Experience=IntField()
    Phone=IntField()
    Email=StringField()
    Specialization=StringField()
    Availability=ListField()
    Location = StringField(required=True)
    Doctor_images = StringField()
    def __dict__(self):
        return{ "Dname":self.Dname,"Did":self.Did,"Password":self.Password,"Gender":self.Gender,"Age":self.Age,
        "Experience":self.Experience,"Phone":self.Phone,"Email":self.Email,"Specialization":self.Specialization,
        "Availability":self.Availability,"Location":self.Location,"Doctor_images":self.Doctor_images}
