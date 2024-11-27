import React, { useState } from 'react';

const DeleteProduct = ({ item, onDelete }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleDelete = async (productId) => {
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
            setError(null); // Nulstil fejl
            onDelete(); // Kald onDelete for at opdatere listen
        } catch (err) {
            setError(err.message);
            setSuccess(false);
        }
    };

    return (
        <div>
            <button type="button" onClick={() => handleDelete(item.Descriptor.ID)}>Delete Product</button>
            {success && <p>Product deleted successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DeleteProduct;