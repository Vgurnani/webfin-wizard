import Layout from '../components/shared/Layout';
import { Provider } from 'react-redux';
import { withRouter } from 'next/router'
import { ToastContainer } from 'react-toastify';
import configureStore from '../store';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../components/all.sass'

const store = configureStore();
// Store Strapi Global object in context

const MyApp = ({ Component, pageProps, router }) => {
    return (
        <Provider store={store}>
            <Layout className="main-layout" pathname={ router.pathname } >
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
                <Component />
            </Layout>
        </Provider>
  );
};


export default withRouter(MyApp);