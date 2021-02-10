import { ActionTypes } from './actionTypes'

export const getAssessmentRequest = () => {
    return {
        type: ActionTypes.GET_ASSESSMENT_REQUEST,

    };
};
export const getAssessmentSuccess = (data) => {
    return {
        type: ActionTypes.GET_ASSESSMENT_SUCCESS,
        payload: data,
    };
};
export const getAssessmentFailure = (error) => {
    return {
        type: ActionTypes.GET_ASSESSMENT_FAILURE,
        error: error,
    };
};

export const createAssessmentRequest = () => {
    return {
        type: ActionTypes.CREATE_ASSESSMENT_REQUEST,

    };
};

export const createAssessmentSuccess = (data) => {
    return {
        type: ActionTypes.CREATE_ASSESSMENT_SUCCESS,
        payload: data,
    };
};
export const updateAssessmentSuccess = (data) => {
    return {
        type: ActionTypes.UPDATE_ASSESSMENT_SUCCESS,
        payload: data,
    };
};

export const createAssessmentFailure = (error) => {
    return {
        type: ActionTypes.CREATE_ASSESSMENT_FAILURE,
        payload: error,
    };
};

export const getUnsplashSuccess = (data) => {
    return {
        type:  ActionTypes.GET_UNSPLASH_SUCCESS,
        payload: data
    }
}

export const getUnsplashError = (error) => {
    return {
        type:  ActionTypes.GET_UNSPLASH_ERROR,
        error: error
    }
}

export const getVerifiedDomainRequest = () => {
    return {
        type:  ActionTypes.GET_VERIFIED_DOMAIN_REQUEST,
    }
}

export const getVerifiedDomainSuccess = (data,name) => {
    return {
        type: ActionTypes.GET_VERIFIED_DOMAIN,
        payload: data,
        name: name
    }
}
export const getVerifiedDomainError = (error) => {
    return {
        type:  ActionTypes.GET_VERIFIED_DOMAIN_ERROR,
        error: error
    }
}