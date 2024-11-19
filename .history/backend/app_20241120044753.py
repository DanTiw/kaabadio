from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)

# In-memory storage for OTPs with expiration
otp_storage = {}

def generate_otp():
    """Generate a 6-digit OTP."""
    return str(random.randint(100000, 999999))

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    """Send OTP for a given phone number."""
    phone_number = request.json['phoneNumber']
    
    # Generate OTP
    otp = generate_otp()
    
    # Store OTP with timestamp
    otp_storage[phone_number] = {
        'otp': otp,
        'timestamp': time.time()
    }
    
    # In a real app, you'd replace this with actual SMS sending logic
    print(f"OTP for {phone_number}: {otp}")
    
    return jsonify({
        'success': True, 
        'message': 'OTP generated successfully'
    })

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    """Verify OTP for a given phone number."""
    phone_number = request.json['phoneNumber']
    user_otp = request.json['otp']
    
    # Check if OTP exists and is recent (5 minutes expiry)
    stored_otp_data = otp_storage.get(phone_number)
    
    if not stored_otp_data:
        return jsonify({
            'success': False, 
            'message': 'No OTP found for this number'
        }), 400
    
    # Check OTP expiration (5 minutes)
    if time.time() - stored_otp_data['timestamp'] > 300:
        del otp_storage[phone_number]
        return jsonify({
            'success': False, 
            'message': 'OTP has expired'
        }), 400
    
    # Verify OTP
    if stored_otp_data['otp'] == user_otp:
        # Optional: Remove OTP after successful verification
        del otp_storage[phone_number]
        return jsonify({
            'success': True, 
            'message': 'OTP verified successfully'
        })
    else:
        return jsonify({
            'success': False, 
            'message': 'Invalid OTP'
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    # Add this route to handle the root URL
@app.route('/')
def home():
    return jsonify({
        'message': 'OTP Service is running',
        'status': 'active'
    })

# Rest of your existing code remains the same...