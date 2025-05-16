import { configureStore, createSlice } from "@reduxjs/toolkit";



// Products Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    veg:[
      { name: "Paneer Butter Masala", price: 220, image: '/images/paneer-butter-masala.avif' },
      { name: "Veg Biryani", price: 180, image: '/images/veg-biryani.jpg' },
      { name: "Chana Masala", price: 160, image: '/images/Channa-Masala.avif' },
      { name: "Vegetable Samosa", price: 60, image: '/images/Vegetable-Samosa.avif' },
      { name: "Aloo Gobi", price: 150, image: '/images/Aloo-Gobi.jpg' },
      { name: "Dal Tadka", price: 140, image: '/images/Dal-Tadka.avif' },
      { name: "Palak Paneer", price: 210, image: '/images/Palak Paneer.jpg' },
      { name: "Mixed Veg Curry", price: 180, image: '/images/Mixed-Veg-Curry.avif' },
      { name: "Masala Dosa", price: 130, image: '/images/Masala-Dosa.jpg' },
      { name: "Veg Fried Rice", price: 160, image: '/images/Veg-Fried-Rice.avif' },
      { name: "Paneer Butter Masala", price: 220, image: '/images/paneer-butter-masala.avif' },
      { name: "Veg Biryani", price: 180, image: '/images/veg-biryani.jpg' },
      { name: "Chana Masala", price: 160, image: '/images/Channa-Masala.avif' },
      { name: "Vegetable Samosa", price: 60, image: '/images/Vegetable-Samosa.avif' },
      { name: "Aloo Gobi", price: 150, image: '/images/Aloo-Gobi.jpg' },
      { name: "Dal Tadka", price: 140, image: '/images/Dal-Tadka.avif' },
      { name: "Palak Paneer", price: 210, image: '/images/Palak Paneer.jpg' },
      { name: "Mixed Veg Curry", price: 180, image: '/images/Mixed-Veg-Curry.avif' },
      { name: "Masala Dosa", price: 130, image: '/images/Masala-Dosa.jpg' },
      { name: "Veg Fried Rice", price: 160, image: '/images/Veg-Fried-Rice.avif' },
    ],
    nonVeg:[
      { name: "Chicken Biryani", price: 220, image: '/images/Chicken-Biryani.avif' },
      { name: "Butter Chicken", price: 250, image: '/images/Butter-Chicken.avif' },
      { name: "Mutton Rogan Josh", price: 320, image: '/images/Mutton-Rogan-Josh.jpg' },
      { name: "Fish Curry", price: 260, image: '/images/Fish-Curry.avif' },
      { name: "Egg Curry", price: 130, image: '/images/Egg-Curry.avif' },
      { name: "Chicken 65", price: 180, image: '/images/Chicken-65.jpg' },
      { name: "Prawn Masala", price: 300, image: '/images/Prawn-Masala.avif' },
      { name: "Chicken Tikka", price: 200, image: '/images/Chicken-Tikka.jpg' },
      { name: "Keema Pav", price: 150, image: '/images/Keema-Pav.jpg' },
      { name: "Tandoori Chicken", price: 240, image: '/images/Tandoori-Chicken.avif' },
      { name: "Chicken Biryani", price: 220, image: '/images/Chicken-Biryani.avif' },
      { name: "Butter Chicken", price: 250, image: '/images/Butter-Chicken.avif' },
      { name: "Mutton Rogan Josh", price: 320, image: '/images/Mutton-Rogan-Josh.jpg' },
      { name: "Fish Curry", price: 260, image: '/images/Fish-Curry.avif' },
      { name: "Egg Curry", price: 130, image: '/images/Egg-Curry.avif' },
      { name: "Chicken 65", price: 180, image: '/images/Chicken-65.jpg' },
      { name: "Prawn Masala", price: 300, image: '/images/Prawn-Masala.avif' },
      { name: "Chicken Tikka", price: 200, image: '/images/Chicken-Tikka.jpg' },
      { name: "Keema Pav", price: 150, image: '/images/Keema-Pav.jpg' },
      { name: "Tandoori Chicken", price: 240, image: '/images/Tandoori-Chicken.avif' },
    ],
    drinks:[
      { name: "Apple Juice", price: 70, image: '/images/apple.jpg' },
      { name: "Banana Juice", price: 50, image: '/images/banana.jpg' },
      { name: "Cucumber Juice", price: 60, image: '/images/Cucumber-Cooler.avif' },
      { name: "Grape Juice", price: 45, image: '/images/grape.jpg' },
      { name: "Kiwi", price: 65, image: '/images/kiwi.jpg' },
      { name: "Lemon Juice", price: 30, image: '/images/leamon.jpg' },
      { name: "Orange Juice", price: 35, image: '/images/orange.avif' },
      { name: "Pineapple Juice", price: 69, image: '/images/pineapple.jpg' },
      { name: "Pomegranate Juice", price: 40, image: '/images/promogranate.jpg' },
      { name: "Watermelon Juice", price: 25, image: '/images/watermelon.avif' },
      { name: "Apple Juice", price: 70, image: '/images/apple.jpg' },
      { name: "Banana Juice", price: 50, image: '/images/banana.jpg' },
      { name: "Cucumber Juice", price: 60, image: '/images/Cucumber-Cooler.avif' },
      { name: "Grape Juice", price: 45, image: '/images/grape.jpg' },
      { name: "Kiwi", price: 65, image: '/images/kiwi.jpg' },
      { name: "Lemon Juice", price: 30, image: '/images/leamon.jpg' },
      { name: "Orange Juice", price: 35, image: '/images/orange.avif' },
      { name: "Pineapple Juice", price: 69, image: '/images/pineapple.jpg' },
      { name: "Pomegranate Juice", price: 40, image: '/images/promogranate.jpg' },
      { name: "Watermelon Juice", price: 25, image: '/images/watermelon.avif' },
    ],
    snacks:[
      { name: "Cheese Balls", price: 80, image: '/snacks/Cheese Balls.jpg' },
      { name: "Chicken Popcorn", price: 120, image: '/snacks/Chicken Popcorn.avif' },
      { name: "Dhokla", price: 130, image: '/snacks/Dhokla.jpg' },
      { name: "French Fries", price: 160, image: '/snacks/French Fries.avif' },
      { name: "Masala Corn", price: 85, image: '/snacks/Masala Corn.avif' },
      { name: "Nachos", price: 99, image: '/snacks/Nachos.avif' },
      { name: "Pav Bhaji", price: 45, image: '/snacks/Pav Bhaji.jpg' },
      { name: "Spring Rolls", price: 75, image: '/snacks/Spring Rolls.avif' },
      { name: "Vada Pav", price: 65, image: '/snacks/Vada Pav.jpg' },
      { name: "Veg Manchurian", price: 120, image: '/snacks/Veg Manchurian.avif' },
      { name: "Cheese Balls", price: 80, image: '/snacks/Cheese Balls.jpg' },
      { name: "Chicken Popcorn", price: 120, image: '/snacks/Chicken Popcorn.avif' },
      { name: "Dhokla", price: 130, image: '/snacks/Dhokla.jpg' },
      { name: "French Fries", price: 160, image: '/snacks/French Fries.avif' },
      { name: "Masala Corn", price: 85, image: '/snacks/Masala Corn.avif' },
      { name: "Nachos", price: 99, image: '/snacks/Nachos.avif' },
      { name: "Pav Bhaji", price: 45, image: '/snacks/Pav Bhaji.jpg' },
      { name: "Spring Rolls", price: 75, image: '/snacks/Spring Rolls.avif' },
      { name: "Vada Pav", price: 65, image: '/snacks/Vada Pav.jpg' },
      { name: "Veg Manchurian", price: 120, image: '/snacks/Veg Manchurian.avif' },
    ]
  },
  reducers: {}
});

// Cart Slice
const localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");

const cartSlice = createSlice({
  name: "cart",
  initialState: localStorageCart,
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementItem: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) item.quantity += 1;
    },
    decrementItem: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.name !== action.payload.name);
    },
    clearCart: () => []
  }
});

// Orders Slice
const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    orderDetails: (state, action) => {
      state.push(action.payload);
    }
  }
});

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isAuthenticated: false,
    currentUser: null
  },
  reducers: {
    registerUser: (state, action) => {
      const exists = state.users.find(u => u.userName === action.payload.userName);
      if (!exists) {
        state.users.push(action.payload);
      }
    },
    loginUser: (state, action) => {
      const { userName, password } = action.payload;
      const foundUser = state.users.find(
        user => user.userName === userName && user.password === password
      );
      if (foundUser) {
        state.isAuthenticated = true;
        state.currentUser = foundUser;
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    }
  }
});

export const {
  addToCart, removeFromCart, incrementItem, decrementItem, clearCart
} = cartSlice.actions;

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export const { orderDetails } = orderSlice.actions;

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
    user: userSlice.reducer,
  }
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
