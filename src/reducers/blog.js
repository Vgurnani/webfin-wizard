import { ActionTypes } from '../actions/blog/actionTypes'
const initialState = {
    loading: false,
    isReadyPublish: false,
    connecting: false,
    socialMediaLinks: {},
    draftBlogs: [],
    publishBlogs: [],
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
    case ActionTypes.GET_BLOG_LIST:
        return { ...state, loading: true }
    case ActionTypes.GET_DRAFT_BLOG_LIST_SUCCESS:
        return { ...state, loading: false, draftBlogs: action.payload }
    case ActionTypes.GET_PUBLISH_BLOG_LIST_SUCCESS:
        return { ...state, loading: false, publishBlogs: action.payload }
    case ActionTypes.GET_BLOG_LIST_FAILURE:
        return { ...state, loading: false }
    case ActionTypes.GET_BLOG_REQUEST:
        return { ...state, blog: action.payload }
    case ActionTypes.GET_BLOG_SUCCESS:
        return { ...state, blog: action.payload }
    case ActionTypes.DELETE_BLOG_REQUEST:
        return { ...state, loading: true }
    case ActionTypes.DELETE_BLOG_SUCCESS:
        return { ...state, loading: false  }
    case ActionTypes.DELETE_BLOG_FAILURE:
        return { ...state, loading: false  }
    case ActionTypes.TOTAL_BLOGS_COUNT:
        return { ...state, blogsCount: action.payload }
    case ActionTypes.CLEAR_BLOG_FORM:
        return { ...state, blog: {} }
    default:
        return state;
    }
};