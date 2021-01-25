import React from 'react';
import { Switch, Route,withRouter } from 'react-router-dom';
import HomePage from './components/homepage';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import TermsCondition from './pages/terms-conditions'
import PrivacyPolicy from './pages/privacy-policy'
import NotFoundPage from './pages/404'
import Dashboard from './pages/dashboard'
import RedirectAuth from './pages/oauth2/redirect'
import AssessmentPage from './pages/assessment';
import ForgetPasswordPage from './pages/forget-password';
import { ROUTES } from './constants/appRoutes';
import {PrivateRoute}  from './components/hoc/PrivateRoute'
import {PublicRoute}  from './components/hoc/PublicRoute'
import {RegisterRoute}  from './components/hoc/RegisterRoute'
import ConfirmAccount from './pages/confirm-account'
import {ConfirmAccountRoute} from './components/hoc/ConfirmAccountRoute'
import './components/all.sass'

const App = (props) => {
  debugger
  return (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={HomePage} />
      <PublicRoute path={ROUTES.LOGIN} name="Login Page" component={ LoginPage }/>
      <RegisterRoute path={ROUTES.REGISTER} name="Register Page" component={ RegisterPage }/>
      <Route exact path={ROUTES.ASSESSMENT} component={AssessmentPage} />
      <PublicRoute path={ROUTES.FORGET_PASSWORD} name="Forget Password Page" component={ ForgetPasswordPage }/>
      <PublicRoute path={ROUTES.AUTH_REDIRECT} name="Auth" component={ RedirectAuth }/>
      <PrivateRoute path={ ROUTES.DASHBOARD } component={Dashboard} />
      <ConfirmAccountRoute  path={ ROUTES.CONFIRM_ACCOUNT } component={ ConfirmAccount } />
      <Route exact path={ROUTES.TERMS_CONDITIONS} component={TermsCondition} />
      <Route exact path={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} />
      <Route exact component={NotFoundPage} />
    </Switch>);
}

export default withRouter(App);
