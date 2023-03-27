
import './App.css';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
// import {commerce } from './lib/commerce';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        //console.log(json);
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);
  return (
    <div>
      <Navbar/>
      <Products products={products}/>
    </div>
  );
}

export default App;
