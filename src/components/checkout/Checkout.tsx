import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PaymentForm from './PaymentForm';

const Checkout = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login?redirect=/checkout');
    }
  }, []);

  return (
    <div>
      <h2>Checkout</h2>
      <PaymentForm />
    </div>
  );
};

export default Checkout;
