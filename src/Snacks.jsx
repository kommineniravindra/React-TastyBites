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
  // Change priceRange state to an array of checked price ranges
  const [priceRanges, setPriceRanges] = useState([]);

  // Toggle price range checkbox checked state
  const handleCheckboxChange = (range) => {
    setCurrentPage(1); // reset to page 1 on filter change
    setPriceRanges((prev) =>
      prev.includes(range)
        ? prev.filter(item => item !== range)
        : [...prev, range]
    );
  };

  // Filter products by priceRanges array — if empty, show all
  const filterByPrice = (product) => {
    if (priceRanges.length === 0) return true;

    return priceRanges.some(range => {
      if (range === '0-200') return product.price >= 0 && product.price <= 200;
      if (range === '201-400') return product.price >= 201 && product.price <= 400;
      if (range === '401-600') return product.price >= 401 && product.price <= 600;
      return false;
    });
  };

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

      {/* Checkbox Price Range Filter */}
      <div className="checkbox-filter">
        <div className="filter-label">Filter by Price:</div>

        <label className="filter-checkbox">
          <input
            type="checkbox"
            value="0-200"
            checked={priceRanges.includes('0-200')}
            onChange={() => handleCheckboxChange('0-200')}
          />
          ₹0 - ₹200
        </label>

        <label className="filter-checkbox">
          <input
            type="checkbox"
            value="201-400"
            checked={priceRanges.includes('201-400')}
            onChange={() => handleCheckboxChange('201-400')}
          />
          ₹201 - ₹400
        </label>

        <label className="filter-checkbox">
          <input
            type="checkbox"
            value="401-600"
            checked={priceRanges.includes('401-600')}
            onChange={() => handleCheckboxChange('401-600')}
          />
          ₹401 - ₹600
        </label>
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
