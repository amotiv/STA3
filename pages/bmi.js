import React, { useState } from 'react';
import axios from 'axios';

const Bmi = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await axios.post('/api/calculateBMI', {
      height: height.toString(), // Convert height to a string before sending
      weight: parseFloat(weight),
    });
  
    setBmi(response.data.bmi);
    setCategory(response.data.category);
  };
  

  return (
    <div>
      <h1>BMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="height">Height (in feet and inches):</label>
        <input
          type="text"
          name="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <label htmlFor="weight">Weight (in pounds):</label>
        <input
          type="text"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <button type="submit">Calculate BMI</button>
      </form>
      {bmi && (
        <div>
          <p>Your BMI is: {bmi}</p>
          <p>Your BMI category is: {category}</p>
        </div>
      )}
    </div>
  );
};

export default Bmi;
