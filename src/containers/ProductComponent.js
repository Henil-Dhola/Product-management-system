import React from "react";
import { Link } from "react-router-dom";

const ProductComponent = ({ product }) => {
  const { id, title, price, category, image } = product;

  return (
    <div className="four wide column" key={id}>
      <Link to={`/product/${id}`}>
        <div className="ui link cards">
          <div className="card">
            <div
              className="image"
              style={{
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <img
                src={image}
                alt={title}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="content">
              <div
                className="header product-title"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </div>
              <div className="meta price">${price}</div>
              <div className="meta">{category}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductComponent;
