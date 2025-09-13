import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui fixed menu">
      <div className="ui container center" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Fake Shop
          </Link>
        </h2>

        <div>
          <Link to="/add-product" className="ui button primary">
            ➕ Add Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
