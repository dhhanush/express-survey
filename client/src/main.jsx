import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css';
import App from './App';

const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
