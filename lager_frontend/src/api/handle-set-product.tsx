import React, { useState } from 'react';
import Popup from 'reactjs-popup';

const UpdateProduct = ({item , onSetProduct}) => {
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
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Function til fetch af produkt details
    const fetchProductDetails = async (productId) => {
        
        
        try {
            const response = await fetch(`http://localhost:50050/api/product/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const data = await response.json();
            setProduct({
                type: data.Type || '',
                name: data.Product.Name || '',
                description: data.Product.Description || '',
                price: data.Product.Price || '',
                color: data.Product.Color || '',
                size: data.Product.Size || '',
                material: data.Product.Material || '',
                quantity: data.Product.Quantity || '',
            });
        } catch (err) {
            setError(err.message);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        
        const productId = item.Descriptor.ID; // Hent ID fra item

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
            // Reset form
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
            onSetProduct(); // Opdater listen
        } catch (err) {
            setError(err.message);
        }
    };

    const onSetProductModelButtonClick = () => {
        console.log('Item:', item); // Debugging: se værdien af item for at læse værdier når popup åbner
        if (item && item.Descriptor && item.Descriptor.ID) {
            setIsOpen(true);
            fetchProductDetails(item.Descriptor.ID); // Fetch produkt details når popup åbner
        } else {
            console.error('Product ID is not available');
        }
    };

    return (
        <div>
            <Popup trigger=
                {<button onClick={onSetProductModelButtonClick}>Set Product</button>}
                position="right center"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                contentStyle={{
                    width: '300px',
                    padding: '20px',
                    backgroundColor: '#f1f1f1',
                    textAlign: 'center',
                  }}
                >
            <div className='modal'>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={product.type}
                        placeholder={product.type || 'Enter product type'}
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
                        placeholder={product.name || 'Enter product name'}
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
                        placeholder={product.description || 'Enter product description'}
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
                        placeholder={product.price || 'Enter product price'}
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
                        placeholder={product.color || 'Enter product color'}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Size:</label>
                    <input
                        type="text"
                        name="size"
                        value={product.size}
                        placeholder={product.size || 'Enter product size'}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Material:</label>
                    <input
                        type="text"
                        name="material"
                        value={product.material}
                        placeholder={product.material || 'Enter product material'}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        placeholder={product.quantity || 'Enter product quantity'}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" >Update Product</button>
            </form>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {success && <p style={{ color: 'green' }}>Product updated successfully!</p>}
            </div>
            </Popup>
        </div>
    );
};

export default UpdateProduct;