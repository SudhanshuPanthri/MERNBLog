import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { postRegsiter } from "../../store/asyncMethods/AuthMethods";
import "../../main.css";
function Register(props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, registerErrors, user } = useSelector(
    (state) => state.AuthReducer
  );
  const dispatch = useDispatch();
  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const userRegistration = async (e) => {
    e.preventDefault();
    dispatch(postRegsiter(state));
  };

  useEffect(() => {
    if (registerErrors.length > 0) {
      registerErrors.map((error) => toast.error(error.msg));
    }
  }, [registerErrors, user]);
  return (
    <>
      <Helmet>
        <title>User Registration</title>
        <meta name="description" content="User Registration Page" />
      </Helmet>
      <div className="mainContainer">
        <div className="left"></div>
        <div className="right">
          <h1>Register</h1>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                fontSize: 14,
              },
            }}
          />
          <form onSubmit={userRegistration}>
            <motion.input
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, type: "tween" }}
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              className="inp"
              value={state.name}
              onChange={handleInputs}
            />
            <motion.input
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, type: "tween" }}
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className="inp"
              value={state.email}
              onChange={handleInputs}
            />
            <motion.input
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, type: "tween" }}
              type="password"
              name="password"
              id="password"
              placeholder="Create Password"
              className="inp"
              value={state.password}
              onChange={handleInputs}
            />
            <button className="btn">{loading ? "..." : "Register"}</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
