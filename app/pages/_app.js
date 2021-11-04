import { Provider } from "next-auth/client";
import NProgress from "nprogress";
import Router from "next/router";
import '../styles/globals.css';
import '../styles/customNprogress.css';

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component className='content' {...pageProps} />
    </Provider>
  );
}

export default App
