import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

function Layout() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isStatus, setIsStatus] = useState(false);

  useEffect(() => {
    setIsStatus(!isStatus);
  }, [isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        {!isLoggedIn ? (
          <Routes>
            <Route exact path="/" element={<Login />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default Layout;
