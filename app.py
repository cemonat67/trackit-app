from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime
from functools import wraps
import os
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # CORS tüm kaynaklara açık

SECRET_KEY = "supersecret123"  # Gerçek sistemlerde .env dosyasına alınmalı

# 🔐 Token doğrulayıcı decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            bearer = request.headers['Authorization']
            token = bearer.split()[1] if len(bearer.split()) > 1 else None

        if not token:
            return jsonify({'message': 'Token eksik'}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data['username']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token süresi dolmuş'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token geçersiz'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

# 🔑 Giriş endpoint’i – Token üretir
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username == 'admin' and password == '1234':
        token = jwt.encode({
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# 📊 Dashboard verisi (sabit örnek)
@app.route('/dashboard-data', methods=['GET'])
@token_required
def get_dashboard_data(current_user):
    return jsonify({
        'user': current_user,
        'data': {
            'CO2_emissions': 124.7,
            'last_updated': '2025-06-20T19:00:00Z'
        }
    }), 200

# 📈 Tüm emisyon geçmişi – JSON dosyasından okunur
@app.route('/co2-history', methods=['GET'])
@token_required
def co2_history(current_user):
    file_path = os.path.join(os.path.dirname(__file__), "co2_data.json")

    if not os.path.exists(file_path):
        return jsonify({"data": []})

    with open(file_path, "r") as f:
        try:
            co2_data = json.load(f)
        except json.JSONDecodeError:
            co2_data = []

    return jsonify({"data": co2_data})

# ➕ Yeni CO₂ verisi ekleme
@app.route('/add-co2', methods=['POST'])
@token_required
def add_co2(current_user):
    file_path = os.path.join(os.path.dirname(__file__), "co2_data.json")

    new_entry = request.get_json()
    new_entry["emission"] = float(new_entry["emission"])

    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = []
    else:
        data = []

    data.append(new_entry)

    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)

    return jsonify({"message": "Yeni CO2 verisi eklendi."}), 200

# ▶ Uygulama başlat
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
