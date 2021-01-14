import { toast } from 'react-toastify';

import { NOTIFICATION_TYPES } from '../constants/app';

export const notification = (type = NOTIFICATION_TYPES.INFO, message) => {
    toast[type](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

