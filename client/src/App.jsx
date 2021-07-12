import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './actions';
import axios from 'axios';
import Header from './components/Header.jsx';
import Landing from './components/Landing';
import Success from './components/Success';
import Failure from './components/Failure';
import Purchase from './components/Purchase';
import Dashboard from './components/Dashboard';
import SurveyNew from './components/surveys/SurveyNew';

import Buy from './components/Buy';
import Thanks from './components/Thanks';

window.axios = axios;

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
          <Route
            exact
            path="/api/surveys/:surveyId/:choice"
            component={Thanks}
          />
          <Route exact path="/buy" component={Buy} />
          <Route exact path="/api/survey/:hello" component={Thanks} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
