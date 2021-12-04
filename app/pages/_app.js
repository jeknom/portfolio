import { Provider } from "next-auth/client";
import dynamic from "next/dynamic"
import '../styles/globals.css';
import '../styles/customNprogress.css';

const TopProgressBar = dynamic(
  () => {
    return import("components/Core/ProgressBar");
  },
  { ssr: false },
);

function App({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <TopProgressBar />
        <div className="root">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}

export default App
