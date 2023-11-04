import { Box, Text, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../redux/action";

const Login = () => {
  const { isLoading } = useSelector((state) => state);
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      email,
      password,
    };

    dispatch(login(payload)).then((res) => {
      if (res.type === "LOGIN_SUCCESS") {
        let token = res.payload.token.refreshToken;
        saveToken(token)
        toast.success("Login Success!");
        setTimeout(() => navigate("/profile"), 1000);
      } else if (res?.payload?.response?.status === 401) {
        toast.error(res?.payload?.response?.data?.msg);
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  const handleShow = () => {
    if (showPass) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const saveToken = (token) => {
    if (token) {
      localStorage.setItem("guvitoken", JSON.stringify(token));
    }
  };

  return (
    <Box>
      <Box className={styles.container}>
        <Box className={styles.loginCard}>
          <Text className={styles.heading}>Login to your account</Text>
          <form onSubmit={handleSubmit}>
            <Box className={styles.inputs}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setMail(e.target.value)}
              />
            </Box>
            <Box className={styles.inputs}>
              <label>Password</label>
              <Box>
                <input
                  required
                  type={showPass ? "text" : "password"}
                  placeholder="enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Box className={styles.eye} onClick={handleShow}>
                  {showPass ? <AiFillEye /> : <AiOutlineEyeInvisible />}
                </Box>
              </Box>
            </Box>
            <button className={styles.submitBtn} type="submit">
              {isLoading ? <Spinner /> : "Login"}
            </button>
            <Toaster position="top-center" reverseOrder={false} />
          </form>

          <Box fontSize={{ base: "12px", md: "14px" }}>
            <Text mt={5} fontWeight={600}>
              Don't have account? <a href="/signup">Create Account</a>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
