import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { reduxForm,stopAsyncValidation, Field, change as reduxChange } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUnsplash } from 'middleware/assessments';
import { renderField, renderFieldWG, renderFieldChangeWG } from '../../utils/formUtils';
import { updateUserProfileValidate as validate } from '../../utils/validates';
import asyncValidate  from 'utils/asyncValidate';
import { togglePassword, getUser } from '../../utils/helpers';
import { updateCurrentUser } from '../../middleware/auth';
import { normalizePhone } from 'utils/normalize'
import ButtonLoader from 'components/core/loader/button-loader'
import _ from 'lodash'
import
{
    Form,
    Button,
} from 'react-bootstrap';
import { ROUTES } from 'constants/appRoutes';
import UploadImageModal from 'components/assessment/shared/UploadImageModal';
import {
    EditProfileIcon,
} from '../../utils/svg';
import masterCardIcon from '../../images/master-card-logo.png';
const UserProfilePage =(props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ openModal, setModalOpen ]  = useState(false);
    const [ asyncLoad, setAsyncLoad ] =  useState(false)
    const userProfileForm = useSelector((state)=>state.form.userProfileForm);
    const userProfileLoading = useSelector((state)=>state.user.userProfileLoading);
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const { handleSubmit , initialize } = props;

    useEffect(() => {
        dispatch(getUnsplash('/photos','bonsai'))
        dispatch({
            type: 'SET_ACTIVE_SIDEBAR',
            payload: 'user-profile'
        })
        const user = getUser();
        if (user && Object.keys(user).length) {
            initialize(user)
        } else {
            history.push(ROUTES.DASHBOARD)
        }
    }, [])

    const submitData = (data) => {
        Object.entries(data).forEach((k) => [ null, '', undefined ].includes(data[ k ]) && delete data[ k ]);
        dispatch(updateCurrentUser(data))
    }

    const handleToggleModal = () => {
        setModalOpen(!openModal)
    }

    const clearImage = () => {
        dispatch(reduxChange('userProfileForm', 'profileImageUrl', null))
    }

    const getBase64 = (base64) => {
        dispatch(reduxChange('userProfileForm', 'profileImageUrl', base64))
    }

    const handleSearch = (event) => {
        const query = event.currentTarget.value || 'cat'
        dispatch(getUnsplash('/photos',query))
    }
    const handleChange = (value) => {
        if(value){
            setAsyncLoad(true)
            asyncValidate(value).then((result) => {
                !result ? dispatch(stopAsyncValidation('userProfileForm', { userName: 'That username is taken' })) : null
                setAsyncLoad(false)
            })
        }
    }
    const asyncValidateFunc = _.debounce(handleChange, 800);
    const asyncChangeCallback = useCallback(asyncValidateFunc, []);

    return(
        <main className="dashboard-data">
            <section className="dashboard-body">
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h4>My Account</h4>
                    </div>
                </div>
                <Form onSubmit={ handleSubmit(submitData) } className={ 'profile-edit-info' }>
                    <div className="profile-avtar-info">
                        <div className="profile-avtar">
                            <div className="upload-feature-img-wrap">
                                <div className="upload-feature-img">
                                    {userProfileForm?.values?.profileImageUrl ? <img src={ userProfileForm?.values?.profileImageUrl } /> : 'Click here to edit feature image'}
                                </div>
                            </div>
                            <a className="edit-profile-avtar" onClick={ handleToggleModal }>
                                <EditProfileIcon />
                            </a>
                        </div>
                        <div className="profile-main-info">
                            <h6>Main info</h6>
                            <h5>{ userProfileForm?.values?.firstName } { userProfileForm?.values?.lastName } </h5>
                            <ButtonLoader
                                button={ <Button className="btn btn-primary profile-save-btn" type="submit">
                                    Save
                                </Button> }
                                loadButton= {
                                    <Button className="btn btn-primary profile-save-btn" disabled={ true } type="button">
                                        Saving
                                    </Button>
                                }
                                loading={ userProfileLoading }

                            />

                        </div>
                        {/* <div className="profile-delete-account">
                            <Button className="btn btn-secondary">
                                Delete Account
                            </Button>
                        </div> */}
                    </div>
                    <div className="profile-personal-info">
                        <Field
                            name="firstName"
                            label="First Name:"
                            type="text"
                            component={ renderFieldWG }
                            maxLength="150"
                            disabled={ userProfileLoading }
                            placeholder='Enter your first name'
                        />
                        <Field
                            name="lastName"
                            label="Last Name:"
                            type="text"
                            component={ renderFieldWG }
                            maxLength="150"
                            disabled={ userProfileLoading }
                            placeholder='Enter your last name'
                        />
                        <Field
                            name="userName"
                            label="User Name:"
                            type="text"
                            handleChange={ asyncChangeCallback }
                            component={ renderFieldChangeWG }
                            maxLength="150"
                            disabled={ userProfileLoading }
                            withoutTouch={ true }
                            placeholder='Enter your user name'
                        />
                        { asyncLoad && <div className="small-up-loader">
                            <div className="lds-facebook"><div></div><div></div><div></div></div>
                        </div> }

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Password:</Form.Label>
                            <div className="password-wrap">
                                <Field
                                    name="password"
                                    label="password"
                                    type="password"
                                    component={ renderField }
                                    maxLength="150"
                                    disabled={ userProfileLoading }
                                    placeholder='Enter your password'
                                />

                                <span onClick={ togglePassword } className="password-swap">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.12 14.12C13.8454 14.4147 13.5141 14.6511 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1961C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.87999M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68189 3.96914 7.6566 6.06 6.05999L17.94 17.94ZM9.9 4.23999C10.5883 4.07887 11.2931 3.99833 12 3.99999C19 3.99999 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19L9.9 4.23999Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 1L23 23" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </Form.Group>
                        <Field
                            name="phone"
                            label="Phone number:"
                            type="text"
                            component={ renderFieldWG }
                            disabled={ userProfileLoading }
                            placeholder='Enter your phone number'
                            normalize={ normalizePhone }
                        />
                    </div>
                </Form>
                <div className="profile-subscription">
                    <div className="profile-active-plan profile-left">
                        <h4 className="profile-subhead">Subscription</h4>
                        <div className="subscribed-plan">
                            <div className="subscribed-plan-info">
                                <h6>Webfin Premium</h6>
                                <h4>$10<sub>/mo</sub></h4>
                                <a className="btn btn-primary">Upgrade</a>
                            </div>
                        </div>
                    </div>
                    <div className="profile-billing-info  profile-right">
                        <h4 className="profile-subhead">Billing</h4>
                        <div className="dashboard-table billing-detail-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>$25.00</td>
                                        <td>Monthly premium subscription</td>
                                        <td>08/12/2020</td>
                                    </tr>
                                    <tr>
                                        <td>$25.00</td>
                                        <td>Monthly premium subscription</td>
                                        <td>08/12/2020</td>
                                    </tr>
                                    <tr>
                                        <td>$25.00</td>
                                        <td>Monthly premium subscription</td>
                                        <td>08/12/2020</td>
                                    </tr>
                                    <tr>
                                        <td>$25.00</td>
                                        <td>Monthly premium subscription</td>
                                        <td>08/12/2020</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="profile-cards">
                    <div className="profile-left profile-add-payment">
                        <h4 className="profile-subhead">Add Payment Method</h4>
                        <Form>
                            <Field
                                label="Name on Card:"
                                type="text"
                                component={ renderFieldWG }
                                placeholder='Name on Card'
                            />
                            <Field
                                label="Credit Card Number:"
                                type="text"
                                component={ renderFieldWG }
                                placeholder='0000-0000-000-0000'
                            />
                            <div className="expiration-date">
                                <Field
                                    label="Expiration Date:"
                                    type="text"
                                    component={ renderFieldWG }
                                    placeholder='00/00'
                                />
                            </div>
                            <div className="security-number">
                                <Field
                                    label="Security Number:"
                                    type="text"
                                    component={ renderFieldWG }
                                    placeholder='Security Number:'
                                />
                            </div>
                            <div className="card-actions">
                                <Button className="btn btn-primary" type="submit">
                                    add Card
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="profile-right profile-card-listing">
                        <h4 className="profile-subhead">My Cards</h4>
                        <ul>
                            <li>
                                <Form.Check
                                    name="card"
                                    type="radio"
                                    id="card-1"
                                    className="card-radio"
                                />
                                <label htmlFor="card-1">
                                    <div className="card-radio-btn">

                                    </div>
                                    <div className="card-icon">
                                        <img src={ masterCardIcon } alt="Master Card" />
                                    </div>
                                    <div className="card-number">
                                        **** 2491
                                    </div>
                                    <div className="card-exp-date">
                                        12/24
                                    </div>
                                    <div className="card-holder">
                                        Jason Miller
                                    </div>
                                </label>
                            </li>
                            <li className="active">
                                <Form.Check
                                    name="card"
                                    type="radio"
                                    id="card-1"
                                    className="card-radio"
                                />
                                <label htmlFor="card-1">
                                    <div className="card-radio-btn">

                                    </div>
                                    <div className="card-icon">
                                        <img src={ masterCardIcon } alt="Master Card" />
                                    </div>
                                    <div className="card-number">
                                        **** 2491
                                    </div>
                                    <div className="card-exp-date">
                                        12/24
                                    </div>
                                    <div className="card-holder">
                                        Jason Miller
                                    </div>
                                </label>
                            </li>
                            <li>
                                <Form.Check
                                    name="card"
                                    type="radio"
                                    id="card-1"
                                    className="card-radio"
                                />
                                <label htmlFor="card-1">
                                    <div className="card-radio-btn">

                                    </div>
                                    <div className="card-icon">
                                        <img src={ masterCardIcon } alt="Master Card" />
                                    </div>
                                    <div className="card-number">
                                        **** 2491
                                    </div>
                                    <div className="card-exp-date">
                                        12/24
                                    </div>
                                    <div className="card-holder">
                                        Jason Miller
                                    </div>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <UploadImageModal
                    fieldName={ 'blogUrl' }
                    clearImage={ clearImage }
                    previewFile={ userProfileForm.values?.profileImageUrl }
                    getBase64={ getBase64 }
                    handleSearch={ handleSearch }
                    unsplashImages={ unsplashImages }
                    openModal={ openModal }
                    handleToggleModal={ handleToggleModal }
                />

            </section>
        </main>
    )
}

UserProfilePage.propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
    submitting: PropTypes.bool,
    asyncValidating: PropTypes.bool
};

export default reduxForm({
    form: 'userProfileForm',
    validate
})(UserProfilePage);
