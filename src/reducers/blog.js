import { ActionTypes } from '../actions/blog/actionTypes'
const initialState = {
    loading: false,
    isReadyPublish: false,
    connecting: false,
    socialMediaLinks: {}
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
    case ActionTypes.SOCIAL_MEDIA_REQUEST:
        return { ...state, loading: false, connecting: true }
    case ActionTypes.SOCIAL_MEDIA_SUCCESS:
        return { ...state, loading: false, connecting: false }
    case ActionTypes.SOCIAL_MEDIA_FAILURE:
        return { ...state, loading: false, connecting: false }
    case ActionTypes.GET_SOCIAL_MEDIA_REQUEST:
        return { ...state, loading: true }
    case ActionTypes.GET_SOCIAL_MEDIA_SUCCESS:
        return { ...state, loading: false, socialMediaLinks: action.payload?.data[ 0 ] && action.payload?.data[ 0 ].content || { } }
    case ActionTypes.GET_SOCIAL_MEDIA_FAILURE:
        return { ...state, loading: false }
    default:
        return state;
    }
};