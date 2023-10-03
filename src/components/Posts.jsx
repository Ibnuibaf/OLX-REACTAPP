import React, { useContext, useEffect, useState } from "react";

import Heart from "../assets/Heart";
import "./Components.css";

import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { PostContext } from "../store/PostContext";

function Posts() {
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(true)
  const db = getFirestore();
  const prdCollection = collection(db, "products");
  const { setProductDetails } = useContext(PostContext);
  const direct = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const querySnapshot = await getDocs(prdCollection);

        const dataArray = [];
        querySnapshot.forEach((doc) => {
          dataArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setProducts(dataArray);
        setLoading(false)
        // console.log(dataArray);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    getProducts();
  }, [prdCollection]);

  const setProductView = (product) => {
    setProductDetails(product);
    direct("/view");
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {loading? <p className="fs-3">Products Are Loading...</p> : (
            products.length > 0 ? (
              products.map((product) => (
                <div
                  className="card"
                  id={product.id}
                  onClick={() => setProductView(product)}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.image} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )
          )  }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.length > 0 && (
            <div
              className="card"
              id={products[0].id}
              onClick={() => setProductView(products[0])}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={products[0].image} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {products[0].price}</p>
                <span className="kilometer">{products[0].category}</span>
                <p className="name"> {products[0].name}</p>
              </div>
              <div className="date">
                <span>{products[0].date}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
