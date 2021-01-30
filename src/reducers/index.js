import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import user from './user';
import assessment from './assessment';
import blog from './blog';

export default combineReducers({
    user: user,
    blog: blog,
    assessment: assessment,
    form: formReducer
 });