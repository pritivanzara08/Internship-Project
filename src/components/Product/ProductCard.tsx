import React from 'react';

interface ProductCardProps {
    image: string;
    title: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price }) => {
    return (
        <div className="product-card">
            <img src={image} alt={title} className="product-image" />
            <h3 className="product-title">{title}</h3>
            <p className="product-price">${price.toFixed(2)}</p>
        </div>
    );
};

export default ProductCard;