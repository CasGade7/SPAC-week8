import './App.css'
import Header from './Header.tsx'
import ProductsList from './api/get-products.tsx'
import ProductDetails from './api/get-product.tsx'
import UpdateProduct from './api/set-product.tsx'
import UpdateProductQuantity from './api/add-quantity.tsx'

function App() {
  return (
    <>
      <Header />
      <h2>Products</h2>
      <ProductsList />
      <ProductDetails />
      <UpdateProduct />
      <UpdateProductQuantity />
    </>
  )
}

export default App
