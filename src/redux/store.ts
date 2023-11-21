import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/product-slice';
import blogsReducer from './blogs/blogSlice';
import videosReducer from './videos/videoSlice';
import faqsReducer from './faqs/faqSlice';
import categoryReducer from './category/categorySlice';
import addBannerReducer from './add-banner/addBannerSlice';
import subscriberReducer from './subscribe/subscribeSlice';
import pageReducer from './pages/pageSlice';
import settingsReducer from './settings/settingSlice';
import authReducer from './auth/authSlice';
import emiReducer from './emi/emiSlice';
import orderReducer from './order/orderSlice';
import customerReducer from './customer/customerSlice';
import serviceReducer from './service/keypointSlice';
// ...
const store = configureStore({
  reducer: {
    product: productReducer,
    blogs: blogsReducer,
    videos: videosReducer,
    faqs: faqsReducer,
    category: categoryReducer,
    banner: addBannerReducer,
    subscribers: subscriberReducer,
    pages: pageReducer,
    settings: settingsReducer,
    auth: authReducer,
    emi: emiReducer,
    order: orderReducer,
    customer: customerReducer,
    services: serviceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
