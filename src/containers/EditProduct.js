import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
    const foundProduct = localProducts.find((p) => String(p.id) === String(productId));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let localProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
    localProducts = localProducts.map((p) =>
      String(p.id) === String(productId) ? product : p
    );
    localStorage.setItem("customProducts", JSON.stringify(localProducts));
    alert("✏️ Product updated successfully!");
    navigate("/");
  };

  return (
    <div className="ui container" style={{ marginTop: "5rem" }}>
      <h2>Edit Product</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input name="title" value={product.title} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Price</label>
          <input name="price" value={product.price} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" value={product.category} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Image URL</label>
          <input name="image" value={product.image} onChange={handleChange} />
        </div>
        <button className="ui button primary" type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
