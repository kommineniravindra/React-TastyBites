import React from 'react';
import './home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Scrolling Image Carousel using Marquee */}
      <div className="image-carousel">
        <marquee behavior="scroll" direction="left" scrollamount="8" className="marquee">
          <img src="/images/apple.jpg" alt="Dish 1" className="carousel-img" />
          <img src="/images/Masala-Dosa.jpg" alt="Dish 2" className="carousel-img" />
          <img src="/images/Tandoori-Chicken.avif" alt="Dish 3" className="carousel-img" />
          <img src="/images/pineapple.jpg" alt="Dish 4" className="carousel-img" />
          <img src="/images/veg-biryani.jpg" alt="Dish 5" className="carousel-img" />
          <img src="/menu/img1.avif" alt="Dish 1" className="circle-img" />
        <img src="/menu/img2.avif" alt="Dish 2" className="circle-img" />
        <img src="/menu/img3.jpg" alt="Dish 3" className="circle-img" />
         
        </marquee>
        
      </div>

      {/* Hero Section */}
      <div className="home-container">
        <div className="home-card">
          <h1>Experience the luxury of fine dining from your home</h1>
          <img src="/home/home1.jpeg" alt="Gourmet Meal" />
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          At Tasty Bites, we believe great food brings people together. Our menu is a vibrant mix of flavors, offering something delicious for everyone.
          Whether you’re craving spicy non-veg delights, wholesome vegetarian meals, refreshing beverages, or crunchy snacks, we’ve got your cravings covered.
        </p>
      </div>

      <div className="menu-section">
  <h2>Our Menu</h2>
  <div className="menu-items">
    {/* Veg Section */}
    <div className="menu-item">
      <img src="/images/veg-biryani.jpg" alt="Veg Dish" />
      <h3>Veg Biryani</h3>
      <p>Fresh, organic vegetables tossed in a tangy, light dressing</p>
    </div>

    {/* Non-Veg Section */}
    <div className="menu-item">
      <img src="/images/Chicken-Tikka.jpg" alt="Non-Veg Dish" />
      <h3>Chicken Tikka</h3>
      <p>Perfectly grilled, tender chicken served with savory spices</p>
    </div>

    {/* Snacks Section */}
    <div className="menu-item">
      <img src="/snacks/French Fries.avif" alt="Snack" />
      <h3>French Fries</h3>
      <p>Crispy and golden, the perfect snack to pair with any meal</p>
    </div>

    {/* Drinks Section */}
    <div className="menu-item">
      <img src="/images/banana.jpg" alt="Drink" />
      <h3>Banana Juice</h3>
      <p>Refreshing yogurt-based drink with a rich mango flavor</p>
    </div>
  </div>
</div>


      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <p>"The food was absolutely amazing! Best dining experience I've ever had!"</p>
          <h4>- Jane Doe</h4>
        </div>
        <div className="testimonial">
          <p>"Highly recommend! The delivery was prompt and the food was cooked to perfection!"</p>
          <h4>- John Smith</h4>
        </div>
      </div>

    

      {/* Call to Action Section */}
      <div className="cta">
        <h2>Order Now and Experience Gourmet Dining!</h2>
        <button>Order Now</button>
      </div>

      {/* Circular Image Gallery */}
      <div className="image-gallery">
        <img src="/menu/img1.avif" alt="Dish 1" className="circle-img" />
        <img src="/menu/img2.avif" alt="Dish 2" className="circle-img" />
        <img src="/menu/img3.jpg" alt="Dish 3" className="circle-img" />
      </div>

      {/* Additional Home Content */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Top Chefs from Around the World</li>
          <li>Fresh Ingredients Delivered to Your Doorstep</li>
          <li>Customizable Dining Experiences</li>
        </ul>
      </div>
    </div>
  );
}
export default Home