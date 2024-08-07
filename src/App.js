import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import CartPage from "./Pages/CartPage";
import AllJewellery from "./Pages/AllJewellery";
import Stores from "./Pages/Stores";
import DailyWear from "./Pages/DailyWear";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermAndCondition from "./Pages/TermAndCondition";
import ScrollToTop from "./Components/ScrollTo";
import RefundPolicy from "./Pages/RefundPolicy";
import AboutUs from "./Pages/AboutUs";
import Collections from "./Pages/Collections";
import CollectionProduct from "./Pages/CollectionProduct";
import WishList from "./Pages/WishList";
import CheckoutPage from "./Pages/CheckoutPage";
import Categories from "./Pages/Categories";
import TagProducts from "./Pages/TagProducts";
import NotFoundPage from "./Pages/NotFoundPage";
import Dashboard from "./Pages/Dashboard";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import NotAuthenticatedPage from "./Pages/NotAuthenticatedPage";
import PrivateRoute from "./helper/PrivateRoute";
import SearchPage from "./Pages/SearchPage";
import SpinWheelPage from "./Pages/SpinWheelPage";
import OrderDetails from "./Pages/OrderDetails";
import BlogPage from "./Pages/Blog";
import BlogDetailPage from "./Pages/BlogDetailPage";
import FAQPage from "./Pages/FAQ";
import GoldInvestment from "./Pages/GoldInvestmet";
import SingleProduct from "./Pages/SingleProduct";
import CouponClaim from "./Pages/CouponClaim";

const App = () => {
  const location = useLocation();
  const isSpinWheelPage = location.pathname === "/spin-wheel";

  return (
    <div className="h-full w-full">
      <ScrollToTop />
      {!isSpinWheelPage && <Header />}
      <Routes>
        {/* All routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermAndCondition />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/dailywear" element={<DailyWear />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/products" element={<AllJewellery />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/collections" element={<Collections />} />
        <Route
          path="/collections/:collectionId"
          element={<CollectionProduct />}
        />
        <Route path="/sub-category/:categoryId" element={<Categories />} />
        <Route path="/Tag/:tagName" element={<TagProducts />} />
        <Route path="/not-auth" element={<NotAuthenticatedPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/spin-wheel" element={<SpinWheelPage />} />
        <Route path="/order/:transactionId" element={<OrderDetails />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/gold-investment" element={<GoldInvestment />} />
        <Route path="/coupon-claim" element={<CouponClaim />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRoute element={<CheckoutPage />} />}
        />
        <Route
          path="/order-success"
          element={<PrivateRoute element={<OrderSuccessPage />} />}
        />

        {/* Catch-all route 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isSpinWheelPage && <Footer />}
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
