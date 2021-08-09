import '../styles/globals.css'

function App({ Component, pageProps }) {
  return <Component className='content' {...pageProps} />
}

export default App
