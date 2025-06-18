const ProductCard = ({ product }: { product: { id: number; name: string; price: string; image: string } }) => {
    return (
      <div className="border rounded-lg p-4 shadow-md">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
        <p className="text-lg text-gray-700">{product.price}</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    );
  };
  
  export default ProductCard;