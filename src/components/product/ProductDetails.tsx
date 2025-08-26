import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../lib/api';
import '@/styles/ProductStyles.css';

type Product = {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
};

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = React.useState<Product | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<String | null>(null);

    React.useEffect(() => {
        const getProductDetails = async () => {
            if (!id) {
                setError('No product ID provided');
                setLoading(false);
                return;
            }
            try {
                const data = await fetchProductDetails(id);
                setProduct(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        getProductDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-details">
            {product && (
                <>
                    <h1>{product.title}</h1>
                    <img src={product.imageUrl} alt={product.title} />
                    <p>{product.description}</p>
                    <h2 className="price">₹{product.price}</h2>
                    <button>Add to Cart</button>
                </>
            )}
        </div>
    );
};

export default ProductDetail;