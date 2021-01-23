import React from 'react';
// import Router from 'next/router';
// import ServerCookie from "next-cookies";

const WrappedComponent = () => {
  const hocComponent = ({ ...props }) => (<WrappedComponent {...props} />)

  hocComponent.getInitialProps = async (context) => {
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

export default WrappedComponent;