from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
import joblib
import os
from flask_cors import CORS
from dotenv import load_dotenv
import logging
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=os.getenv('CORS_ORIGINS', '*'))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key')
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")

# Load model and preprocessing tools
try:
    model_path = os.getenv('MODEL_PATH', os.path.join(MODELS_DIR, "traffic_model.h5"))
    scaler_path = os.getenv('SCALER_PATH', os.path.join(MODELS_DIR, "scaler.pkl"))
    label_encoder_path = os.getenv('LABEL_ENCODER_PATH', os.path.join(MODELS_DIR, "label_encoder.pkl"))

    model = load_model(model_path)
    scaler = joblib.load(scaler_path)
    label_encoder = joblib.load(label_encoder_path)
    
    logger.info("Model and preprocessing tools loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for Docker"""
    try:
        # Basic health check
        status = {
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'model_loaded': model is not None,
            'scaler_loaded': scaler is not None,
            'label_encoder_loaded': label_encoder is not None
        }
        return jsonify(status), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'No data provided'
            }), 400
        
        # Extract features in correct order
        required_fields = ['flowDuration', 'totalFwdPackets', 'totalBackwardPackets', 
                          'fwdPacketLengthMax', 'bwdPacketLengthMax']
        
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'status': 'error',
                    'message': f'Missing required field: {field}'
                }), 400
        
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
        
        logger.info(f"Prediction made: {predicted_label} with confidence {confidence}")
        
        return jsonify({
            'status': 'success',
            'prediction': predicted_label,
            'confidence': confidence,
            'input_features': data,
            'timestamp': datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('FLASK_RUN_PORT', 5001))
    host = os.getenv('FLASK_RUN_HOST', '0.0.0.0')
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    logger.info(f"Starting Flask app on {host}:{port}")
    app.run(debug=debug, host=host, port=port)