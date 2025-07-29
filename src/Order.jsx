import React, { useState } from "react";
import { useSelector } from "react-redux";


function Order() {
  const orders = useSelector((state) => state.orders);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleDetails = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <div className="container my-5 text-light">
      <h1 className="text-center mb-4 text-secondary">Your Orders</h1>

      <div className="row g-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="col-md-6"
          >
            <div
              className="card bg-dark text-white shadow-sm border-warning h-100"
              onClick={() => toggleDetails(order.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title">Order ID: #{order.id}</h5>
                <p className="card-text"><strong>Date:</strong> {order.date}</p>

                {expandedOrderId === order.id && (
                  <div className="mt-3">
                    <p><strong>Total:</strong> ₹{order.finalPrice}</p>
                    <ul className="list-group list-group-flush text-white">
                      {order.items.map((item, index) => (
                        <li
                          key={index}
                          className="list-group-item bg-transparent text-white border-bottom"
                        >
                          <strong>{item.name}</strong> - ₹{item.price} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="card-footer bg-transparent text-end">
                <small className="text-muted">Click to {expandedOrderId === order.id ? "hide" : "view"} details</small>
              </div>
            </div>
          </div>
        ))}
      </div>
  
    </div>


  );
}

export default Order;
