import React from 'react';

export default function Checkout() {
  return (
    <form action="/api/create-checkout-session" method="POST">
      <button className="btn" type="submit">
        ✅ Add Credits
      </button>
    </form>
  );
}
