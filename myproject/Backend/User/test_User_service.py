import pytest
from flask import Flask
from User_service import app  # Import your Flask app
import json
import base64

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# def test_register(client):
#     data = {
#         "name": "testuser",
#         "password": "password123",
#         "email": "test@example.com",
#         "phoneno": "1234567890"
#     }
#     response = client.post('/register/user', json=data)
#     assert response.status_code == 200
#     assert b"Successfully Registered" in response.data

def test_register_duplicate_username(client):
    data = {
        "name": "testuser",
        "password": "password123",
        "email": "test@example.com",
        "phoneno": "1234567890"
    }
    response = client.post('/register/user', json=data)
    assert response.status_code == 200
    assert b"Username already exists." in response.data

def test_checklogin_valid_credentials(client):
    username = 'testuser'
    password = 'password123'
    credentials = base64.b64encode(f"{username}:{password}".encode()).decode('utf-8')
    headers = {'Authorization': f'Basic {credentials}'}

    response = client.get('/login/user', headers=headers)
    assert response.status_code == 200
    data = json.loads(response.data.decode('utf-8'))
    assert 'id' in data

def test_checklogin_invalid_credentials(client):
    username = 'testuser'
    password = 'wrongpassword'
    credentials = base64.b64encode(f"{username}:{password}".encode()).decode('utf-8')
    headers = {'Authorization': f'Basic {credentials}'}

    response = client.get('/login/user', headers=headers)
    assert response.status_code == 200
    assert b"Invalid Credential" in response.data

def test_get_users(client):
    response = client.get('/get_users')
    assert response.status_code == 200
    data = json.loads(response.data.decode('utf-8'))
    assert isinstance(data, list)

def test_get_username_by_id(client):
    login_credentials = ('testuser', 'password123')
    login_credentials_encoded = base64.b64encode(f"{login_credentials[0]}:{login_credentials[1]}".encode()).decode('utf-8')
    login_headers = {'Authorization': f'Basic {login_credentials_encoded}'}

    login_response = client.get('/login/user', headers=login_headers)
    assert login_response.status_code == 200
    login_data = json.loads(login_response.data.decode('utf-8'))
    user_id = login_data['id']
    assert {user_id:"SOZQ"} 