import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';

function Drink() {
  const drinkProducts = useSelector((state) => state.products.drinks);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRanges, setPriceRanges] = useState([]);
  const itemsPerPage = 8;

  const handleCheckboxChange = (range) => {
    setCurrentPage(1);
    setPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((item) => item !== range) : [...prev, range]
    );
  };

  const filterByPrice = (product) => {
    if (priceRanges.length === 0) return true;
    return priceRanges.some((range) => {
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

  return (
    <>
      <div className="container py-5">
        <ToastContainer position="top-right" autoClose={2000} />
        <h1 className="mb-4 text-center text-secondary fw-bold">Drinks Items</h1>

        {/* Price Filter */}
        <div className="mb-4">
          <h5>Filter by Price:</h5>
          <div className="d-flex flex-wrap gap-3">
            {['0-200', '201-400', '401-600'].map((range) => (
              <div className="form-check" key={range}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={range}
                  checked={priceRanges.includes(range)}
                  onChange={() => handleCheckboxChange(range)}
                />
                <label className="form-check-label" htmlFor={range}>
                  {range.replace('-', ' - ₹').replace('₹', '₹')}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {currentItems.map((product, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-danger fw-bold">₹{product.price}</p>
                  <button
                    className="btn btn-warning mt-auto text-black"
                    onClick={() => {
                      dispatch(addToCart(product));
                      toast.success(`${product.name} added to cart!`);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                  Prev
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => goToPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Drink;
