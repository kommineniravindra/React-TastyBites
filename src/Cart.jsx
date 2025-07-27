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
import "./cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const couponCodeRef = useRef();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCodeDiscount, setCouponCodeDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [countdown, setCountdown] = useState(2);

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
        newMethod ? `${newMethod.toUpperCase()} payment selected` : "Payment deselected"
      );
      return newMethod;
    });
  };

  if (purchaseComplete) {
    return (
      <div className="thank-you-screen blast">
        <ToastContainer position="top-right" autoClose={2000} />
        <h1>🎉 Thank you for your order!</h1>
        <p>Redirecting to your Orders page in {countdown} seconds...</p>
        <div className="confetti-container">
          {Array(8).fill().map((_, i) => (
            <div className="confetti" key={i}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container-solo-stove">
      <ToastContainer position="top-right" autoClose={2000} />

      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <h1>🧺 <br />Empty Cart</h1>
          <p>Looks like you haven’t added anything to your cart yet.<br />Start shopping now!</p>
        </div>
      ) : (
        <div className="cart-main-solo-stove">
          <div className="cart-items-wrapper-solo-stove">
            <h1>Your Cart ({cartItems.length} items)</h1>
            {cartItems.map((item, idx) => (
              <div key={idx} className="cart-item-solo-stove">
                <img src={item.image} alt={item.name} className="cart-item-image-solo-stove" />
                <div className="item-details-solo-stove">
                  <div className="item-info-top">
                    <span className="item-name-solo-stove">{item.name}</span>
                    <span className="item-price-solo-stove">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="item-quantity-controls-solo-stove">
                  <div className="quantity-box">
                    <button onClick={() => dispatch(decrementItem(item))}>-</button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button onClick={() => dispatch(incrementItem(item))}>+</button>
                  </div>
                  <button
                    className="remove-item-solo-stove"
                    onClick={() => {
                      dispatch(removeFromCart(item));
                      toast.error(`${item.name} removed from cart!`);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary-solo-stove">
            <h2>Order Summary</h2>
            <div className="summary-section">
              <div className="summary-row"><span>Subtotal:</span><span>₹{totalPrice.toFixed(2)}</span></div>
              <div className="summary-row"><span>Sales Tax:</span><span>₹{taxAmount.toFixed(2)}</span></div>
              <div className="summary-row"><span>🏷️ Manual Discount:</span><span>- ₹{discountAmount.toFixed(2)}</span></div>
              <div className="summary-row"><span>🎟️ Coupon Discount:</span><span>- ₹{couponAmount.toFixed(2)}</span></div>
            </div>

            <div className="discount-buttons-reintegrated">
              <button onClick={() => { setDiscountPercentage(10); toast.success("10% manual discount applied."); }}>10% Discount</button>
              <button onClick={() => { setDiscountPercentage(20); toast.success("20% manual discount applied."); }}>20% Discount</button>
              <button onClick={() => { setDiscountPercentage(30); toast.success("30% manual discount applied."); }}>30% Discount</button>
            </div>

            <div className="summary-row coupon-code-row-solo">
              <span>Coupon Code:</span>
              <div className="coupon-input-apply">
                <input type="text" ref={couponCodeRef} placeholder="Enter coupon code" disabled={!!appliedCoupon} />
                <a href="#" onClick={handleCouponApply}>Add Coupon</a>
              </div>
            </div>

            <div className="free-shipping-note">
              Congrats, you're eligible for <strong>Free Shipping</strong>
            </div>

            <div className="summary-row grand-total-row">
              <span>Grand total:</span>
              <span>₹{finalAmount.toFixed(2)}</span>
            </div>

            <h3 className="email-heading">
              Email for Confirmation
              <button
                className="toggle-details-btn"
                onClick={() => {
                  setShowEmailInput(!showEmailInput);
                  toast.info(showEmailInput ? "Email input hidden" : "Email input shown");
                }}
              >
                {showEmailInput ? "Hide Email" : "Show Email"}
              </button>
            </h3>

            {showEmailInput && (
              <div className="email-box-reintegrated">
                <label>📧 Enter your Gmail:</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            )}

            <h3 className="payment-method-heading">Select Payment Method</h3>
            <div className="payment-method-buttons-reintegrated">
              <button onClick={() => handlePaymentMethodClick("qr")} className={paymentMethod === "qr" ? "active" : ""}>QR Code</button>
              <button onClick={() => handlePaymentMethodClick("card")} className={paymentMethod === "card" ? "active" : ""}>Card</button>
            </div>

            {paymentMethod === "qr" && (
              <div className="qr-code-section-reintegrated">
                <h4>Scan to Pay ₹{finalAmount.toFixed(2)}</h4>
                <QRCode value={`upi://pay?pa=9603262008@ybl&pn=TASTYBITE'S&am=${finalAmount.toFixed(2)}&cu=INR`} size={150} />
                <p>UPI ID: 9603262008@ybl</p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="card-payment-section-reintegrated">
                <input type="text" placeholder="Name on Card" />
                <input type="text" placeholder="1234 5678 9012 3456" />
                <input type="text" placeholder="MM/YY" />
                <input type="password" placeholder="CVV" maxLength={4} />
              </div>
            )}

            <button className="checkout-btn" onClick={handleCompletePurchase}>
              Check out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;