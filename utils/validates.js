
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
    const letter = /^[a-zA-Z][a-zA-Z\s]*$/;
    if(!values.firstName){
        errors.firstName = 'Please enter first name';
    }
    if(!values.lastName){
        errors.lastName = 'Please enter last name';
    }
    if(values.firstName && !values.firstName.match(letter)){
        errors.firstName = 'should be character only';
    }
    if(values.lastName && !values.lastName.match(letter)){
        errors.lastName = 'should be character only';
    }
    if (!values.email) {
        errors.email = 'Please enter email';
    }
    if(values.email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))){
        errors.email = 'Please enter valid email';
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

export const assessmentFormValidate = values => {
    const errors = {};
    if (!values.websiteName) {
        errors.websiteName = 'required';
    }
    if (!values.nicheId) {
        errors.nicheId = 'required';
    }
    if (!values.colourId) {
        errors.colourId = 'required';
    }
    return errors;
}