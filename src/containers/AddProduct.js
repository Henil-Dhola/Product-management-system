
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/actions/productActions";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    id: Date.now(),
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(addProduct(product));

  const savedProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
  savedProducts.push(product);
  localStorage.setItem("customProducts", JSON.stringify(savedProducts));

  alert("✅ Product added successfully!");
  setProduct({ id: Date.now(), title: "", price: "", category: "", image: "" });
};


  return (
   <div className="ui container" style={{ marginTop: "100px", maxWidth: "600px" }}>
      <div className="ui raised very padded text container segment">
      <h2>Add New Product</h2>
      <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
            />
          </div>

          <div className="field">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="field">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </div>

          <div className="field">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Enter image link"
              required
            />
          </div>

          <button className="ui primary button fluid" type="submit">
            Add Product
          </button>
        </form>
    </div>
    </div>
  );
};

export default AddProduct;
