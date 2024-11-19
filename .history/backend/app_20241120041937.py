from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    phone_number = request.json['phoneNumber']
    # Implement your OTP sending logic here
    return jsonify({'success': True, 'message': 'OTP sent successfully'})

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    phone_number = request.json['phoneNumber']
    otp = request.json['otp']
    # Implement your OTP verification logic here
    return jsonify({'success': True, 'message': 'OTP verified successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)