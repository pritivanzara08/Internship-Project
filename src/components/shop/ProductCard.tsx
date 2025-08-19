import React from 'react';
import Link from 'next/link';
import { Product } from '../../types';
import '../../styles/ProductStyles.css';

interface ProductCardProps extends Product {
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, imageUrl, title, description, categoryId,onAddToCart }) => {
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-image" />
            <h3>{name}</h3>
            {/* <p className="price">₹ {price}</p> */}
            <div className="product-actions">
                <Link href={`/product/${id}`}>
                <button className="view-btn">View</button>
                </Link>
                {/* <button className="add-btn" onClick={() => onAddToCart(product)} >
                Add to Cart
                </button> */}
            </div>
        </div>
    );
};

export default ProductCard;