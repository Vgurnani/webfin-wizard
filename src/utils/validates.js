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
    if (values.password && values.password.length < 8 ) {
        errors.password = MESSAGE.SHOULD_BE_LENGTH('password',8);
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = MESSAGE.VALID_ENTER('confirm password');
    }
    if (values.confirmPassword && values.confirmPassword.length < 8 ) {
        errors.confirmPassword = MESSAGE.SHOULD_BE_LENGTH('confirm password',8);
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
    if (values.password && values.password.length < 8 ) {
        errors.password = MESSAGE.SHOULD_BE_LENGTH('password',8);
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = MESSAGE.VALID_ENTER('confirm password');
    }
    if (values.confirmPassword && values.confirmPassword.length < 8 ) {
        errors.confirmPassword = MESSAGE.SHOULD_BE_LENGTH('confirm password',8);
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = MESSAGE.PASSWORD_MATCH
    }
    return errors;
}

export const assessmentFormValidate = values => {
    const errors = {};

    const letter = /[^a-zA-Z0-9 ]/gi;
    if (!values.websiteName) {
        errors.websiteName = MESSAGE.REQUIRED;
    } else if(values.websiteName && (values.websiteName.match(letter))) {
        errors.websiteName = MESSAGE.REQUIRED;
    }
    if (!values.nicheId) {
        errors.nicheId = MESSAGE.REQUIRED;
    }
    if (!values.colors) {
        errors.colors = MESSAGE.REQUIRED;
    }
    if(!values.domain || values.domain === 'null'){
        errors.domain = MESSAGE.VALID_SELECT('domain');
    }
    return errors;
}

export const blogValidate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = MESSAGE.VALID_ENTER('title');
    }
    if (!values.blogUrl) {
        errors.blogUrl = 'Please add image';
    }
    if (!values.description) {
        errors.description = 'Please enter description';
    }

    return errors;
}

export const updateUserProfileValidate = values => {
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
    // if(values.phone && (values.phone.length < 10 || values.phone.length > 10) ){
    //     errors.phone = MESSAGE.INVALID_MOBILE;
    // }
    return errors;
}