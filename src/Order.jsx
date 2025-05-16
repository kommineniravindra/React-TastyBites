// Order.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Orders.css";

function Order() {
  const orders = useSelector((state) => state.orders);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleDetails = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <div className="order-container">
      <h1 className="title">Your Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card" onClick={() => toggleDetails(order.id)}>
            <h3>Order ID: #{order.id}</h3>
            <p><strong>Date:</strong> {order.date}</p>

            {expandedOrderId === order.id && (
              <div className="order-details">
                <p><strong>Total:</strong> ₹{order.finalPrice}</p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      <strong>{item.name}</strong> - ₹{item.price} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Order;
