import React, { useEffect } from 'react';
import AOS from 'aos';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
      offset: 20,
    });
  }, []);

  // Data for the "Special Picks" carousel
  const specialPicks = [
    { img: '/images/paneer-butter-masala.avif', name: 'Paneer Butter Masala', desc: 'Creamy, rich, and bursting with flavor.' },
    { img: '/images/Chicken-Tikka.jpg', name: 'Classic Chicken Tikka', desc: 'Perfectly grilled chicken with aromatic spices.' },
    { img: '/images/pineapple.jpg', name: 'Fresh Pineapple Juice', desc: 'A refreshing and tropical delight.' },
    { img: '/images/Chicken-65.jpg', name: 'Spicy Chicken 65', desc: 'A fiery and popular appetizer from Hyderabad.' },
  ];

  // Data for the "Menu Preview" section
  const menuPreviewItems = [
    { img: 'veg-biryani.jpg', name: 'Hyderabadi Veg Biryani', desc: 'Aromatic basmati rice with fresh vegetables.' },
    { img: 'Chicken-Tikka.jpg', name: 'Chicken Tikka', desc: 'Tender chicken marinated and grilled.' },
    { img: 'French Fries.avif', name: 'Golden Fries', desc: 'Crispy, salty, and perfect for sharing.' },
    { img: 'banana.jpg', name: 'Banana Milkshake', desc: 'Cool, creamy, and satisfyingly sweet.' },
  ];

  // Data for the "Testimonials" section
  const testimonials = [
    { quote: "The best Hyderabadi biryani I've had outside of Hyderabad itself. The flavors were authentic and the delivery was quick. Highly recommended!", author: 'Arjun Reddy', location: 'Banjara Hills, Hyderabad', img: 'https://i.pravatar.cc/150?img=60' },
    { quote: 'Tasty Bites is our go-to for weekend treats. The Chicken 65 is perfectly spicy and the fresh juices are a must-try. Consistent quality every time.', author: 'Priya Sharma', location: 'Gachibowli, Hyderabad', img: 'https://i.pravatar.cc/150?img=32' }
  ];

  return (
    <div className="home-container">
      {/* --- Custom Styles --- */}
      <style>
        {`
          .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.15);
            transition: all 0.3s ease-in-out;
          }
          .scroller {
            animation: scroll 40s linear infinite;
          }
          .scroller-container:hover .scroller {
            animation-play-state: paused;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .hero-overlay {
            background: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>

      {/* --- Hero Section --- */}
      <div className="position-relative vh-100 d-flex align-items-center justify-content-center text-white text-center overflow-hidden">
        <video src="/menu/v2.mp4" autoPlay muted loop playsInline className="position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: 'cover', zIndex: 0 }} />
        <div className="position-absolute top-0 start-0 w-100 h-100 hero-overlay" style={{ zIndex: 1 }}></div>
        <div data-aos="fade-up" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="display-3 fw-bold">Welcome to Tasty Bites</h1>
          <p className="lead fs-4 mt-3">Crafted with Passion, Delivered with Joy</p>
          <a href="/veg" className="btn btn-warning btn-lg mt-4 px-5 py-3 fw-bold">
            Order Now
          </a>
        </div>
      </div>

      {/* --- Infinite Image Scroller Section --- */}
      <div className="scroller-container bg-light py-4 overflow-hidden">
        <div className="scroller d-flex">
          {[...Array(2)].map((_, i) => (
            ['apple.jpg', 'Masala-Dosa.jpg', 'Tandoori-Chicken.avif', 'pineapple.jpg', 'veg-biryani.jpg', 'Chicken-Tikka.jpg'].map((img, idx) => (
              <img key={`${i}-${idx}`} src={`/images/${img}`} alt={`Dish ${idx}`} className="mx-3 rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
            ))
          ))}
        </div>
      </div>
      
      {/* --- Special Picks Carousel Section --- */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold">This Week's Special Picks</h2>
            <p className="text-muted">Handpicked by our chef, just for you.</p>
          </div>
          <div id="specialPicksCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-aos="fade-up" data-aos-delay="200">
            <div className="carousel-indicators">
              {specialPicks.map((_, index) => ( <button key={index} type="button" data-bs-target="#specialPicksCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-label={`Slide ${index + 1}`}></button> ))}
            </div>
            <div className="carousel-inner rounded-4 shadow-lg">
              {specialPicks.map((pick, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="3000">
                  <img src={pick.img} className="d-block w-100" alt={pick.name} style={{ height: '500px', objectFit: 'cover' }} />
                  <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3 mb-4">
                    <h5>{pick.name}</h5><p>{pick.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#specialPicksCarousel" data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span><span className="visually-hidden">Previous</span></button>
            <button className="carousel-control-next" type="button" data-bs-target="#specialPicksCarousel" data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span><span className="visually-hidden">Next</span></button>
          </div>
        </div>
      </section>

      {/* --- "Our Promise" Section --- */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold">Our Promise</h2>
            <p className="lead text-muted">Quality, Taste, and Service You Can Trust.</p>
          </div>
          <div className="row text-center g-4">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 card-hover"><div className="fs-1 text-warning mb-3"><i className="bi bi-flower1"></i></div><h5 className="fw-bold">Fresh Ingredients</h5><p className="text-muted">We source the freshest local ingredients to ensure every dish is packed with authentic flavor.</p></div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
               <div className="p-4 bg-white rounded-4 shadow-sm h-100 card-hover"><div className="fs-1 text-warning mb-3"><i className="bi bi-person-gear"></i></div><h5 className="fw-bold">Expertly Crafted</h5><p className="text-muted">Our chefs bring years of culinary passion and authentic Hyderabadi recipes to your plate.</p></div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 card-hover"><div className="fs-1 text-warning mb-3"><i className="bi bi-bicycle"></i></div><h5 className="fw-bold">Fast & Friendly Delivery</h5><p className="text-muted">Your food arrives hot, fresh, and on time, right at your doorstep in Hyderabad.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Menu Preview Section --- */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold">A Glimpse of Our Menu</h2>
            <p className="text-muted">Explore a few of our most-loved dishes.</p>
          </div>
          <div className="row g-4">
            {menuPreviewItems.map((item, idx) => (
              <div key={idx} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="card text-center h-100 border-0 shadow-sm rounded-4 card-hover">
                  <img src={`/images/${item.img}`} className="card-img-top rounded-top-4" alt={item.name} style={{ height: '200px', objectFit: 'cover' }}/>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{item.name}</h5><p className="text-muted small flex-grow-1">{item.desc}</p><a href="/veg" className="btn btn-outline-warning mt-auto">View Details</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
           <div className="text-center mt-5" data-aos="fade-up"><a href="/veg" className="btn btn-primary btn-lg px-5">Explore Full Menu</a></div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold">What Our Customers Say</h2>
            <p className="text-muted">Real stories from happy food lovers in Hyderabad.</p>
          </div>
          <div className="row g-4 justify-content-center">
              {testimonials.map((item, idx) => (
                <div key={idx} className="col-md-6 col-lg-5" data-aos="fade-up" data-aos-delay={idx * 100}>
                    <div className="card h-100 border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 d-flex flex-column text-center">
                            <img src={item.img} alt={item.author} className="rounded-circle mx-auto mb-3" style={{width: '80px', height: '80px', border: '4px solid #ffc107'}} />
                            <blockquote className="blockquote mb-4 flex-grow-1"><p className="fst-italic">"{item.quote}"</p></blockquote>
                            <footer className="blockquote-footer fw-bold">{item.author}, <cite title="Source Title">{item.location}</cite></footer>
                        </div>
                    </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      
      {/* --- Final Call to Action Section --- */}
      <section className="text-white text-center py-5" style={{ background: 'linear-gradient(45deg, #ffc107, #ff6a00)' }}>
        <div className="container" data-aos="fade-up">
          <h2 className="display-5 fw-bold">Feeling Hungry?</h2>
          <p className="lead my-3">Don't wait! Let us bring the taste of authentic Hyderabadi cuisine to you.</p>
          <a href="/veg" className="btn btn-light btn-lg mt-3 fw-bold px-5 py-3">
              Order Now & Get 10% Off!
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;