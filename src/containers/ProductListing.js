import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setProducts} from '../redux/actions/productActions'; 
import ProductComponent from './ProductComponent';

const ProductListing = () => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();
   const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      dispatch(setProducts(response.data));
    } catch (err) {
      console.log("Err: ", err);
    } finally {
      setLoading(false);
    }
  };

    useEffect(()=>{
        fetchProducts();
    },[]);

      const localProducts =
    JSON.parse(localStorage.getItem("customProducts")) || [];
  const allProducts = [...products, ...localProducts];

    const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

    return (
    <div className="ui container" style={{ marginTop: "5rem" }}>
      <div className="ui icon input" style={{ margin: "20px 0", width: "100%" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="search icon"></i>
      </div>

      <div className="ui grid container">
        {loading ? (
           <div className="ui active centered inline loader"></div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductComponent key={product.id} product={product} />
              ))
            ) : (
          <h3>No products found</h3>
        )}
          </>
        )}
          
      </div>
    </div>
  );
}

export default ProductListing;