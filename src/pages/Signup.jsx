import { Box, Text, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { signup } from "../redux/action";

const Signup = () => {
  const { isLoading } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirm] = useState("");
  const [showPass, setShow] = useState(false);
  const [matchedPass, setMatched] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPass) {
      setMatched(true);
      const payload = {
        name,
        email,
        password,
      };

      dispatch(signup(payload)).then((res) => {
        console.log(res);
        if (res.type === "SIGNUP_SUCCESS") {
          toast.success("Signup Success!");
          // redirecting user to login page after signup in 3 sec
          setTimeout(() => navigate("/login"), 3000);
        } else if (res?.payload?.response?.status === 403) {
          toast.error(res?.payload?.response?.data?.msg);
        } else {
          toast.error("something went wrong!");
        }
      });
    } else {
      setMatched(false);
      return;
    }
  };

  const handleShow = () => {
    if (showPass) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <Box>
      <Box className={styles.container}>
        <Box className={styles.loginCard}>
          <Text className={styles.heading}>Create your account</Text>
          <form onSubmit={handleSubmit}>
            <Box className={styles.inputs}>
              <label>Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box className={styles.inputs}>
              <label>Email</label>
              <input
                required
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setMail(e.target.value)}
              />
            </Box>
            <Box className={styles.inputs}>
              <label>Password</label>
              <Box>
                <input
                  required
                  type={showPass ? "text" : "password"}
                  placeholder="Confirm password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Box className={styles.eye} onClick={handleShow}>
                  {showPass ? <AiFillEye /> : <AiOutlineEyeInvisible />}
                </Box>
              </Box>
            </Box>
            <Box className={styles.inputs}>
              <label>Confirm Password</label>
              <input
                required
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) => setConfirm(e.target.value)}
              />
              <p className={matchedPass ? styles.notErr : styles.error}>
                password is not same
              </p>
            </Box>
            <button className={styles.submitBtn} type="submit">
              {isLoading ? <Spinner /> : "Create Account"}
            </button>
            <Toaster position="top-center" reverseOrder={false} />
          </form>

          <Text fontSize={{ base: "12px", md: "14px" }} mt={5} fontWeight={600}>
            Allready have account? <a href="/login">Login</a>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
