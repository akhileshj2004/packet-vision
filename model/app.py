from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")

# Load model and preprocessing tools
model = load_model(os.path.join(MODELS_DIR, "traffic_model.keras"))
scaler = joblib.load(os.path.join(MODELS_DIR, "scaler.pkl"))
label_encoder = joblib.load(os.path.join(MODELS_DIR, "label_encoder.pkl"))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        
        # Extract features in correct order
        features = [
            data['flowDuration'],
            data['totalFwdPackets'],
            data['totalBackwardPackets'],
            data['fwdPacketLengthMax'],
            data['bwdPacketLengthMax']
        ]
        
        # Convert to numpy array and reshape
        input_data = np.array([features])
        
        # Preprocess
        input_scaled = scaler.transform(input_data)
        
        # Predict
        prediction = model.predict(input_scaled)
        predicted_class = np.argmax(prediction)
        predicted_label = label_encoder.inverse_transform([predicted_class])[0]
        
        # Get confidence
        confidence = float(np.max(prediction))
        
        return jsonify({
            'status': 'success',
            'prediction': predicted_label,
            'confidence': confidence,
            'input_features': data
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True)