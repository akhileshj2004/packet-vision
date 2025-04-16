import pandas as pd
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.utils import class_weight
import joblib
import os

def build_dnn_model(input_dim, output_dim):
    model = Sequential()
    model.add(Dense(128, activation='relu', input_dim=input_dim))
    model.add(Dropout(0.2))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.2))
    model.add(Dense(32, activation='relu'))
    model.add(Dropout(0.2))
    model.add(Dense(output_dim, activation='softmax'))
    model.compile(optimizer=Adam(), loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def main():
    try:
        # 1. Data Loading
        data_path = os.path.join("packet-vision", "Portmap.csv")
        df = pd.read_csv(data_path, low_memory=False)
        
        # 2. Use exact column names from your CSV (with leading spaces)
        selected_features = [
            ' Flow Duration',        # Note the leading space
            ' Total Fwd Packets',    # Note the leading space
            ' Total Backward Packets',  # Note the leading space
            ' Fwd Packet Length Max',   # Note the leading space
            'Bwd Packet Length Max'     # No leading space in your data
        ]
        
        label_col = ' Label'  # With leading space
        
        # 3. Verify features exist
        missing = [f for f in selected_features + [label_col] if f not in df.columns]
        if missing:
            print("\nAvailable columns:")
            print(df.columns.tolist())
            raise ValueError(f"Missing features: {missing}")
            
        # 4. Data Preparation
        X = df[selected_features]
        y = df[label_col]

        # 5. Check data balance
        print("\nLabel distribution:")
        print(y.value_counts())
        
        # 6. Preprocessing
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        label_encoder = LabelEncoder()
        y_encoded = label_encoder.fit_transform(y)
        y_cat = to_categorical(y_encoded)
        
        # 7. Train-Test Split
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y_cat, test_size=0.2, random_state=42)
        
        # 8. Model Training
        model = build_dnn_model(X_train.shape[1], y_cat.shape[1])
        
        history = model.fit(
            X_train, y_train,
            epochs=20,
            batch_size=64,
            validation_data=(X_test, y_test),
            verbose=1
        )
        
        # 9. Evaluation
        loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
        print(f"\nTest Accuracy: {accuracy*100:.2f}%")
        
        # 10. Save Model
        os.makedirs("models", exist_ok=True)
        model.save(os.path.join("models", "traffic_model.keras"))
        joblib.dump(scaler, os.path.join("models", "scaler.pkl"))
        joblib.dump(label_encoder, os.path.join("models", "label_encoder.pkl"))
        
        print("\nModel saved successfully!")
        print("Files in models directory:", os.listdir("models"))
        
    except Exception as e:
        print(f"\nERROR: {str(e)}")
        raise

if __name__ == "__main__":
    main()