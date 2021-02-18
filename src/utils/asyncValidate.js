import axiosInstance from 'services/api';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = async (values /*, dispatch */) => {
    const result  = await axiosInstance.get(`/user/username?userName=${ values.userName }`)
    return sleep(4).then(() => {
        if(result.data){
            throw { userName: 'That username is taken' }
        }
    })
}
export default asyncValidate;