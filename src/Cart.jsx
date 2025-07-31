import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  decrementItem,
  incrementItem,
  clearCart,
  orderDetails,
} from "./store";
import QRCode from "react-qr-code";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from 'react-confetti';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const couponCodeRef = useRef();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCodeDiscount, setCouponCodeDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null); // Initialize with null
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (totalPrice * discountPercentage) / 100;
  const couponAmount = (totalPrice * couponCodeDiscount) / 100;
  const priceAfterDiscount = totalPrice - discountAmount - couponAmount;
  const taxAmount = priceAfterDiscount * 0.18;
  const finalAmount = priceAfterDiscount + taxAmount;

  useEffect(() => {
    if (purchaseComplete && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0 && purchaseComplete) {
      navigate("/Order");
    }
  }, [countdown, purchaseComplete, navigate]);

  const handleCouponApply = () => {
    const code = couponCodeRef.current.value.trim().toUpperCase();
    toast.info("Applying coupon...");
    if (appliedCoupon === code) {
      toast.info("Coupon already applied.");
      return;
    }
    switch (code) {
      case "RAVI10":
        setCouponCodeDiscount(10);
        setAppliedCoupon(code);
        toast.success("RAVI10 Applied!");
        break;
      case "RAVI20":
        setCouponCodeDiscount(20);
        setAppliedCoupon(code);
        toast.success("RAVI20 Applied!");
        break;
      case "RAVI30":
        setCouponCodeDiscount(30);
        setAppliedCoupon(code);
        toast.success("RAVI30 Applied!");
        break;
      default:
        toast.error("Invalid coupon code");
        setCouponCodeDiscount(0);
        setAppliedCoupon("");
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCompletePurchase = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }
    if (!isAuthenticated) {
      toast.warn("Please sign up or sign in to complete your order.");
      navigate("/SignUp", { state: { from: "/Cart" } });
      return;
    }
    if (!paymentMethod) { // New validation for payment method
      toast.error("Please select a payment method.");
      return;
    }
    if (!userEmail || !validateEmail(userEmail)) {
      toast.error("Please enter a valid email address.");
      toast.warn("Email required for order confirmation.");
      setShowEmailInput(true);
      return;
    }

    toast.info("Processing your order...");
    setPurchaseComplete(true);

    const orderData = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cartItems],
      finalPrice: finalAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      paymentMethod: paymentMethod.toUpperCase(), // Add payment method to order data
    };

    const formattedItems = cartItems.map((item) => ({
      name: item.name,
      price: item.price * item.quantity,
      quantity: item.quantity,
    }));

    const itemDetailsString = cartItems
      .map(
        (item) =>
          ` Item: ${item.name}\n Quantity: ${item.quantity}\n Price: ₹${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n\n");

    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const templateParams = {
      order_id: orderData.id,
      orders: JSON.stringify(formattedItems, null, 2),
      item_list: itemDetailsString,
      shipping: "0.00",
      tax: taxAmount.toFixed(2),
      manual_discount: discountAmount.toFixed(2),
      coupon_discount: couponAmount.toFixed(2),
      final_amount: finalAmount.toFixed(2),
      total_quantity: totalQuantity,
      email: userEmail,
      logo: "",
      payment_method: paymentMethod.toUpperCase(), // Add payment method to email template
    };

    setTimeout(() => {
      emailjs
        .send(
          "service_k7bc7r4",
          "template_jdttzxe",
          templateParams,
          "L9AQ2DmFmPSb1gJi2"
        )
        .then(() => {
          dispatch(orderDetails(orderData));
          dispatch(clearCart());
          toast.success("Order placed & confirmation email sent!");
        })
        .catch((err) => {
          console.error("❌ Email sending failed:", err);
          toast.error("Failed to send email. Please try again.");
        });
    }, 500);
  };

  const handlePaymentMethodClick = (method) => {
    setPaymentMethod((prevMethod) => {
      const newMethod = prevMethod === method ? null : method;
      toast.info(
        newMethod
          ? `${newMethod.toUpperCase()} payment selected`
          : "Payment deselected"
      );
      return newMethod;
    });
  };

  if (purchaseComplete) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={400}
        />
        <div className="container text-center vh-100 d-flex flex-column justify-content-center align-items-center">
          <ToastContainer position="top-right" autoClose={2000} />
          <h1 className="display-4">🎉 Thank you for your order!</h1>
          <p className="lead">
            Redirecting to your Orders page in {countdown} seconds...
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="container my-5">
      <ToastContainer position="top-right" autoClose={2000} />

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h1 className="display-1">🧺</h1>
          <h2>Your Cart is Empty</h2>
          <p className="lead text-muted">
            Looks like you haven’t added anything yet. Start shopping now!
          </p>
        </div>
      ) : (
        <div className="row g-5">
          {/* Cart Items Column */}
          <div className="col-lg-8">
            <h1 className="mb-4">Your Cart ({cartItems.length} items)</h1>
            {cartItems.map((item, idx) => (
              <div key={idx} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded me-3"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title mb-0">{item.name}</h5>
                        <h5 className="text-primary">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </h5>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <div className="input-group" style={{ width: "120px" }}>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(decrementItem(item))}
                          >
                            -
                          </button>
                          <span className="input-group-text justify-content-center" style={{ width: "40px" }}>
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(incrementItem(item))}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger ms-auto"
                          onClick={() => {
                            dispatch(removeFromCart(item));
                            toast.error(`${item.name} removed from cart!`);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Column */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-4">Order Summary</h2>
                
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between"><span>Subtotal:</span><span>₹{totalPrice.toFixed(2)}</span></li>
                  <li className="list-group-item d-flex justify-content-between"><span>Sales Tax (18%):</span><span>₹{taxAmount.toFixed(2)}</span></li>
                  <li className="list-group-item d-flex justify-content-between text-danger"><span>🏷️ Manual Discount:</span><span>- ₹{discountAmount.toFixed(2)}</span></li>
                  <li className="list-group-item d-flex justify-content-between text-danger"><span>🎟️ Coupon Discount:</span><span>- ₹{couponAmount.toFixed(2)}</span></li>
                  <li className="list-group-item d-flex justify-content-between h5 fw-bold mt-2"><span>Grand Total:</span><span>₹{finalAmount.toFixed(2)}</span></li>
                </ul>

                <div className="mt-4">
                  <h6>Manual Discounts</h6>
                  <div className="d-grid gap-2 d-md-flex">
                    <button className="btn btn-sm btn-outline-info" onClick={() => { setDiscountPercentage(10); toast.success("10% manual discount applied."); }}>10%</button>
                    <button className="btn btn-sm btn-outline-info" onClick={() => { setDiscountPercentage(20); toast.success("20% manual discount applied."); }}>20%</button>
                    <button className="btn btn-sm btn-outline-info" onClick={() => { setDiscountPercentage(30); toast.success("30% manual discount applied."); }}>30%</button>
                  </div>
                </div>

                <div className="input-group my-4">
                  <input type="text" ref={couponCodeRef} className="form-control" placeholder="Enter coupon code" disabled={!!appliedCoupon} />
                  <button className="btn btn-outline-secondary" onClick={handleCouponApply}>Apply</button>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Email for Confirmation</h5>
                    <button className="btn btn-link btn-sm" onClick={() => setShowEmailInput(!showEmailInput)}>
                      {showEmailInput ? "Hide" : "Show"}
                    </button>
                  </div>
                  {showEmailInput && (
                    <div className="mt-2">
                      <input
                        type="email"
                        className="form-control"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Select Payment Method</h5>
                  <div className="d-grid gap-2">
                    <button onClick={() => handlePaymentMethodClick("qr")} className={`btn ${paymentMethod === "qr" ? "btn-primary" : "btn-outline-primary"}`}>QR Code</button>
                    <button onClick={() => handlePaymentMethodClick("card")} className={`btn ${paymentMethod === "card" ? "btn-primary" : "btn-outline-primary"}`}>Card</button>
                    {/* New COD Button */}
                    <button onClick={() => handlePaymentMethodClick("cod")} className={`btn ${paymentMethod === "cod" ? "btn-primary" : "btn-outline-primary"}`}>Cash on Delivery</button>
                  </div>
                </div>

                {paymentMethod === "qr" && (
                  <div className="text-center p-3 border rounded mb-3">
                    <h6>Scan to Pay ₹{finalAmount.toFixed(2)}</h6>
                    <QRCode value={`upi://pay?pa=9603262008@ybl&pn=TASTYBITE'S&am=${finalAmount.toFixed(2)}&cu=INR`} size={150} />
                    <p className="mt-2 mb-0">
                      <small>UPI ID: 9603262008@ybl</small>
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="p-3 border rounded mb-3">
                    <input type="text" className="form-control mb-2" placeholder="Name on Card" />
                    <input type="text" className="form-control mb-2" placeholder="1234 5678 9012 3456" />
                    <div className="row">
                      <div className="col"><input type="text" className="form-control" placeholder="MM/YY" /></div>
                      <div className="col"><input type="password" className="form-control" placeholder="CVV" maxLength={4} /></div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === "cod" && (
                  <div className="p-3 border rounded mb-3 text-center">
                    <p className="mb-0">You have selected Cash on Delivery.</p>
                    <p className="mb-0">Please be ready with ₹{finalAmount.toFixed(2)} at the time of delivery.</p>
                  </div>
                )}

                <div className="d-grid">
                    <button className="btn btn-success btn-lg" onClick={handleCompletePurchase}>
                    Check Out
                    </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;