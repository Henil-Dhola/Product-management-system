import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productActions";

const ProductDetails = () => {
  const product = useSelector((state) => state.product);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProductDetail = async () => {
    const localProducts =
      JSON.parse(localStorage.getItem("customProducts")) || [];
    const localProduct = localProducts.find(
      (item) => String(item.id) === String(productId)
    );

    if (localProduct) {
      dispatch(selectedProduct(localProduct));
    } else {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        dispatch(selectedProduct(response.data));
      } catch (err) {
        console.log("Err: ", err);
      }
    }
  };


  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail();
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  const handleDelete = (id) => {
    let localProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
    localProducts = localProducts.filter((p) => String(p.id) !== String(id));
    localStorage.setItem("customProducts", JSON.stringify(localProducts));
    alert("❌ Product deleted successfully!");
    navigate("/"); 
  };

   const isCustomProduct =
    localStorage.getItem("customProducts") &&
    JSON.parse(localStorage.getItem("customProducts")).some(
      (item) => String(item.id) === String(productId)
    );

  return (
    <div className="ui grid container" style={{ marginTop: "2rem" }}>
      {Object.keys(product).length === 0 ? (
        <div className="ui active centered inline loader"></div>
      ) : (
        <div className="ui raised very padded text container segment">
          <div className="ui two column stackable grid">
            <div className="column lp" style={{ textAlign: "center" }}>
              <img
                className="ui large rounded image"
                src={product.image}
                alt={product.title}
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
            <div className="column rp">
              <h1 className="ui header">{product.title}</h1>
              <h2 className="ui teal tag label" style={{ fontSize: "1.5rem" }}>
                ${product.price}
              </h2>
              <h3 className="ui brown block header">{product.category}</h3>
              <p style={{ marginTop: "1rem" }}>{product.description}</p>
              <button className="ui primary animated button" tabIndex="0">
                <div className="visible content">Add to Cart</div>
                <div className="hidden content">
                  <i className="shopping cart icon"></i>
                </div>
              </button>

              {isCustomProduct && (
                <div style={{ marginTop: "1rem" }}>
                  <button
                    className="ui button yellow"
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="ui button red"
                    onClick={() => handleDelete(product.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
