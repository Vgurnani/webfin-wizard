import { ActionTypes } from '../actions/blog/actionTypes'
const initialState = {
    loading: false,
    isReadyPublish: false,
    blogs: null,
    blog: null
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.BLOG_CREATE:
        return { ...state, loading: true ,isReadyPublish: false };
    case ActionTypes.BLOG_CREATE_SUCCESS:
        return { ...state,loading: false, isReadyPublish: true };
    case ActionTypes.BLOG_CREATE_FAILURE:
        return { ...state, loading: false, isReadyPublish: false };
    case ActionTypes.PUBLISH_REQUEST:
        return { ...state, loading: true, isReadyPublish: false }
    case ActionTypes.PUBLISH_SUCCESS:
        return { ...state, loading: false, isReadyPublish: false }
    case ActionTypes.PUBLISH_FAILURE:
        return { ...state, loading: false, isReadyPublish: true }
    case ActionTypes.GET_BLOG_LIST:
        return { ...state, loading: true }
    case ActionTypes.GET_BLOG_LIST_SUCCESS:
        return { ...state, loading: false, blogs: action.payload }
    case ActionTypes.GET_BLOG_LIST_FAILURE:
        return { ...state, loading: false }
    case ActionTypes.SET_EDIT_BLOG:
        return { ...state, blog: action.payload }
    default:
        return state;
    }
};