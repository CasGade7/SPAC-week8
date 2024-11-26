import React, { useEffect, useState } from 'react';

function ItemsList() {
    const [items, setItems] = useState([]);
 
    useEffect(() => {
        fetch('http://localhost:50050/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Se hvad der returneres fra API'en
                setItems(data);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);


    return (
        <ul>
            {items.length === 0 ? (
            <li>No products available.</li>
        ) : (
            items.map((product) => (
                <li key={product.ID}>
                    <h3>{product.Name}</h3>
                
                
                </li>
            ))
        )}
        </ul>
    );
}
export default ItemsList;