import { ActionTypes } from './actionTypes';

export const blogCreateRequest = (data) => {
    return {
        type: ActionTypes.BLOG_CREATE,
        payload: data
    };
};

export const blogCreateSuccess = (data) => {
    return {
        type: ActionTypes.BLOG_CREATE_SUCCESS,
        payload: data
    };
};

export const blogCreateFailed = (error) => {
    return {
        type: ActionTypes.BLOG_CREATE_FAILURE,
        error: error
    };
};

export const publishRequest = () => {
    return {
        type: ActionTypes.PUBLISH_REQUEST,
    };
};

export const publishSuccess = (data) => {
    return {
        type: ActionTypes.PUBLISH_SUCCESS,
        payload: data
    };
};

export const publishFailed = (error) => {
    return {
        type: ActionTypes.PUBLISH_FAILURE,
        error: error
    };
};

export const socialMediaRequest = () => {
    return {
        type: ActionTypes.SOCIAL_MEDIA_REQUEST,
    };
};

export const socialMediaSuccess = (data) => {
    return {
        type: ActionTypes.SOCIAL_MEDIA_SUCCESS,
        payload: data
    };
};

export const socialMediaFailed = (error) => {
    return {
        type: ActionTypes.SOCIAL_MEDIA_FAILURE,
        error: error
    };
};

export const getSocialMediaRequest = () => {
    return {
        type: ActionTypes.GET_SOCIAL_MEDIA_REQUEST,
    };
};

export const getSocialMediaSuccess = (data) => {
    return {
        type: ActionTypes.GET_SOCIAL_MEDIA_SUCCESS,
        payload: data
    };
};

export const getSocialMediaFailed = (error) => {
    return {
        type: ActionTypes.GET_SOCIAL_MEDIA_FAILURE,
        error: error
    };
};
export const getBlogsRequest = () => {
    return {
        type: ActionTypes.GET_BLOG_LIST
    }
}

export const getDraftBlogListSuccess = (data) => {
    return {
        type: ActionTypes.GET_DRAFT_BLOG_LIST_SUCCESS,
        payload: data
    }
}
export const getPublishBlogListSuccess = (data) => {
    return {
        type: ActionTypes.GET_PUBLISH_BLOG_LIST_SUCCESS,
        payload: data
    }
}

export const getBlogListFailed = (error) => {
    return {
        type: ActionTypes.GET_BLOG_LIST_FAILURE,
        error: error
    }
}

export const deleteBlogRequest = () => {
    return {
        type: ActionTypes.DELETE_BLOG_REQUEST
    }
}

export const deleteBlogSuccess = (data) => {
    return {
        type: ActionTypes.DELETE_BLOG_SUCCESS,
        payload: data
    }
}
export const deleteBlogFailed = () => {
    return {
        type: ActionTypes.DELETE_BLOG_FAILURE
    }
}

export const getBlogRequest = () => {
    return {
        type: ActionTypes.GET_BLOG_REQUEST
    }
}
export const getBlogSuccess = (data) => {
    return {
        type: ActionTypes.GET_BLOG_SUCCESS,
        payload: data
    }
}