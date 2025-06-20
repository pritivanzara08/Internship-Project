import type { AppProps } from 'next/app';
// Update the import path to match the actual file name, e.g. 'Header' -> 'Headers' if the file is 'Headers.tsx'
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import '../styles/globals.css'; // or your global css

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;