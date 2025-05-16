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
  const [priceRange, setPriceRange] = useState('all');

  // Function to filter based on price
  const filterByPrice = (product) => {
    if (priceRange === '0-200') return product.price >= 0 && product.price <= 200;
    if (priceRange === '201-400') return product.price >= 201 && product.price <= 400;
    if (priceRange === '401-600') return product.price >= 401 && product.price <= 600;
    return true; // 'all'
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

      {/* Price Range Filter */}
      <div className="filter">
  <label>Filter by Price:</label>
  <select onChange={(e) => {
    setPriceRange(e.target.value);
    setCurrentPage(1);
  }} value={priceRange}>
    <option value="all">All</option>
    <option value="0-200">₹0 - ₹200</option>
    <option value="201-400">₹201 - ₹400</option>
    <option value="401-600">₹401 - ₹600</option>
  </select>
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
    </div>
  );
}

export default Veg;
