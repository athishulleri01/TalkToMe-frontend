import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('monthly');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      const response = await axios.post('http://127.0.0.1:8006/api/subscriptions/', {
        user: 1,  // Replace with actual user ID
        stripeToken: token.id,
        email: email,
        plan: plan,
      });

      if (response.status === 201) {
        console.log('Subscription created:', response.data);
      } else {
        console.error('Subscription creation failed:', response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="monthly">Monthly</option>
        <option value="sixmonth">Six Month</option>
        <option value="yearly">Yearly</option>
      </select>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Subscribe
      </button>
    </form>
  );
};

export default SubscriptionForm;
