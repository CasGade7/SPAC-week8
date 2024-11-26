import React, { useState } from 'react';

const UpdateProductQuantity = () => {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleIdChange = (e) => {
        setProductId(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleUpdateQuantity = async () => {
        if (!productId || quantity === '') return; // Ingen ID eller mængde indtastet

        try {
            const response = await fetch(`http://localhost:50050/api/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Quantity: parseInt(quantity), // Send den nye mængde
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update quantity');
            }

            setSuccess(true);
            setProductId(''); // Nulstil inputfeltet
            setQuantity(''); // Nulstil mængdeinputfeltet
            setError(null); // Nulstil fejl
        } catch (err) {
            setError(err.message);
            setSuccess(false);
        }
    };

    return (
        <div>
            <h1>Update Product Quantity</h1>
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
                <label>New Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    required
                />
            </div>
            <button type="button" onClick={handleUpdateQuantity}>Update Quantity</button>
            {success && <p>Product quantity updated successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UpdateProductQuantity;