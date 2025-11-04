import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css'; // or your global css
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;