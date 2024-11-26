import React, { useState } from 'react';

const DeleteProduct = () => {
    const [productId, setProductId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleIdChange = (e) => {
        setProductId(e.target.value);
    };

    const handleDelete = async () => {
        if (!productId) return; // Ingen ID indtastet

        try {
            const response = await fetch(`http://localhost:50050/api/product/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete product');
            }

            setSuccess(true);
            setProductId(''); // Nulstil inputfeltet
            setError(null); // Nulstil fejl
        } catch (err) {
            setError(err.message);
            setSuccess(false);
        }
    };

    return (
        <div>
            <h1>Delete Product</h1>
            <div>
                <label>Product ID:</label>
                <input
                    type="number"
                    value={productId}
                    onChange={handleIdChange}
                    required
                />
                <button type="button" onClick={handleDelete}>Delete Product</button>
            </div>
            {success && <p>Product deleted successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DeleteProduct;