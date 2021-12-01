import { Provider } from "next-auth/client";
import NProgress from "nprogress";
import Router from "next/router";
import '../styles/globals.css';
import '../styles/customNprogress.css';
import { Root } from "components/Core";

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Root alignItems="center" justifyContent="center" gap={12}>
        <Component className='content' {...pageProps} />
      </Root>
    </Provider>
  );
}

export default App
