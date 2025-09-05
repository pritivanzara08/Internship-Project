import type { AppProps } from 'next/app';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import '@/styles/globals.css'; // or your global css
import { AuthProvider } from '@/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
      <Header />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
      <Footer />
      </AuthProvider>
    </>
  );
}

export default MyApp;