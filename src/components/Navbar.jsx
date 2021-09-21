import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../main.css";

function Navbar() {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };
  const Links = user ? (
    <div className="navbarRight">
      <li>
        <Link className="link" to="/create">
          Create a Post
        </Link>
      </li>
      <li>
        <Link className="link" to="/dashboard">
          {user.name}
        </Link>
      </li>
      <li onClick={logout}>
        <Link className="link" to="/logout">
          Logout
        </Link>
      </li>
    </div>
  ) : (
    <div className="navbarRight">
      <li>
        <Link className="link" to="/login">
          Login
        </Link>
      </li>
      <li>
        <Link className="link" to="/register">
          Register
        </Link>
      </li>
    </div>
  );
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbarRow">
          <div className="navbarLeft">
            <Link className="link" to="/">
              <h2>BLOGGO</h2>
            </Link>
          </div>
          {Links}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
