import React, { Suspense } from 'react'
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';
import browserHistory from './utils/history';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import NotificationService from './service/notification-service';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    <Router history={browserHistory}>
      <Suspense fallback={'Loading...'}>
        <App />
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
