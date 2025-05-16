import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './vegstyle.css';
import { addToCart } from './store';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Veg() {
  const vegProducts = useSelector(state => state.products.veg);
  const dispatch = useDispatch();

  const itemPerPage = 8;
  const [currentpage, setCurrentPage] = useState(1);

  // Price ranges and their labels
  const priceRanges = [
    { id: '0-200', label: '₹0 - ₹200' },
    { id: '201-400', label: '₹201 - ₹400' },
    { id: '401-600', label: '₹401 - ₹600' },
  ];

  // State to track which price ranges are checked
  const [selectedPrices, setSelectedPrices] = useState([]);

  // Handle checkbox toggle
  const handleCheckboxChange = (id) => {
    setCurrentPage(1);
    setSelectedPrices(prev => {
      if (prev.includes(id)) {
        return prev.filter(price => price !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Filtering function based on selected price ranges
  const filterByPrice = (product) => {
    if (selectedPrices.length === 0) return true; // no filter = show all

    return selectedPrices.some(range => {
      if (range === '0-200') return product.price >= 0 && product.price <= 200;
      if (range === '201-400') return product.price >= 201 && product.price <= 400;
      if (range === '401-600') return product.price >= 401 && product.price <= 600;
      return false;
    });
  };

  const filteredProducts = vegProducts.filter(filterByPrice);

  const indexofLastitem = currentpage * itemPerPage;
  const indexofFirstItem = indexofLastitem - itemPerPage;
  const currentItems = filteredProducts.slice(indexofFirstItem, indexofLastitem);
  const totalPages = Math.ceil(filteredProducts.length / itemPerPage);

  const goToPage = (page) => { setCurrentPage(page); };

  const vegListItems = currentItems.map((product, index) => (
    <li key={index}>
      <img src={product.image} alt={product.name} />
      <div className="product-name">{product.name}</div>
      <div className="product-price">₹{product.price}</div>
      <button onClick={() => {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
      }}>Add to Cart</button>
    </li>
  ));

  return (
    <div className="veg-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1>Veg Items</h1>

      {/* Checkbox Price Filter */}
      <div className="filter checkbox-filter">
        <span className="filter-label">Filter by Price:</span>
        {priceRanges.map(({ id, label }) => (
          <label key={id} className="filter-checkbox">
            <input
              type="checkbox"
              value={id}
              checked={selectedPrices.includes(id)}
              onChange={() => handleCheckboxChange(id)}
            />
            {label}
          </label>
        ))}
      </div>

      <ol className="veg-list">{vegListItems}</ol>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => goToPage(currentpage - 1)} disabled={currentpage === 1}>Prev</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={currentpage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentpage + 1)} disabled={currentpage === totalPages}>Next</button>
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

export default Veg;
