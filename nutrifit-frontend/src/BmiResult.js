import React, { useState } from 'react';

function BmiResult() {
  const [showRecipes, setShowRecipes] = useState(false);

  const bmi = 22.5; // You can dynamically pass this later
  const calories = 1800; // Same here

  const recipes = [
    {
      name: 'Grilled Chicken Salad',
      calories: 400,
      ingredients: ['Chicken Breast', 'Lettuce', 'Tomato', 'Olive Oil'],
    },
    {
      name: 'Oats with Fruits',
      calories: 350,
      ingredients: ['Oats', 'Banana', 'Apple', 'Honey'],
    },
    {
      name: 'Quinoa Veg Bowl',
      calories: 450,
      ingredients: ['Quinoa', 'Carrot', 'Beans', 'Paneer'],
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your BMI Result</h2>
      <p><strong>BMI:</strong> {bmi}</p>
      <p><strong>Daily Calorie Need:</strong> {calories} kcal</p>

      <button onClick={() => setShowRecipes(true)}>
        Get Healthy Recipes
      </button>

      {showRecipes && (
        <div style={{ marginTop: '20px' }}>
          <h3>Recipe Suggestions</h3>
          {recipes.map((r, index) => (
            <div key={index} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <h4>{r.name}</h4>
              <p><strong>Calories:</strong> {r.calories}</p>
              <p><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BmiResult;