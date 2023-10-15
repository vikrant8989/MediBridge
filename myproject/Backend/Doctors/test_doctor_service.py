import pytest
from flask import Flask
from doctorcontroller import app # Replace with the actual name of your Flask app module
import json
import base64

# Initialize the Flask app for testing
@pytest.fixture
def client() -> Flask:
    with app.test_client() as client:
        yield client

# Test the checklogin function
def test_checklogin_valid_credentials(client):
    username = 'Tanvi Singh'
    password = '1234567'
    credentials = base64.b64encode(f"{username}:{password}".encode()).decode('utf-8')
    headers = {'Authorization': f'Basic {credentials}'}

    response = client.get('/Doctor/login', headers=headers)
    assert response.status_code == 200
    data = json.loads(response.data.decode('utf-8'))
    assert 'id' in data

def test_getdoctorByid(client):
    doctor_id = '1'
    response = client.get(f'/Doctor/{doctor_id}')
    assert response.status_code == 200
    data = json.loads(response.data.decode('utf-8'))

    # Ensure the response contains the expected fields
    assert 'Dname' in data
    assert 'Did' in data
    assert 'Age' in data
    assert 'Gender' in data
    assert 'Experience' in data
    assert 'Phone' in data
    assert 'Email' in data
    assert 'Specialization' in data
    assert 'Location' in data
    assert 'Doctor_images' in data

def test_getdoctornameByid(client):
    doctor_id = '1'
    response = client.get(f'/doctors/{doctor_id}/')
    assert response.status_code == 200
    expected_response = "Vikrant Pratap Singh"
    assert response.data.decode('utf-8') == expected_response

def test_getalldoctor(client):
    response = client.get('/Doctors')  # Replace with the actual endpoint you're testing
    assert response.status_code == 200

    data = json.loads(response.data.decode('utf-8'))
    assert isinstance(data, list)

def test_search_doctor_by_specialization(client):
    specialization = 'Cardiologist'

    response = client.get(f'/doctors/search/spz/{specialization}/')
    assert response.status_code == 200

    # Parse the response data as JSON
    data = json.loads(response.data.decode('utf-8'))

    # Ensure that the response is a list (since the function returns a list of doctors)
    assert isinstance(data, list)

if __name__ == '__main__':
    pytest.main()
