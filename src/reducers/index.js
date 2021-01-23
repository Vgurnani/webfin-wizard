import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import user from './user';
import assessment from './assessment';


export default combineReducers({
    user: user,
    assessment: assessment,
    form: formReducer
 });