import React from 'react';
import Router from 'next/router';
import ServerCookie from "next-cookies";

export default WrappedComponent => {
  const hocComponent = ({ ...props }) => (<WrappedComponent {...props} />)
  
  hocComponent.getInitialProps = async (context) => {
    const userAuth = ServerCookie(context)['user'];
    if (!userAuth) {
        if (context.res) {
            context.res?.writeHead(302, {
            Location: '/login',
            });
            context.res?.end();
        } else {
            Router.replace('/login');
        }
    }else if(!userAuth.enabled){
      if (context.res) {
        context.res?.writeHead(302, {
        Location: '/confirm-account',
        });
        context.res?.end();
      } else {
          Router.replace('/confirm-account');
      }
    } 
    else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
      return { ...wrappedProps, userAuth };
    }
    return userAuth
  };
  return hocComponent;
};
