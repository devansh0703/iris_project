from flask import Flask, request, jsonify
import joblib
import numpy as np
import pickle
app = Flask(__name__)

model = joblib.load('/media/devansh/New Volume/repos/Machine Learning Projects/fullstack-iris-app/app/model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['features']
    prediction = model.predict([data]).tolist()
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(port=5001)
