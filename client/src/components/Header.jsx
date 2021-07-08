import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import Checkout from './Checkout';
import Purchase from './Purchase';

export default function Header() {
  const user = useSelector((state) => state.auth);
  console.log(user);

  const renderContent = () => {
    switch (user) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="7">
            <Link to="/buy" className="btn">
              ✅ ADD Credits
            </Link>
          </li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits:{user.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo left">
          Emailys
        </a>
        <ul id="nav-mobile" className="right">
          {renderContent()}
        </ul>
      </div>
    </nav>
  );
}

{
  /* <li key="1">
            <Checkout />
          </li>,
          <li key="4">
            <Payments />
     </li>,
      <li key="5">
            <a href="/purchase" className="btn">
              Buy
            </a>
          </li>, */
}
