import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, change as reduxChange } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUnsplash } from 'middleware/assessments';
import { renderField, renderFieldWG } from '../../utils/formUtils';
import { updateUserProfileValidate as validate } from '../../utils/validates';
import { togglePassword, getUser } from '../../utils/helpers';
import { updateCurrentUser } from '../../middleware/auth';
import
{
    Form,
    Button
} from 'react-bootstrap';
import { ROUTES } from 'constants/appRoutes';
import UploadImageModal from 'components/assessment/shared/UploadImageModal';

const UserProfilePage =(props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ openModal, setModalOpen ]  = useState(false);
    const userProfileForm = useSelector((state)=>state.form.userProfileForm);
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const { handleSubmit } = props;

    useEffect(() => {
        dispatch(getUnsplash('/photos','bonsai'))
        const user = getUser();
        if (user && Object.keys(user).length) {
            dispatch(reduxChange('userProfileForm', 'firstName', user.firstName || ''))
            dispatch(reduxChange('userProfileForm', 'lastName', user.lastName || ''))
            dispatch(reduxChange('userProfileForm', 'password', user.password || ''))
            dispatch(reduxChange('userProfileForm', 'phone', user.phone || ''))
            dispatch(reduxChange('userProfileForm', 'userName', user.userName || ''))
            dispatch(reduxChange('userProfileForm', 'profileImageUrl', user.profileImageUrl || ''))
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

    return(
        <main className="dashboard-data">
            <section className="dashboard-body">
                <Form className="form" onSubmit={ handleSubmit(submitData) }>
                    <div className="upload-feature-img-wrap">
                        <div className="upload-feature-img" onClick={ handleToggleModal }>
                            {userProfileForm?.values?.profileImageUrl ? <img src={ userProfileForm?.values?.profileImageUrl } /> : 'Click here to edit feature image'}
                        </div>
                    </div>
                    <Field
                        name="firstName"
                        label="First Name:"
                        type="text"
                        component={ renderFieldWG }
                        maxLength="150"
                        placeholder='Enter your first name'
                    />
                    <Field
                        name="lastName"
                        label="Last Name:"
                        type="text"
                        component={ renderFieldWG }
                        maxLength="150"
                        placeholder='Enter your last name'
                    />
                    <Field
                        name="userName"
                        label="User Name:"
                        type="text"
                        component={ renderFieldWG }
                        maxLength="150"
                        placeholder='Enter your user name'
                    />
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Password:</Form.Label>
                        <div className="password-wrap">
                            <Field
                                name="password"
                                label="password"
                                type="password"
                                component={ renderField }
                                maxLength="150"
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
                        maxLength="150"
                        placeholder='Enter your phone number'
                    />
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
                    <Button className="btn btn-primary" type="submit">
                        Save
                    </Button>
                </Form>
            </section>
        </main>
    )
}

UserProfilePage.propTypes = {
    handleSubmit: PropTypes.func
};

export default reduxForm({
    form: 'userProfileForm',
    validate
})(UserProfilePage);
