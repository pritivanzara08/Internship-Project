import { useRouter } from 'next/router';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // fetch and render product details using id
  return <div>Product Detail for {id}</div>;
};

export default ProductDetail;