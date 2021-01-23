import React from 'react';
// import Router from 'next/router';
import { useHistory } from "react-router-dom";
// import ServerCookie from "next-cookies";

const WrappedComponent = () => {
  const hocComponent = ({ ...props }) => (<WrappedComponent {...props} />)
  const history = useHistory();
  hocComponent.getInitialProps = async (context) => {
    const userAuth = null;
    // const userAuth = ServerCookie(context)['user'];
    if (!userAuth) {
        if (context.res) {
            context.res?.writeHead(302, {
            Location: '/login',
            });
            context.res?.end();
        } else {
          window.location.href = '/login';
        }
    }else if(!userAuth.enabled){
      if (context.res) {
        context.res?.writeHead(302, {
        Location: '/confirm-account',
        });
        context.res?.end();
      } else {
        window.location.href = '/confirm-account';
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