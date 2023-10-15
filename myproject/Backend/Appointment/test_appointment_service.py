import pytest
from flask import Flask
from appointmentcontroller import app # Replace with the actual name of your Flask app module
import json
from datetime import datetime
# Initialize the Flask app for testing
@pytest.fixture
def client() -> Flask:
    with app.test_client() as client:
        yield client

def test_book_appointment_duplicate(client):
    # Define a sample appointment data with the same datetime and doctor
    appointment_datetime = "2023-09-15 11:00"
    userid = "1"
    doctorid= "6"

    # Send a POST request to book the appointment
    response = client.post(f'/book_appointment/{doctorid}/{userid}/{appointment_datetime}')

    # assert response.status_code == 400
    assert response.data.decode('utf-8') == "No"