import React, { useState, useEffect, useRef } from 'react';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { handleToken } from '../actions';
import { useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const MyCheckoutForm = () => {
  const email = useRef('');
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email.current.value,
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          // postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
    });
    dispatch(handleToken(paymentMethod));
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" ref={email} placeholder="Your Email" />
      <CardElement />
      <button className="btn" type="submit">
        Buy Now
      </button>
    </form>
  );
};

export default function Purchase() {
  return (
    <Elements stripe={stripePromise}>
      <MyCheckoutForm />
    </Elements>
  );
}
