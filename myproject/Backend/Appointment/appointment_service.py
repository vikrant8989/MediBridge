from mongoengine import *
import appointment_collection as Ac
from flask import *
# from User import User_service as us
import logging
# from datetime import datetime, timedelta
import requests

# Configure logging
log_filename = 'appointment_service.log'
logging.basicConfig(filename=log_filename, level=logging.ERROR, format='%(asctime)s [%(levelname)s]: %(message)s')


def bookAppointment(appointment_datetime, user_id, doctor_id):
    try:
        existing_appointment = Ac.Appointment.objects(doctorid=doctor_id, appointment_datetime=appointment_datetime)
        if len(existing_appointment) == 0:
            appointment = Ac.Appointment(doctorid=doctor_id, userid=user_id, appointment_datetime=appointment_datetime)
            appointment.save()
            return appointment.__dict__()
        else:
            return "No"
    except Exception as e:
        logging.error(f"Error in bookAppointment: {e}")
        return {"error": "An error occurred while booking the appointment"}


def getallAppointment(doctor_id):
    try:
        found_appointments = Ac.Appointment.objects(doctorid=doctor_id)
        appointments_with_usernames = []
        for appointment in found_appointments:
            response = requests.get("http://127.0.0.1:5002//get_usersname/"+appointment.userid)
            if response.status_code == 200:
                data = response.text 
                print(data)
            # user = us.getusernamebyid(appointment.userid)
            # print(user)
            appointment_data = {
                "username": data,
                "userid": appointment.userid,
                "created_at": appointment.appointment_datetime
            }
            appointments_with_usernames.append(appointment_data)
        return appointments_with_usernames
    except Exception as e:
        # Log the error message to the log file
        logging.error(f"Error in getallAppointment: {e}")
        return {"error": "An error occurred while fetching appointments"}

