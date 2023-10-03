import React, { useContext, useState } from "react";
import "./Components.css";
import Header from "./Header";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { AuthContext } from "../store/Context";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [prdDetails, setPrdDetails] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [prdImage, setPrdImage] = useState(null);

  const { user } = useContext(AuthContext);

  const direct = useNavigate();

  const HandleImageChange = (e) => {
    const file = e.target.files[0];
    setPrdImage(file);
  };

  const HandleSubmit = () => {
    const storage = getStorage();
    const storageRef = ref(storage, "image/" + prdImage.name);
    const date = new Date();

    uploadBytes(storageRef, prdImage)
      .then((snapshot) => {
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            const db = getFirestore();
            console.log(downloadURL);
            addDoc(collection(db, "products"), {
              name: prdDetails.name,
              category: prdDetails.category,
              price: prdDetails.price,
              image: downloadURL,
              date: date.toDateString(),
              userId: user.uid,
            });
            direct("/");
          })
          .catch((error) => {
            console.error("Error getting download URL: ", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  };

  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={prdDetails.name}
              onChange={(e) =>
                setPrdDetails({ ...prdDetails, name: e.target.value })
              }
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={prdDetails.category}
              onChange={(e) =>
                setPrdDetails({ ...prdDetails, category: e.target.value })
              }
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={prdDetails.price}
              onChange={(e) =>
                setPrdDetails({ ...prdDetails, price: e.target.value })
              }
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={prdImage?URL.createObjectURL(prdImage):''}></img>
          <form>
            <br />
            <input type="file" onChange={HandleImageChange} />
            <br />
            <button className="uploadBtn" type="button" onClick={HandleSubmit}>upload and Submit</button>
          </form>
        </div>
      </card>
    </>
  );
};

export default Create;
