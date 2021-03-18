import twitter  from 'images/twitter-color.png'
import facebook  from 'images/facebook-color.png'
import youtube  from 'images/youtube-color.png'
import instrgram  from 'images/instagram-color.png'
import linkedin  from 'images/linkedin-color.png'
import blogUser from 'images/blog-user.png'
import sampleBlog from 'images/sample-blog.png'
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
}

export const MESSAGE = {
    REGISTRATION_SUCCESS: 'Registration Successfully',
    USER_PROFILE_UPDATE_SUCCESS: 'User profile update Successfully',
    LOGIN_SUCCESS: 'Login Successfully',
    BLOG_DELETED: 'Blog Deleted!',
    BLOG_UPDATE: 'Blog Updated!',
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
    INVALID_MOBILE: 'Invalid Mobile',
    PUBLISH_SUCCESS: 'Published!',
    VALID_ENTER: (value) => `Please enter ${ value }`,
    VALID_SELECT: (value) => `Please select ${ value }`,
    SHOULD_BE_LENGTH: (value, number) => `${ value } should be ${ number } character`
}

export const SOCIAL_MEDIA = [
    { name: 'Facebook',value: 'facebook', imgUrl: `<img src=${ facebook } />` },
    { name: 'Linked in',value: 'linkedin', imgUrl: `<img src=${ linkedin } />` },
    { name: 'Instagram',value: 'instagram', imgUrl: `<img src=${ instrgram } />` },
    { name: 'Twitter',value: 'twitter', imgUrl: `<img src=${ twitter } />` },
    { name: 'Youtube',value: 'youtube', imgUrl: `<img src=${ youtube } />` },
    { name: 'Label',value: 'label', imgUrl: `<img src=${ facebook } />` }
]

export const BLOG_STATUS = {
    DRAFT: 'DRAFT',
    DELETED: 'DELETED',
    PUBLISHED: 'PUBLISHED'
}
export const HEADER = {
    HEADING: 'Simple Recipes for Healthier Families',
    SUB_HEADING: 'Welcome to the most reliable source for healthy recipes!'
}

export const SAMPLE_BLOG = {
    HEADING: 'Simple Recipes for Healthier Families',
    SUB_HEADING: 'Welcome to the most reliable source for healthy recipes!',
    BLOG_NAME: 'The wonderful world of cooking in the world 2021',
    USER_NAME: 'Json Miller',
    DATE: 'Jun 8, 2021',
    BLOG_IMAGE: sampleBlog,
    USER_IMAGE: blogUser
}