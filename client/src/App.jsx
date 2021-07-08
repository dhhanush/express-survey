import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './actions';

import Header from './components/Header.jsx';
import Landing from './components/Landing';
import Success from './components/Success';
import Failure from './components/Failure';
import Purchase from './components/Purchase';
import Buy from './components/Buy';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

function App() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/surveys/new" component={SurveyNew} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/buy" component={Buy} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
