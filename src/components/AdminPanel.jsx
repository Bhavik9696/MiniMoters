import React, { useState } from 'react';

const AdminPanel = ({ products, setProducts }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!name || !category || !price) {
      alert('Please fill all fields.');
      return;
    }

    const newProduct = {
      name,
      category,
      price: parseFloat(price),
    };

    if (editIndex !== null) {
      // Update existing product
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }

    setName('');
    setCategory('');
    setPrice('');
  };

  const handleEdit = (index) => {
    const product = products[index];
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded col-span-1 md:col-span-1"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded col-span-1 md:col-span-1"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded col-span-1 md:col-span-1"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-1 md:col-span-1"
        >
          {editIndex !== null ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price (₹)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2">{prod.name}</td>
              <td className="border p-2">{prod.category}</td>
              <td className="border p-2">{prod.price}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No products added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
