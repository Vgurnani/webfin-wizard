import React from 'react';
// import Router from 'next/router';
// import ServerCookie from "next-cookies";
import { useHistory } from "react-router-dom";

const WrappedComponent = () => {
  const hocComponent = ({ ...props }) => (<WrappedComponent {...props} />)
  const history = useHistory();
  hocComponent.getInitialProps = async (context) => {
    // const userAuth = ServerCookie(context)['user'];
    const userAuth = null;
    if(!userAuth){
      if (context.res) {
          context.res?.writeHead(302, {Location: '/login'});
          context.res?.end();
      } else {
        window.location.href = '/login';
      }
    }
    else if (userAuth && userAuth.enabled) {
        if (context.res) {
            context.res?.writeHead(302, {Location: '/dashboard'});
            context.res?.end();
        } else {
          window.location.href = '/dashboard';
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

export default WrappedComponent;