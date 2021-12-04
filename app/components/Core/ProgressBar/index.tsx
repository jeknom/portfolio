import NProgress from "nprogress";
import Router from "next/router";
import { useEffect } from "react";

const ProgressBar = () => {
  useEffect(() => {
    Router.events.on("routeChangeStart", NProgress.start);
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
  }, []);

  return <></>;
};

export default ProgressBar;
