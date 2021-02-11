import React from 'react';
import { Switch, Route,withRouter } from 'react-router-dom';
import { ROUTES } from './constants/appRoutes';
import HomePage from './components/homepage';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import TermsCondition from './pages/terms-conditions';
import PrivacyPolicy from './pages/privacy-policy';
import NotFoundPage from './pages/404';
import Dashboard from './pages/dashboard';
import RedirectAuth from './pages/oauth2/redirect';
import AssessmentPage from './pages/assessment';
import ForgetPasswordPage from './pages/forget-password';
import EditSitePage from './pages/edit-site';
import BlogPage from './pages/blog';
import BlogsPage from './pages/blogs';
import UserProfilePage from './pages/user-profile';
import { PrivateRoute }  from './components/hoc/PrivateRoute';
import { AssessmentRoute } from './components/hoc/AssessmentRoute';
import { PublicRoute }  from './components/hoc/PublicRoute';
import ConfirmAccount from './pages/confirm-account';
import { ConfirmAccountRoute } from './components/hoc/ConfirmAccountRoute';
import Layout from './components/shared/Layout';
import './components/all.sass';
import './components/dashboard.sass';
const RegisterRoute = React.lazy(() => import('./components/hoc/RegisterRoute'));

const App = () => {
    return (
        <Switch>
            <Layout className="main-layout">
                <PublicRoute exact path={ ROUTES.ROOT } component={ HomePage } />
                <PublicRoute path={ ROUTES.LOGIN } name="Login Page" component={ LoginPage }/>
                <RegisterRoute path={ ROUTES.REGISTER } name="Register Page" component={ RegisterPage }/>
                <AssessmentRoute exact path={ ROUTES.ASSESSMENT } component={ AssessmentPage } />
                <PublicRoute path={ ROUTES.FORGET_PASSWORD } name="Forget Password Page" component={ ForgetPasswordPage }/>
                <PublicRoute path={ ROUTES.AUTH_REDIRECT } name="Auth" component={ RedirectAuth }/>
                <PrivateRoute path={ ROUTES.DASHBOARD } component={ Dashboard } />
                <ConfirmAccountRoute  path={ ROUTES.CONFIRM_ACCOUNT } component={ ConfirmAccount } />
                <Route exact path={ ROUTES.TERMS_CONDITIONS } component={ TermsCondition } />
                <Route exact path={ ROUTES.PRIVACY_POLICY } component={ PrivacyPolicy } />
                <PrivateRoute exact path={ ROUTES.BLOG } component={ BlogPage } />
                <PrivateRoute exact path={ ROUTES.BLOGS } component={ BlogsPage } />
                <PrivateRoute exact path={ ROUTES.EDIT_SITE } component={ EditSitePage } />
                <PrivateRoute exact path={ ROUTES.EDIT_BLOG } component={ BlogPage } />
                <Route exact path={ ROUTES.USER_PROFILE } component={ UserProfilePage } />
            </Layout>
            <Route exact component={ NotFoundPage } />
        </Switch>);
}

export default withRouter(App);
