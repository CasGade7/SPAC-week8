import './App.css'
import Header from './Header.tsx'
import ItemsList from './api/get-products.tsx'

function App() {
  return (
    <>
      <Header />
      <h2>Products</h2>
      <ItemsList />
    </>
  )
}

export default App
