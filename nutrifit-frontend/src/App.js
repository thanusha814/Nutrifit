import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import BmiResult from './BmiResult';
import BMICalculator from './BMICalculator';
import RecipeSuggestions from './RecipeSuggestion';
import OrderForm from './OrderForm'; // Corrected the case here
import FoodDelivery from './FoodDeliver'; // Import the new FoodDelivery component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bmi-result" element={<BmiResult />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/recipe-suggestions" element={<RecipeSuggestions />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/food-delivery" element={<FoodDelivery />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;