import React,{useState} from 'react';
import { useSelector } from 'react-redux';


const Subscriptions = () => {
  const user_id = useSelector((state) => state.user.data.id);
  console.log(user_id)
  const handleCheckout = async () => {
        const priceId = 'price_1PVyJORvynkMKsTDJGrgnbcY';  // Replace this with your actual Price ID

        const response = await fetch('http://localhost:8000/api/create-checkout-session/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price_id: priceId, user_id:user_id }),  // Send the Price ID in the request body
        });

        const data = await response.json();
        if (response.ok) {
            window.location.href = data.checkout_url;
        } else {
            console.error('Error:', data.error);
        }
    };

    return (
        <button onClick={handleCheckout}>
            Checkout
        </button>
    );
};

export default Subscriptions;


