// ProductCard.js
import React, { useEffect, useState } from 'react';
import './ProductList.css'
import AddToCartButton from './AddToCartButton';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8082/api/products');
                const data = await response.json();
                console.log(data.docs)

                if (data.docs && Array.isArray(data.docs)) {
                    setProducts(data.docs);
                    
                } else {
                    throw new Error('Data is not an array');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="product-container">
            {products.map(product => (
                <div key={product._id} className="product-card">
                    
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Category: {product.category}</p>
                    <div>

                    <AddToCartButton productId={product._id} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;

