import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/Signup";
import ViewPage from "./pages/View";
import CreatePage from "./pages/Create";

function App() {
  const { setUser } = useContext(AuthContext);
  const [locUser, setLocUser] = useState();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLocUser(user);
      }
    });
  }, [setUser,locUser]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {locUser ? (
            <Route path="/sell" element={<CreatePage />} />
          ) : (
            <Route path="/sell" element={<PageNotFound />} />
          )}
          <Route path="/view" element={<ViewPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
