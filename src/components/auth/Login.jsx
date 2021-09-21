import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { postLogin } from "../../store/asyncMethods/AuthMethods";
import "../../main.css";
function Login() {
  const dispatch = useDispatch();
  const { loginErrors, loading } = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const userLogin = (e) => {
    e.preventDefault();
    dispatch(postLogin(state));
  };

  useEffect(() => {
    if (loginErrors.length > 0) {
      loginErrors.map((error) => {
        toast.error(error.msg);
      });
    }
  }, [loginErrors]);
  return (
    <>
      <Helmet>
        <title>User Login</title>
        <meta name="description" content="User Login Page" />
      </Helmet>
      <div className="mainContainer">
        <div className="loginLeft"></div>
        <div className="right">
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                fontSize: 14,
              },
            }}
          />
          <form onSubmit={userLogin}>
            <h1>Login</h1>
            <motion.input
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, type: "tween" }}
              type="email"
              name="email"
              id="email"
              value={state.email}
              onChange={handleInput}
              placeholder="Enter Your Email"
              className="inp"
            />
            <motion.input
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, type: "tween" }}
              type="password"
              name="password"
              id="password"
              value={state.password}
              onChange={handleInput}
              placeholder="Create Password"
              className="inp"
            />
            <button className="btn1">{loading ? "..." : "Login"}</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
