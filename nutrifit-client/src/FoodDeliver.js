import React, { useState } from 'react';
import axios from 'axios';

const FoodDelivery = () => {
  // State for the form fields and messages
  const [recipeId, setRecipeId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission and API request
  const scheduleDelivery = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    // Validate if all fields are filled
    if (!recipeId || !deliveryAddress || !deliveryDate) {
      setMessage('Please fill in all fields.');
      return;
    }
    
    // Set loading state to true
    setIsLoading(true);

    try {
      // Sending the POST request to schedule food delivery
      const response = await axios.post('http://localhost:3001/api/food_delivery', {
        recipe_id: recipeId,
        delivery_address: deliveryAddress,
        delivery_date: deliveryDate
      });
      
      // Show success message if delivery is scheduled successfully
      setMessage('Food delivery scheduled successfully!');
      console.log('Food delivery scheduled:', response.data);
    } catch (error) {
      // Show error message in case of a failed request
      setMessage('Error scheduling delivery. Please try again.');
      console.error('Error scheduling delivery:', error);
    } finally {
      // Reset loading state after request completion
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Schedule Food Delivery</h2>
      
      {/* Form for scheduling food delivery */}
      <form onSubmit={scheduleDelivery}>
        <div>
          <label htmlFor="recipeId">Recipe ID: </label>
          <input
            id="recipeId"
            type="number"
            placeholder="Enter Recipe ID"
            value={recipeId}
            onChange={(e) => setRecipeId(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="deliveryAddress">Delivery Address: </label>
          <input
            id="deliveryAddress"
            type="text"
            placeholder="Enter Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="deliveryDate">Delivery Date: </label>
          <input
            id="deliveryDate"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>
        
        {/* Submit button with dynamic text based on loading state */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Scheduling...' : 'Schedule Delivery'}
        </button>
      </form>

      {/* Display success or error message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default FoodDelivery;