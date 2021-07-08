import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { createStore, applyMiddleware } from 'redux';
import { Elements } from '@stripe/react-stripe-js';
import { Provider } from 'react-redux';
import './index.css';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css';
import App from './App';

const store = createStore(reducers, applyMiddleware(reduxThunk));
const stripePromise = loadStripe(
  'pk_test_51HVDRhFynJUwAVwEUOS5v7ZLHfkHuo5B528XPWggemGZzBawNHidTpNMNNlwEuVVQv7F8EidvVntOV4hv1AYQRpk00sVbGOzYt'
);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
