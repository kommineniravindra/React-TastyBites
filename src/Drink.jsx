import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './vegstyle.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Drink() {
  const drinkProducts = useSelector(state => state.products.drinks);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRanges, setPriceRanges] = useState([]); // multiple selected ranges
  const itemsPerPage = 8;

  const handleCheckboxChange = (range) => {
    setCurrentPage(1); // reset page on filter change
    setPriceRanges(prev =>
      prev.includes(range)
        ? prev.filter(item => item !== range)
        : [...prev, range]
    );
  };

  const filterByPrice = (product) => {
    if (priceRanges.length === 0) return true;
    return priceRanges.some(range => {
      if (range === '0-200') return product.price >= 0 && product.price <= 200;
      if (range === '201-400') return product.price >= 201 && product.price <= 400;
      if (range === '401-600') return product.price >= 401 && product.price <= 600;
      return false;
    });
  };

  const filteredProducts = drinkProducts.filter(filterByPrice);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const drinkListItems = currentItems.map((product, index) => (
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
      <h1>Drinks Items</h1>

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

      <ol className="veg-list">{drinkListItems}</ol>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
        
      </div>
         <footer className="custom-footer">
  <h2>Tasty Bite's</h2>
  <p>
   Our team is made up of professionals dedicated to excellence. We value collaboration, creativity, and commitment in everything we do.

  </p>
  <div className="social-icons">
    <a href="#"><i className="fab fa-facebook-f"></i></a>
    <a href="#"><i className="fab fa-twitter"></i></a>
    <a href="#"><i className="fab fa-google-plus-g"></i></a>
    <a href="#"><i className="fab fa-youtube"></i></a>
    <a href="#"><i className="fab fa-linkedin-in"></i></a>
  </div>
  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} <span className="brand">Tasty Bite's</span></p>
    <div className="footer-links">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/blog">Blog</a>
    </div>
  </div>
</footer>
    </div>
  );
}

export default Drink;
