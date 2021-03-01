import axiosInstance from 'services/api';

const asyncValidate = async (value /*, dispatch */) => {
    if(value){
        try{
            await axiosInstance.get(`/user/username?userName=${ value }`)
            return true
        }catch(error){
            return false
        }
    }
}
export default asyncValidate;