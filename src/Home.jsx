import React from 'react';
import './home.css';
import ImageSlider from './ImageSlider';
import { color } from 'framer-motion';

const sliderImages = [
  '/images/paneer-butter-masala.avif',
  '/images/Chicken-Tikka.jpg',
  '/images/pineapple.jpg',
  '/images/Nachos.avif',
  '/images/Vegetable-Samosa.avif',
  '/images/Tandoori-Chicken.avif',
];


const dishes = [
  {
    dishName: 'Paneer Butter Masala',
    category: 'Veg',
    time: '30 min',
    servings: '2',
    image: '/images/paneer-butter-masala.avif'
  },
  {
    dishName: 'Chicken Biryani',
    category: 'Non-Veg',
    time: '45 min',
    servings: '4',
    image: '/images/Chicken-Biryani.avif'
  },
  {
    dishName: 'WaterMelon',
    category: 'Drinks',
    time: '10 min',
    servings: '1',
    image: '/images/watermelon.avif'
  },
  {
    dishName: 'French Fries',
    category: 'Snacks',
    time: '15 min',
    servings: '2',
    image: '/images/French Fries.avif'
  }
];

const cards = [
  {
    category: 'Special',
    title: 'Gulab Jamun',
    time: '15 min',
    details: '2 pieces',
    backText: 'Delicious Indian Dessert'
  },
  {
    category: 'Veg',
    title: 'Rajma Chawal',
    time: '25 min',
    details: '1 plate',
    backText: 'Healthy & Nutritious'
  },
  {
    category: 'Non-Veg',
    title: 'Butter Chicken',
    time: '35 min',
    details: '2 servings',
    backText: 'Creamy & Spicy'
  }
];

function Home() {
  return (
    <div className="home-page">
      <ImageSlider images={sliderImages} />

      {/* Hero Overlay Content - Place this over the slider if desired */}
      {/* Ensure .hero-overlay-content is styled with position: absolute, z-index, etc. in home.css */}
      <div className="hero-overlay-content">
        <h1>Experience the luxury of fine dining from your home</h1>
        {/* You can add a button here like <button className="cta-button">Order Now</button> */}
      </div>

      <div className="image-carousel">
        <marquee behavior="scroll" direction="left" scrollamount="8" className="marquee">
          <img src="/images/apple.jpg" alt="Dish 1" className="carousel-img" />
          <img src="/images/Masala-Dosa.jpg" alt="Dish 2" className="carousel-img" />
          <img src="/images/Tandoori-Chicken.avif" alt="Dish 3" className="carousel-img" />
          <img src="/images/pineapple.jpg" alt="Dish 4" className="carousel-img" />
          <img src="/images/veg-biryani.jpg" alt="Dish 5" className="carousel-img" />
          <img src="/menu/img1.avif" alt="Circle 1" className="circle-img" />
          <img src="/menu/img2.avif" alt="Circle 2" className="circle-img" />
          <img src="/menu/img3.jpg" alt="Circle 3" className="circle-img" />
        </marquee>
      </div>


      <div className="about-us">
        <h2>About Us</h2>
        <p>
          At Tasty Bites, we believe great food brings people together. Our menu is a vibrant mix of flavors,
          offering something delicious for everyone — spicy non-veg delights, wholesome vegetarian meals,
          refreshing beverages, and crunchy snacks.
        </p>
      </div>

      <div className="card-section">
        <h2 className="section-title">Special Picks</h2>
        <div className="menu-items card-grid">
          {dishes.map((dish, index) => (
            <div className="card" key={index}>
              <div className="card-inner">
                <div className="card-front">
                  <img src={dish.image} alt={dish.dishName} className="card-image" />
                  <h3>{dish.dishName}</h3>
                </div>
                <div className="card-back">
                  <h4>{dish.category}</h4>
                  <p>Time: {dish.time}</p>
                  <p>Servings: {dish.servings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-section">
        <h2>Our Menu</h2>
        <div className="menu-items">
          <div className="menu-item">
            <img src="/images/veg-biryani.jpg" alt="Veg Dish" />
            <h3>Veg Biryani</h3>
            <p>Fresh, organic vegetables tossed in a tangy, light dressing</p>
          </div>
          <div className="menu-item">
            <img src="/images/Chicken-Tikka.jpg" alt="Non-Veg Dish" />
            <h3>Chicken Tikka</h3>
            <p>Perfectly grilled, tender chicken served with savory spices</p>
          </div>
          <div className="menu-item">
            <img src="/images/French Fries.avif" alt="Snack" />
            <h3>French Fries</h3>
            <p>Crispy and golden, the perfect snack to pair with any meal</p>
          </div>
          <div className="menu-item">
            <img src="/images/banana.jpg" alt="Drink" />
            <h3>Banana Juice</h3>
            <p>Refreshing yogurt-based drink with a rich mango flavor</p>
          </div>
        </div>
      </div>

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

      <div className="cta">
        <h2>Order Now and Experience Gourmet Dining!</h2>
        <button>Order Now</button>
      </div>

      <div className="image-gallery">
        <img src="/menu/img1.avif" alt="Dish 1" className="circle-img" />
        <img src="/menu/img2.avif" alt="Dish 2" className="circle-img" />
        <img src="/menu/img3.jpg" alt="Dish 3" className="circle-img" />
      </div>

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

export default Home;