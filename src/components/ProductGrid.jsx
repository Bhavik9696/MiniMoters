import React from 'react';

const ProductGrid = ({ products, query, onBuy }) => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">Price: ₹{product.price}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => onBuy(product)}
            >
              Buy Now
            </button>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductGrid;
