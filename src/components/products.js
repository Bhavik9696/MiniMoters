import React, { useState } from 'react';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import BuyNowModal from './components/BuyNowModal';
import CustomizeGift from './components/CustomizeGift';
import AdminPanel from './components/AdminPanel';

function App() {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Initial products
  const [products, setProducts] = useState([
    { name: 'Diecast Bitz', category: 'Car', price: 1200 },
    { name: 'Keychain (Car + Anime)', category: 'Keychain', price: 250 },
    { name: 'Car Poster', category: 'Poster', price: 150 },
    { name: 'F1 Car', category: 'Formula', price: 5000 },
    { name: 'Anime (3D)', category: 'Anime', price: 800 },
    { name: 'Avengers (3D)', category: 'Avengers', price: 950 },
  ]);

  const handleBuy = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">MiniMoters Store</h1>

      {/* Admin Panel */}
      <AdminPanel products={products} setProducts={setProducts} />

      {/* Search + Product Grid */}
      <SearchBar query={query} setQuery={setQuery} />
      <ProductGrid query={query} products={products} onBuy={handleBuy} />

      {/* Buy Modal */}
      <BuyNowModal product={selectedProduct} onClose={handleCloseModal} />

      <CustomizeGift />
    </div>
  );
}

export default App;
