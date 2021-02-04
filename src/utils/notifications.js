import {
    setNotification
} from '../actions';
import { NOTIFICATION_SEVERITY } from '../constants/app';
const { ERROR, SUCCESS } = NOTIFICATION_SEVERITY;

export const handleError = (message) => {
    return setNotification({
        severity: ERROR,
        message: message
    })
}

export const handleSuccess = (message) => {
    return setNotification({
        severity: SUCCESS,
        message: message
    })
}

export const pushNotification = null;