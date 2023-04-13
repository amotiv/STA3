// pages/api/calculateBMI.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { height, weight } = req.body;
  
      const bmi = calculateBMI(height, weight);
      const category = bmiCategory(bmi);
  
      res.status(200).json({ bmi, category });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  
  function calculateBMI(height, weight) {
    const heightParts = height.split(/[ ,]+/).filter(Boolean); // Extract feet and inches
    const feet = parseInt(heightParts[0], 10);
    const inches = heightParts.length > 1 ? parseInt(heightParts[1], 10) : 0;
    const heightInMeters = (feet * 12 + inches) * 0.0254;
    const weightInKilograms = weight * 0.453592;
    const bmi = weightInKilograms / (heightInMeters ** 2);
    return bmi.toFixed(1);
  }
  
  
  
  function bmiCategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
    return 'Obese';
  }
  