import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { FacilitesReducer } from "./facility.reducer";
import { productsReducer } from "./products.reducer";
import { shopReducer } from "./shop.reducer";
import { reviewReducer } from "./reviews.reducer";
import counterSlice from "../slice/counter.slice";
import cartSlice from "../slice/cart.slice";
import couponSlice from "../slice/coupon.slice";
import { categoryReducer } from "./category.reducer";
import subcategorySlice from "../slice/subcategory.slice";
import { variantReducer } from "./variants.reducer";
import salespeopleSlice from "../slice/salespeople.slice";
import authSlice from "../slice/auth.slice";
import alertSlice from "../slice/alert.slice";
// import { salespeopleReducer } from "./salespeople.reducer";
// import { SalespeopleReducer } from "./salespeople.reducer";



export const rootReducer = combineReducers({
    counter: counterReducer,
    facilites: FacilitesReducer,
    products: productsReducer,
    shop: shopReducer,
    review: reviewReducer,
    counter_slice: counterSlice,
    cart: cartSlice,
    coupon: couponSlice,
    couponInCart: couponSlice,
    categories: categoryReducer,
    subcategories: subcategorySlice,
    variant: variantReducer,
    // salespeople: salespeopleReducer,
    salespeople: salespeopleSlice,
    auth: authSlice,
    alert: alertSlice
})



