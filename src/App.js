import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import HomePage from './components/homepage';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AssessmentPage from './pages/assessment';
import { ROUTES } from './constants/appRoutes';

import './components/all.sass'

function App() {
  return (<Router>
    <Switch>
      <Route exact path={ROUTES.ROOT} component={HomePage} />
      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      <Route exact path={ROUTES.REGISTER} component={RegisterPage} />
      <Route exact path={ROUTES.ASSESSMENT} component={AssessmentPage} />
    </Switch>
  </Router>);
}

export default App;
