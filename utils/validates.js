
export const loginValidate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter email';
    }
    if (!values.password) {
        errors.password = 'Please enter password';
    }
    return errors;
}

export const registerValidate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter email';
    }
    if (!values.password) {
        errors.password = 'Please enter password';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Please enter confirm password';
    }

    if( values.password !== values.confirmPassword){
        errors.confirmPassword = 'Password should be match';
    }
    return errors;
}

export const forgetPasswordValidate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter email';
    }
    if (!values.otp) {
        errors.otp = 'Please enter otp';
    }
    if (!values.password) {
        errors.password = 'Please enter password';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Please enter confirm password';
    }
    return errors;
}