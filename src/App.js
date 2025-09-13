import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./containers/Header";
import ProductDetails from "./containers/ProductDetail";
import ProductListing from "./containers/ProductListing";
import NotFound from "./containers/NotFound";
import AddProduct from "./containers/AddProduct";
import EditProduct from "./containers/EditProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<ProductListing/>}></Route>
          <Route path="/product/:productId" exact element={<ProductDetails/>}></Route>
          <Route path="/add-product" exact element={<AddProduct/>}></Route>
          <Route path="/edit-product/:productId" element={<EditProduct/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
