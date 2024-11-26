import React, { useState } from 'react';

const ProductDetails = () => {
    const [productId, setProductId] = useState('');
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProductById = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:50050/api/product/${productId}`);
            if (!response.ok) {
                throw new Error('Product not found');
            }
            const data = await response.json();
            setProduct(data[0]); // Vi får en liste, så vi tager det første element
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Get Product Details</h1>
            <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter Product ID"
            />
            <button onClick={getProductById}>Get Product</button>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {product && (
                <div className='ProductDetail'>
                    <h2>{product.Product.Name}</h2>
                    <p>Description: {product.Product.Description}</p>
                    <p>Price: ${product.Product.Price}</p>
                    <p>Color: {product.Product.Color}</p>
                    <p>Size: {product.Product.Size}</p>
                    <p>Material: {product.Product.Material}</p>
                    <p>Quantity: {product.Product.Quantity}</p>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;