import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../actions';
import StripeCheckout from 'react-stripe-checkout';
const key = import.meta.env.VITE_STRIPE_KEY;

export default function Payments() {
  const dispatch = useDispatch();
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      amount={500}
      token={(token) => console.log(token)}
      stripeKey={key}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
}
