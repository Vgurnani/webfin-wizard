import { toast } from 'react-toastify';

<<<<<<< HEAD
import { NOTIFICATION_TYPES } from '../../constants/app';
=======
import { NOTIFICATION_TYPES } from '../constants/app';
>>>>>>> e9298e1... Server side error handling.

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

