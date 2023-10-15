import pytest
from flask import Flask
from prescriptioncontroller import app # Replace with the actual name of your Flask app module
import json
from datetime import datetime
# Initialize the Flask app for testing
@pytest.fixture
def client() -> Flask:
    with app.test_client() as client:
        yield client

def test_get_all_prescriptions(client):
    response = client.get('/prescription')  # Replace with the actual endpoint you're testing
    assert response.status_code == 200

    data = json.loads(response.data.decode('utf-8'))
    assert isinstance(data, list)


def test_add_prescription(client):
    # Define sample prescription data for testing
    sample_data = {
        "userid": "user123",
        "doctorid": "doc456",
        "medicines": ["Medicine1", "Medicine2"],
        "created_at":  datetime.now().isoformat()
    }

    # Send a POST request with sample_data
    response = client.post('/prescription/add', json=sample_data)
    assert response.status_code == 200

    # Parse the response data as JSON
    data = json.loads(response.data.decode('utf-8'))

    assert isinstance(data, dict)


if __name__ == '__main__':
    pytest.main()





