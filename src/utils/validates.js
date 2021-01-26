import { MESSAGE } from '../constants/app'

export const loginValidate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = MESSAGE.VALID_ENTER('email');
    }
    if (!values.password) {
        errors.password = MESSAGE.VALID_ENTER('password');
    }
    return errors;
}

export const registerValidate = values => {
    const errors = {};
    const letter = /^[a-zA-Z][a-zA-Z\s]*$/;
    if(!values.firstName){
        errors.firstName = MESSAGE.VALID_ENTER('first name');
    }
    if(!values.lastName){
        errors.lastName = MESSAGE.VALID_ENTER('last name');
    }
    if(values.firstName && !values.firstName.match(letter)){
        errors.firstName = MESSAGE.SHOULD_CHAR;
    }
    if(values.lastName && !values.lastName.match(letter)){
        errors.lastName = MESSAGE.SHOULD_CHAR;
    }
    if (!values.email) {
        errors.email = MESSAGE.VALID_ENTER('email');
    }
    if(values.email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))){
        errors.email = MESSAGE.INVALID_EMAIL;
    }
    
    if (!values.password) {
        errors.password = MESSAGE.VALID_ENTER('password');
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = MESSAGE.VALID_ENTER('confirm password');
    }

    if( values.password !== values.confirmPassword){
        errors.confirmPassword = MESSAGE.PASSWORD_MATCH;
    }
    return errors;
}

export const forgetPasswordValidate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = MESSAGE.VALID_ENTER('email');
    }
    if (!values.code) {
        errors.code = MESSAGE.VALID_ENTER('OTP');
    }
    if (!values.password) {
        errors.password = MESSAGE.VALID_ENTER('password');
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = MESSAGE.VALID_ENTER('confirm password');
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = MESSAGE.PASSWORD_MATCH
    }
    return errors;
}

export const assessmentFormValidate = values => {
    const errors = {};
    if (!values.websiteName) {
        errors.websiteName = MESSAGE.REQUIRED;
    }
    if (!values.nicheId) {
        errors.nicheId = MESSAGE.REQUIRED;
    }
    if (!values.colourId) {
        errors.colourId = MESSAGE.REQUIRED;
    }
    if(!values.domain){
        errors.domain = MESSAGE.VALID_SELECT('domain');
    }
    return errors;
}