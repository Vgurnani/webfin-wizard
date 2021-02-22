import axiosInstance from 'services/api';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = async (values /*, dispatch */) => {
    try{
        await axiosInstance.get(`/user/username?userName=${ values.userName }`)
    }catch(error){
        console.log(error)
        return sleep(4).then(() => {
            throw { userName: 'That username is taken' }
        })
    }
}
export default asyncValidate;