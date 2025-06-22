import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ProductStyles.css'; // Adjust the path as necessary

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, imageUrl }) => {
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-image" />
            <h3>{name}</h3>
            <p className="price">${price}</p>
            <button>View</button>
        </div>
    );
};

export default ProductCard;