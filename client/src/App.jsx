import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivateRouter from "./components/PrivateRouter";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Carts from "./pages/Carts";
import CreateProduct from "./pages/Create-Products";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route element={<PrivateRouter />}>
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/carts" element={<Carts />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
