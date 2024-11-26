import React, { useEffect, useState } from 'react';

const ProductsList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllProducts = async (filter = null) => {
        try {
            const response = await fetch(`http://localhost:50050/api/products?type_filter=${filter}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            setItems(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts('Clothing'); // Hent produkter uden filter
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <ul>
            {items.length === 0 ? (
                <li>No products available.</li>
            ) : (
                items.map((item) => {
                    console.log(item); // Log hvert item
                    return (
                        <li key={item.Descriptor.ID}>
                            <h3>{item.Product.Name}</h3>
                            <p>Produkt ID: {item.Descriptor.ID}</p>
                            <p>Description: {item.Product.Description}</p>
                            <p>Price: ${item.Product.Price}</p>
                            <p>Color: {item.Product.Color}</p>
                            <p>Size: {item.Product.Size}</p>
                            <p>Material: {item.Product.Material}</p>
                            <p>Quantity: {item.Product.Quantity}</p>
                        </li>
                    );
                })
            )}
        </ul>
    );
};

export default ProductsList;