import { LOGIN_USER } from '../actions/actionTypes'
const initialState = {
    user: "hello"
}
export default (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER:
        return { ...state, user: 'hello' };
      default:
        return state;
    }
  };