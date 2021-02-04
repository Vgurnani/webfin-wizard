import React from 'react'
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import { renderFieldWG } from '../../utils/formUtils'
import PropTypes from 'prop-types';

import
{
    Form,
    Button
}
    from 'react-bootstrap';
const ForgetPasswordForm = (props) => {
    const { handleSubmit, submitData } = props;
    return(
        <div className="forget-forms signup-forms">
            <Form className="form" onSubmit={ handleSubmit(submitData) }>
                <div className="forget-form-inner">
                    <div className="forget-forms-element">
                        <h1 className="section-heading">
                            Forget password
                        </h1>
                        <p className="heading-detail">
                            You will recieve a code to create new password.
                        </p>
                        <div className="small-wrapper">

                            <Field
                                name="email"
                                label="email"
                                type="text"
                                component={ renderFieldWG }
                                maxLength="150"
                                placeholder='Enter your email'
                            />
                            <Form.Text className="form-text">
                                Review your email!
                            </Form.Text>
                        </div>
                    </div>
                    <div className="forgot-btns">
                        <div className="small-wrapper">
                            <Button className="btn btn-primary" type="submit">
                                Continue
                            </Button>
                            <p className="heading-detail">
                                Don’t have an account?  <Link to="/register">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Form>
        </div>

    )
}
ForgetPasswordForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func
};
export default ForgetPasswordForm;