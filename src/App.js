
import './App.css';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import {commerce } from './lib/commerce';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [totalitems, setTotalItems] = useState(0);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    const cartData = await commerce.cart.retrieve();
    setCart(cartData);
    //console.log(cart);
    setTotalItems(cartData.total_items);
    
  }

  const handleAddToCart = async (productId, quantity) => {
    const {cart1} = await commerce.cart.add(productId, quantity);
    setCart(cart1);

  }

  const handleUpdateCartQty = async (productId, quantity) => {
    console.log(productId);
    console.log(quantity);
    const {cart1} = await commerce.cart.update(productId, {quantity});
    setCart(cart1);
  }

  const handleRemoveFromCart = async (productId) => {
    const {cart1} = await commerce.cart.remove(productId);
    setCart(cart1);
  }

  const handleEmptyCart = async () => {
    const {cart1} = await commerce.cart.empty();
    setCart(cart1);
  }

 

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [cart]);

  //console.log(products);
  //console.log(cart);
  //console.log(cart.total_items);
  return (
    <div>
      <Router>
        <Navbar totalItems={totalitems} />
        <Routes>
          <Route exact path="/">
            <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
          </Route>
          <Route exact path="/cart">
            <Route exact path="/cart" element={<Cart cart={cart}
                                                handleUpdateCartQty={handleUpdateCartQty}
                                                handleRemoveFromCart={handleRemoveFromCart}
                                                handleEmptyCart={handleEmptyCart}
                                              />
             } />
          </Route>
          <Route exact path="/checkout">
            <Route exact path="/checkout" element={<Checkout/>} />
          </Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
