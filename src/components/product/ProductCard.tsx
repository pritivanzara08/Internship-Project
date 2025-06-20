import React from 'react';

interface ProductCardProps {
    image?: string;
    title: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price }) => {
    return (
        <div className="product-card">
            {image ? (
            <img src={image} alt={title} className="product-image" />
            ) : (
            <div className="product-image-placeholder">No Image Available</div>
            )}
            <h3 className="product-title">{title}</h3>
            <p className="product-price">${price.toFixed(2)}</p>
        </div>
    );
};

export default ProductCard;