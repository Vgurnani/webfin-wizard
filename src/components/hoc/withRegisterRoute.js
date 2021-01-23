import React,{useEffect} from 'react';
// import Router from 'next/router';
// import { useHistory } from "react-router-dom";
// import ServerCookie from "next-cookies";
import { NOTIFICATION_TYPES } from '../../constants/app';
import { notification } from '../../services/notification';
export default WrappedComponent => {
  // const history = useHistory();
    useEffect(()=>{
      const assessment = localStorage.assessmentForm && JSON.parse(localStorage.assessmentForm);
      if(assessment?.nicheId && assessment?.colourId && assessment?.websiteName){

      }else{
        notification(NOTIFICATION_TYPES.ERROR, 'Please fill first assessment')
        window.location.href = '/assessment';
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const hocComponent = ({ ...props }) => {
    return(<WrappedComponent {...props} />)
  }

  hocComponent.getInitialProps = async (context,props) => {
    const userAuth = null;
    // const userAuth = ServerCookie(context)['user'];
    if (userAuth) {
        if (context.res) {
            userAuth.enabled ? context.res?.writeHead(302, {Location: '/dashboard'}) : context.res?.writeHead(302, {Location: '/confirm-account'})
            context.res?.end();
        } else {
          window.location.href = userAuth.enabled ? '/dashboard' : '/confirm-account';
        }
      }
      else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
      return { ...wrappedProps, userAuth };
      }
      return { userAuth }
  };
  return hocComponent;
};

// export default WrappedComponent;