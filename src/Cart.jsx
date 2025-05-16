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
  const [paymentMethod, setPaymentMethod] = useState("");
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
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 5000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0 && purchaseComplete) {
      navigate("/Order");
    }
  }, [countdown, purchaseComplete, navigate]);

  const handleCouponApply = () => {
    const code = couponCodeRef.current.value.trim().toUpperCase();

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
      return;
    }

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
          ` Item: ${item.name}\n  Quantity: ${item.quantity}\n Price: ₹${(
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
      shipping: "14.15",
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
          toast.success("Order successfully placed!");
        })
        .catch((err) => {
          console.error("❌ Email sending failed:", err);
          toast.error("Failed to send confirmation email.");
        });
    }, 500);
  };

  if (purchaseComplete) {
    return (
      <div className="thank-you-screen blast">
        <h1>🎉 Thank you for your order!</h1>
        <p>Redirecting to your Orders page in {countdown} seconds...</p>
        <div class="confetti-container">
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
  <div class="confetti"></div>
</div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <ToastContainer position="top-right" autoClose={2000} />
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <h1>🧺 <br></br>Empty Cart</h1>
          <p>Looks like you haven’t added anything to your cart yet.<br />Start shopping now!</p>
        </div>
      ) : (
        <div className="cart-main">
          <div className="cart-items-container">
            <h1>😋 Welcome 😋</h1>
            <div className="cart-items-wrapper">
              <ol>
                {cartItems.map((item, idx) => (
                  <li key={idx} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-details">
                      <span>{item.name}</span>
                      <small>₹{item.price}</small>
                    </div>
                    <div className="cart-buttons">
                      <button onClick={() => dispatch(incrementItem(item))}>
                        +
                      </button>
                      <div className="cart-quantity">{item.quantity}</div>
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? dispatch(decrementItem(item))
                            : dispatch(removeFromCart(item))
                        }
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          dispatch(removeFromCart(item));
                          toast.error(`${item.name} removed from cart!`);
                        }}
                        style={{ color: "white", backgroundColor: "red" }}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bill-summary-container">
            <h2>🧾 Bill Summary</h2>
            <hr />
            <div className="bill-row">
              <span>💰 Total Price:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="bill-row">
              <span>🏷️ Manual Discount:</span>
              <span>- ₹{discountAmount.toFixed(2)}</span>
            </div>
            <div className="bill-row">
              <span>🎟️ Coupon Discount:</span>
              <span>- ₹{couponAmount.toFixed(2)}</span>
            </div>

            <div className="discount-buttons">
              <button onClick={() => setDiscountPercentage(10)}>10% Discount</button>
              <button onClick={() => setDiscountPercentage(20)}>20% Discount</button>
              <button onClick={() => setDiscountPercentage(30)}>30% Discount</button>
            </div>

            <div className="coupon-section">
              <input
                ref={couponCodeRef}
                placeholder="Enter coupon code..."
                disabled={!!appliedCoupon}
              />
              <button onClick={handleCouponApply}>Apply</button>
            </div>

            <div className="bill-row">
              <span>⚖️ Tax (18%):</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <hr />
            <div className="bill-row total-amount">
              <strong>💵 Final Amount:</strong>
              <strong>₹{finalAmount.toFixed(2)}</strong>
            </div>

            <h3>Select Payment Method</h3>
            <div className="payment-method-buttons">
              <button onClick={() => setPaymentMethod("qr")}>QR Code</button>
              <button onClick={() => setPaymentMethod("card")}>Card</button>
            </div>

            {paymentMethod === "qr" && (
              <div className="qr-code-section">
                <h4>Scan to Pay ₹{finalAmount.toFixed(2)}</h4>
                <QRCode
                  value={`upi://pay?pa=9603262008@ybl&pn=TASTYBITE'S&am=${finalAmount.toFixed(
                    2
                  )}&cu=INR`}
                  size={150}
                />
                <p>UPI ID: 9603262008@ybl</p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="card-payment-section">
                <input type="text" placeholder="Name on Card" />
                <input type="text" placeholder="1234 5678 9012 3456" />
                <input type="text" placeholder="MM/YY" />
                <input type="password" placeholder="CVV" maxLength={4} />
              </div>
            )}

            <div className="email-box">
              <label>📧 Enter your Gmail:</label>
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <button className="complete-btn" onClick={handleCompletePurchase}>
              🎉 Complete Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
