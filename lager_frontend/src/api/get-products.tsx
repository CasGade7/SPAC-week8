import React, { useEffect, useState } from 'react';
import DeleteButton from './handle-delete';
import AddButton from './add-product-button';
import SetButton from './handle-set-product';

const ProductsList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState(''); // State til at holde filteret
    const [searchTerm, setSearchTerm] = useState(''); // State til søgeteksten

    const getAllProducts = async (filter = null, searchTerm = '') => {
        try {
            const response = await fetch(`http://localhost:50050/api/products?type_filter=${filter}&search=${searchTerm}`);
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
        // Debounce søgning for at undgå for mange API-anmodninger
        const handler = setTimeout(() => {
            getAllProducts(filter, searchTerm); // Hent produkter med valgt filter og søgetekst
        }, 300); // 300 ms debounce tid

        return () => {
            clearTimeout(handler); // Ryd op i timeouten
        };
    }, [filter, searchTerm]); // Kald funktionen hver gang filteret eller søgeteksten ændres

    const handleFilterChange = (event) => {
        setFilter(event.target.value); // Opdater filteret baseret på dropdown-valget
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Opdater søgeteksten
    };

    const handleRefresh = () => {
        getAllProducts(filter); // Opdater listen ved at kalde getAllProducts igen
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <label htmlFor="productFilter">Vælg produkt type:</label>
            <select id="productFilter" value={filter} onChange={handleFilterChange}>
                <option value="">Vælg produkt type</option>
                <option value="Clothing">Clothing</option>
                <option value="Book">Book</option>
                {/* Tilføj flere typer efter behov */}
            </select>
            <button onClick={handleRefresh}>Opdater liste</button>

            {/*Inputfelt til søgning*/}
            <label htmlFor="searchInput">Søg efter produkt:</label>
            <input 
                type="text" 
                id="searchInput" 
                value={searchTerm} 
                onChange={handleSearchChange} 
                placeholder="Indtast produktnavn..." 
            />
            <AddButton onAddProduct={handleRefresh} />

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
                                <DeleteButton item={item} onDelete={handleRefresh} />
                                <SetButton item={item} onSetProduct={handleRefresh} />
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
};

export default ProductsList;