import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import user from './user';
import assessment from './assessment';
import blog from './blog';
import theme from './theme';

export default combineReducers({
    user: user,
    blog: blog,
    theme: theme,
    assessment: assessment,
    form: formReducer
});