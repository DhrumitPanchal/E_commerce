import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loding from "./components/Loder";
import MyContext from "./Redux/Context";
const Navebar = lazy(() => import("./components/Navebar"));
const Footer = lazy(() => import("./components/Footer"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const ProductsPage = lazy(() => import("./Pages/ProductsPage"));
const CartPage = lazy(() => import("./Pages/CartPage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));
const LikedProPage = lazy(() => import("./Pages/LikedProPage"));
const SingleProductPage = lazy(() => import("./Pages/SingleProductPage"));
function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loding />}>
          <MyContext>
            <Navebar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route
                path="/products/:productID"
                element={<SingleProductPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/Likedproducts" element={<LikedProPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </MyContext>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
