import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderForm = () => {
  const location = useLocation();
  const [food, setFood] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [message, setMessage] = useState('');

  const recipeFromSuggestions = location.state?.recipeName || '';

  useEffect(() => {
    if (recipeFromSuggestions) {
      setFood(recipeFromSuggestions);
    }
  }, [recipeFromSuggestions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/order', {
        food,
        name,
        contact,
        address,
        landmark
      });

      setMessage(res.data.message);
      // Reset form
      setFood('');
      setName('');
      setContact('');
      setAddress('');
      setLandmark('');
    } catch (err) {
      setMessage('Order failed. Please try again.');
      console.error(err);
    }
  };

  const recipeOptions = [
    'Paneer Paratha',
    'Banana Milkshake',
    'Egg Curry with Rice',
    'Chicken Biryani',
    'Rajma Chawal',
    'Idli with Sambar',
    'Grilled Chicken Breast',
    'Fish Curry with Brown Rice',
    'Dalia Upma',
    'Mixed Veg Curry with Chapati',
    'Tandoori Chicken (no oil)',
    'Boiled Eggs with Veggies',
    'Moong Dal Soup',
    'Steamed Veggies with Curd',
    'Grilled Fish with Salad',
    'Egg White Omelette',
    'Balanced Veg Meal',
    'Simple Non-Veg Platter'
  ];

  return (
    <div style={{
      backgroundImage: 'url(/images/gym-background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '450px',
        color: 'white'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Place Your Order</h2>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <select
            value={food}
            onChange={(e) => setFood(e.target.value)}
            disabled={!!recipeFromSuggestions}
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">Select a Recipe</option>
            {recipeOptions.map((recipe, index) => (
              <option key={index} value={recipe}>
                {recipe}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />

          <input
            type="tel"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />

          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows="3"
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />

          <hr style={{ border: '1px solid #555' }} />

          <input
            type="text"
            placeholder="Landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />

          <button type="submit" style={{
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Confirm Order
          </button>
        </form>

        {message && <p style={{ marginTop: '15px', textAlign: 'center' }}>{message}</p>}
      </div>
    </div>
  );
};

export default OrderForm;