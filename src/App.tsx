import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/dashboard';
import ProductDetail from './components/Product/ProductDetails';
import Category from './pages/category';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Login from './pages/login';
import AdminDashboard from './components/Admin/adminDashboard';

function App() {
  return (
    <BrowserRouter>
      {/* Add Header here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {/* Add Footer here */}
    </BrowserRouter>
  );
}
export default App;