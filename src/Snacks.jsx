import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './vegstyle.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Snacks() {
  const snacksProducts = useSelector(state => state.products.snacks);
  const dispatch = useDispatch();

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState('all'); // ✅ Added priceRange state

  // ✅ Filter function based on price
  const filterByPrice = (product) => {
    if (priceRange === '0-200') return product.price >= 0 && product.price <= 200;
    if (priceRange === '201-400') return product.price >= 201 && product.price <= 400;
    if (priceRange === '401-600') return product.price >= 401 && product.price <= 600;
    return true; // for 'all'
  };

  // ✅ Apply filter before pagination
  const filteredProducts = snacksProducts.filter(filterByPrice);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const snacksListItems = currentItems.map((product, index) => (
    <li key={index}>
      <img src={product.image} alt={product.name} />
      <div className="product-name">{product.name}</div>
      <div className="product-price">₹{product.price}</div>
      <button
        onClick={() => {
          dispatch(addToCart(product));
          toast.success(`${product.name} added to cart!`);
        }}
      >
        Add to Cart
      </button>
    </li>
  ));

  return (
    <div className="veg-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1>Snacks Items</h1>

      {/* Price Range Filter */}
      <div className="filter">
        <label>Filter by Price:</label>
        <select
          onChange={(e) => {
            setPriceRange(e.target.value);
            setCurrentPage(1); // Reset to first page when filter changes
          }}
          value={priceRange}
        >
          <option value="all">All</option>
          <option value="0-200">₹0 - ₹200</option>
          <option value="201-400">₹201 - ₹400</option>
          <option value="401-600">₹401 - ₹600</option>
        </select>
      </div>

      <ol className="veg-list">{snacksListItems}</ol>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Snacks;
