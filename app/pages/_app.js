import NProgress from "nprogress";
import Router from "next/router";
import '../styles/globals.css';
import '../styles/customNProgress.css';

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function App({ Component, pageProps }) {
  return <Component className='content' {...pageProps} />
}

export default App
