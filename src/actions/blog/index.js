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

export const getBlogsRequest = () => {
    return {
        type: ActionTypes.GET_BLOG_LIST
    }
}

export const getBlogListSuccess = (data) => {
    return {
        type: ActionTypes.GET_BLOG_LIST_SUCCESS,
        payload: data
    }
}

export const getBlogListFailed = (error) => {
    return {
        type: ActionTypes.GET_BLOG_LIST_FAILURE,
        error: error
    }
}

export const setEditBlog = (blog) => {
    return {
        type: ActionTypes.SET_EDIT_BLOG,
        payload: blog
    }
}

export const deleteBlogRequest = () => {
    return {
        type: ActionTypes.DELETE_BLOG
    }
}

export const deleteBlogSuccess = (data) => {
    return {
        type: ActionTypes.DELETE_BLOG_SUCCESS,
        payload: data
    }
}

export const deleteBlogFailed = (error) => {
    return {
        type: ActionTypes.DELETE_BLOG_FAILURE,
        error: error
    }
}

export const editBlogRequest = () => {
    return {
        type: ActionTypes.EDIT_BLOG
    }
}

export const editBlogSuccess = (data) => {
    return {
        type: ActionTypes.EDIT_BLOG_SUCCESS,
        payload: data
    }
}

export const editBlogFailed = (error) => {
    return {
        type: ActionTypes.EDIT_BLOG_FAILURE,
        error: error
    }
}

export const cloneBlogRequest = () => {
    return {
        type: ActionTypes.CLONE_BLOG
    }
}