import { SessionProvider } from "next-auth/react"
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
      <SessionProvider session={pageProps.session}>
        <TopProgressBar />
        <div className="root">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
}

export default App
