import React, { useState } from 'react';
import RecipeSuggestions from './RecipeSuggestion'; // Make sure file name is correct

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [calorieNeed, setCalorieNeed] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();

    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      const roundedBMI = calculatedBMI.toFixed(2);
      setBmi(roundedBMI);

      let bmiStatus = '';
      let calories = 0;

      if (calculatedBMI < 18.5) {
        bmiStatus = 'Underweight';
        calories = 2500;
      } else if (calculatedBMI < 24.9) {
        bmiStatus = 'Normal';
        calories = 2000;
      } else if (calculatedBMI < 29.9) {
        bmiStatus = 'Overweight';
        calories = 1800;
      } else {
        bmiStatus = 'Obese';
        calories = 1500;
      }

      setStatus(bmiStatus);
      setCalorieNeed(calories);
    } else {
      alert('Please enter valid height and weight');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>BMI Calculator</h2>
        <form onSubmit={calculateBMI}>
          <input
            style={styles.inputField}
            type="number"
            placeholder="Height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
          <input
            style={styles.inputField}
            type="number"
            placeholder="Weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          <button type="submit" style={styles.submitBtn}>Calculate</button>
        </form>

        {bmi && (
          <div style={{ marginTop: '20px', color: 'white', textAlign: 'center' }}>
            <h3>Your BMI: {bmi}</h3>
            <p>Status: {status}</p>
            <p>Recommended Calories: {calorieNeed} kcal</p>
          </div>
        )}
      </div>

      {calorieNeed && status && (
        <RecipeSuggestions calorieNeed={calorieNeed} bmiStatus={status} />
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: 'url(/images/gym-background.jpg)',  // Replace with actual path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '40px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default BMICalculator;