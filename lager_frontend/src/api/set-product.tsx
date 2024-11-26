import React, { useState } from 'react';

const UpdateProduct = () => {
    const [productId, setProductId] = useState('');
    const [product, setProduct] = useState({
        type: '',
        name: '',
        description: '',
        price: '',
        color: '',
        size: '',
        material: '',
        quantity: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleIdChange = (e) => {
        setProductId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`http://localhost:50050/api/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Type: product.type,
                    Product: {
                        Name: product.name,
                        Description: product.description,
                        Price: parseFloat(product.price),
                        Color: product.color,
                        Size: product.size,
                        Material: product.material,
                        Quantity: parseInt(product.quantity),
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update product');
            }

            setSuccess(true);
            // Reset the form if needed
            setProductId('');
            setProduct({
                type: '',
                name: '',
                description: '',
                price: '',
                color: '',
                size: '',
                material: '',
                quantity: '',
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product ID:</label>
                    <input
                        type="number"
                        value={productId}
                        onChange={handleIdChange}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={product.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                    />
                </div>
                <div>
                    <label>Color:</label>
                    <input
                        type="text"
                        name="color"
                        value={product.color}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Size:</label>
                    <input
                        type="text"
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Material:</label>
                    <input
                        type="text"
                        name="material"
                        value={product.material}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Product</button>
            </form>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {success && <p style={{ color: 'green' }}>Product updated successfully!</p>}
        </div>
    );
};

export default UpdateProduct;