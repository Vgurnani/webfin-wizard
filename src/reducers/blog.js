import { ActionTypes } from '../actions/blog/actionTypes'
const initialState = {
    loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.BLOG_CREATE:
        return { ...state, loading: true };
      case ActionTypes.BLOG_CREATE_SUCCESS:
        return { ...state,loading: false };
      case ActionTypes.BLOG_CREATE_FAILURE:
        return { ...state, loading: false };
      default:
        return state;
    }
  };