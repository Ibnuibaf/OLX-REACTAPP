import React, { useContext } from "react";

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/Context";

import OlxLogo from "../assets/OlxLogo";
import Search from "../assets/Search";
import Arrow from "../assets/Arrow";
import SellButton from "../assets/SellButton";
import SellButtonPlus from "../assets/SellButtonPlus";

function Header() {
  const direct = useNavigate();

  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      window.location.href='/login'
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage mr-5">
          {user ? (
            <span>Welcome {user.displayName}</span>
          ) : (
            <span
              onClick={() => direct("/login")}
              style={{ cursor: "pointer" }}
            >
              Login
            </span>
          )}
          <hr />
        </div>
        {user && (
          <button className="text-danger" onClick={handleLogout}>
            Logout
          </button>
        )}

        {user && (
          <a href="/sell">
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}

export default Header;
