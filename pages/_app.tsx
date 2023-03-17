import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from '../redux/store';
import { ReactReduxFirebaseContextProvider } from '../context/ReactReduxFirebaseContextProvider';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseContextProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </ReactReduxFirebaseContextProvider>
    </Provider>
  );
}
