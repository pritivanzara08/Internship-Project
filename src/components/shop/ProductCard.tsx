import Link from 'next/link';
import React from 'react';
import '../../styles/ProductStyles.css';
import { Product } from '../../types/admin';

interface ProductCardProps extends Product {
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    imageUrl,
    description,
}) => {
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-image" />
            <div className="product-card-title">{name}</div>
            <div className="product-card-desc">{description}</div>
            {/* <div className="product-card-price">₹{price}</div> */}
            <div className="product-actions">
                <Link href={`/product/${id}`}>
                    <button className="view-btn">View</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;