from mongoengine import * 

class User(Document): 
    userid = StringField()
    uname = StringField(max_length=50,required=True,unique=True) 
    password = StringField(max_length=50,required=True,unique=True)
    email = StringField()
    mobile_no = StringField(max_length=50) 
    
    def __dict__(self): 
        return {"uname":self.uname,
            "password":self.password,
            "email":self.email,
            "mobile_no":self.mobile_no
            }

