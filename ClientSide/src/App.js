import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Loading from "./components/Loading";
import MyContext from "./Redux/Context";
import { Toaster } from "react-hot-toast";
const Navbar = lazy(() => import("./components/Navbar"));
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
const AdminPage = lazy(() => import("./Pages/AdminPages/AdminPage"));
const AdminLogin = lazy(() => import("./Pages/AdminPages/AdminLogin"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <MyContext>
            <Toaster />
            <Navbar />
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

              <Route path="/admin">
                <Route path="" element={<AdminLogin />} />
                <Route path="order" element={<AdminPage Path={"order"} />} />
                <Route
                  path="products"
                  element={<AdminPage Path={"products"} />}
                />
                <Route
                  path="products/add"
                  element={<AdminPage Path={"AddProducts"} />}
                />
                <Route
                  path="products/update/:id"
                  element={<AdminPage Path={"AddProducts"} />}
                />
                <Route path="user" element={<AdminPage Path={"user"} />} />
                <Route path="graphs" element={<AdminPage Path={"graphs"} />} />
              </Route>
            </Routes>

            <Footer />
          </MyContext>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
