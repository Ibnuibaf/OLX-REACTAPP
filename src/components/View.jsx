import React, { useContext, useEffect, useState } from "react";

import "./Components.css";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { PostContext } from "../store/PostContext";

function View() {
  const [seller, setSeller] = useState();
  const [loading, setLoading] = useState(true);
  const { productDetails } = useContext(PostContext);

  const sellerId = productDetails?.userId;
  const db = getFirestore();
  // const collection = "users";

  useEffect(() => {
    const getFiltered = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("uid", "==", sellerId))
        );

        querySnapshot.forEach((doc) => {
          const sellerData = doc.data();
          setLoading(false);
          setSeller(sellerData);
        });
      } catch (error) {
        console.error("Error getting filtered documents:", error);
      }
    };
    getFiltered();
  }, [sellerId,db]);

  return (
    <>
      {loading ? (
        <div>
          <h1>loading...</h1>
        </div>
      ) : (
        <div className="viewParentDiv">
          <div className="imageShowDiv">
            <img src={productDetails.image} alt="" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9; {productDetails.price} </p>
              <span>{productDetails.name}</span>
              <p>{productDetails.category}</p>
              <span>{productDetails.date}</span>
            </div>
            <div className="contactDetails">
              <p>Seller details</p>
              <p>{seller?.displayName}</p>
              <p>{seller?.phone}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default View;
