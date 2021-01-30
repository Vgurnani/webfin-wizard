export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
}

export const MESSAGE = {
    REGISTRATION_SUCCESS: 'Registration Successfully',
    LOGIN_SUCCESS: 'Login Successfully',
    BLOG_SUCCESS: 'Blog Created!',
    BLOG_FAILD: 'Something went wrong',
    EMAIL_ACTIVATE: 'Email is activate Successfully',
    CODE_SEND: 'Code Send Successfully',
    CREATE_ASSESSMENT: 'Create Assessment Successfully',
    SOMETHING_WRONG: 'Something went wrong',
    REQUIRED: 'required',
    PASSWORD_MATCH: 'password should be match',
    SHOULD_CHAR: 'should be character only',
    INVALID_EMAIL: 'Invalid email',
    VALID_ENTER: (value) => `Please enter ${value}`,
    VALID_SELECT: (value) => `Please select ${value}`,
    SHOULD_BE_LENGTH: (value, number) => `${value} should be ${number} character`
}
