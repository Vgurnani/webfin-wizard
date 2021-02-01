import { ActionTypes } from '../actions/blog/actionTypes'
const initialState = {
    loading: false,
    isReadyPublish: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.BLOG_CREATE:
        return { ...state, loading: true ,isReadyPublish: false};
      case ActionTypes.BLOG_CREATE_SUCCESS:
        return { ...state,loading: false, isReadyPublish: true };
      case ActionTypes.BLOG_CREATE_FAILURE:
        return { ...state, loading: false, isReadyPublish: false };
      case ActionTypes.PUBLISH_REQUEST:
        return {...state, loading: true, isReadyPublish: false}
      case ActionTypes.PUBLISH_SUCCESS:
        return {...state, loading: false, isReadyPublish: false}
      case ActionTypes.PUBLISH_FAILURE:
        return {...state, loading: false, isReadyPublish: true}
      default:
        return state;
    }
  };