'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [features, setFeatures] = useState({
    sepalLength: '',
    sepalWidth: '',
    petalLength: '',
    petalWidth: ''
  });
  const [prediction, setPrediction] = useState('');

  // Type for input change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  // Type for form submit event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const featureArray = Object.values(features).map(Number); // Convert input values to numbers
    try {
      const res = await axios.post('http://localhost:5000/api/predict', { features: featureArray });
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Iris Flower Prediction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg">Sepal Length</label>
          <input
            type="range"
            min="0"
            max="10"
            name="sepalLength"
            value={features.sepalLength}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-lg">Sepal Width</label>
          <input
            type="range"
            min="0"
            max="10"
            name="sepalWidth"
            value={features.sepalWidth}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-lg">Petal Length</label>
          <input
            type="range"
            min="0"
            max="10"
            name="petalLength"
            value={features.petalLength}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-lg">Petal Width</label>
          <input
            type="range"
            min="0"
            max="3"
            name="petalWidth"
            value={features.petalWidth}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Predict
        </button>
      </form>
      {prediction && <div className="mt-4">Prediction: {prediction}</div>}
    </div>
  );
}
