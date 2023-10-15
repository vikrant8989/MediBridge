from flask import *
from mongoengine import *
from flask_cors import CORS
import string
import random
# from User.User_collection import User
from User_collection import User
import logging

app = Flask(__name__)
CORS(app)
connect("MediBridge")


# Configure logging
log_filename = 'user_service.log'
logging.basicConfig(filename=log_filename, level=logging.ERROR, format='%(asctime)s [%(levelname)s]: %(message)s')

@app.route('/register/user', methods=["POST"])
def register():
    try:
        data = request.get_json()
        print(data)
        userid = ''.join(random.choices(string.ascii_uppercase +string.digits, k=4))
        uname = data.get('name')
        password = data.get('password')
        email = data.get('email')
        mobile_no = data.get('phoneno')
        
        if User.objects(uname=uname).first():
            return "Username already exists."

        user = User(userid=userid, uname=uname, password=password, email=email, mobile_no=mobile_no)
        user.save()
        
        return "Successfully Registered"
    except Exception as e:
        # Log the error message to the log file
        logging.error(f"Error in /register/user: {e}")
        return {"error": "An error occurred during registration"}

@app.route('/login/user')
def checklogin():
    try:
        data = User.objects
        for u in data:
            if request.authorization and request.authorization.username == u.uname and request.authorization.password == u.password:
                print(u.userid)
                return {"id": u.userid}
        return "Invalid Credential"
    except Exception as e:
        logging.error(f"Error in checklogin: {e}")
        return {"error": "An error occurred during login"}


@app.route('/get_users', methods=["GET"])
def get_users():
    users = User.objects().all()
    user_list = []
    for user in users:
        user_data = {
            'uname': user.uname,
            'email': user.email,
            'mobile_no': user.mobile_no
        }
        user_list.append(user_data)

    return jsonify(user_list)

@app.route('/get_usersname/<uid>', methods=["GET"])
def getusernamebyid(uid):
    try:
        print(uid)
        u = User.objects.get(userid=uid)
        return u.uname
    except DoesNotExist as e:
        logging.error(f"User with ID '{uid}' not found: {e}")
        return {"error": f"User with ID '{uid}' not found"}
    except Exception as e:
        logging.error(f"Error in getusernamebyid: {e}")
        return {"error": "An error occurred while retrieving the username"}


if __name__ == '__main__':
    app.run(port=5002)
    

