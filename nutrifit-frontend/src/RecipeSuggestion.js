import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeSuggestions = ({ calorieNeed, bmiStatus }) => {
  const [dietType, setDietType] = useState('any'); // Options: 'veg', 'nonveg', 'any'
  const navigate = useNavigate();

  const allRecipes = {
    Underweight: [
      { name: 'Paneer Paratha', calories: 450, type: 'veg' },
      { name: 'Banana Milkshake', calories: 400, type: 'veg' },
      { name: 'Egg Curry with Rice', calories: 500, type: 'nonveg' },
      { name: 'Chicken Biryani', calories: 550, type: 'nonveg' },
    ],
    Normal: [
      { name: 'Rajma Chawal', calories: 350, type: 'veg' },
      { name: 'Idli with Sambar', calories: 300, type: 'veg' },
      { name: 'Grilled Chicken Breast', calories: 380, type: 'nonveg' },
      { name: 'Fish Curry with Brown Rice', calories: 400, type: 'nonveg' },
    ],
    Overweight: [
      { name: 'Dalia Upma', calories: 250, type: 'veg' },
      { name: 'Mixed Veg Curry with Chapati', calories: 300, type: 'veg' },
      { name: 'Tandoori Chicken (no oil)', calories: 280, type: 'nonveg' },
      { name: 'Boiled Eggs with Veggies', calories: 270, type: 'nonveg' },
    ],
    Obese: [
      { name: 'Moong Dal Soup', calories: 180, type: 'veg' },
      { name: 'Steamed Veggies with Curd', calories: 150, type: 'veg' },
      { name: 'Grilled Fish with Salad', calories: 200, type: 'nonveg' },
      { name: 'Egg White Omelette', calories: 160, type: 'nonveg' },
    ],
    Default: [
      { name: 'Balanced Veg Meal', calories: 300, type: 'veg' },
      { name: 'Simple Non-Veg Platter', calories: 320, type: 'nonveg' },
    ]
  };

  let selectedRecipes = allRecipes[bmiStatus] || allRecipes.Default;

  // Apply diet filter
  if (dietType !== 'any') {
    selectedRecipes = selectedRecipes.filter(recipe => recipe.type === dietType);
  }

  // Filter by calories
  const filteredRecipes = selectedRecipes.filter(recipe => recipe.calories <= calorieNeed);

  return (
    <div style={styles.container}>
      <div style={styles.innerBox}>
        <h3 style={styles.heading}>Recipe Suggestions for {bmiStatus}</h3>

        <label style={styles.label}>Choose Diet Type:</label>
        <select
          value={dietType}
          onChange={(e) => setDietType(e.target.value)}
          style={styles.select}
        >
          <option value="any">Any</option>
          <option value="veg">Vegetarian</option>
          <option value="nonveg">Non-Vegetarian</option>
        </select>

        <ul style={styles.list}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <li key={index} style={styles.listItem}>
                <span>{recipe.name} - {recipe.calories} Calories ({recipe.type})</span>
                <button
                  style={styles.button}
                  onClick={() =>
                    navigate('/order', {
                      state: { recipeName: recipe.name }
                    })
                  }
                >
                  Order Now
                </button>
              </li>
            ))
          ) : (
            <p style={styles.noRecipes}>No recipes found for your selections.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: 'url(/images/gym-background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '30px',
    borderRadius: '10px',
    width: '500px',
    color: 'white',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  select: {
    width: '100%',
    padding: '8px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noRecipes: {
    textAlign: 'center',
    color: '#ccc',
    fontStyle: 'italic',
  },
};

export default RecipeSuggestions;