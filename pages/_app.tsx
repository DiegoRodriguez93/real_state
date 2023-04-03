import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from '../redux/store';
import { ReactReduxFirebaseContextProvider } from '../context/ReactReduxFirebaseContextProvider';
import LogoSpinner from '../components/LogoSpinner';
import useRedirectAnimation from '../hooks/useRedirectAnimation';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const loading = useRedirectAnimation();

  return (
    <Provider store={store}>
      <ReactReduxFirebaseContextProvider>
        <ToastContainer />
        {loading && <LogoSpinner />}
        <Component {...pageProps} />
      </ReactReduxFirebaseContextProvider>
    </Provider>
  );
}
