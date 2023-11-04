import React, { useEffect } from "react";
import styles from "../styles/profile.module.css";
import { Box, Spinner } from "@chakra-ui/react";
import EditModal from "../components/EditModal";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/action";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let { profile, isLoading } = useSelector((state) => state);
  let token = JSON.parse(localStorage.getItem("guvitoken")) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("guvitoken");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getProfile(token)).then((res) => {
      if (res?.payload?.response?.status) {
        navigate("/login", { state: 401 });
      }
    });
  }, []);

  return (
    <Box className={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box className={styles.card}>
          <Box className={styles.image}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/512px-Circle-icons-profile.svg.png?20160314153816"
              alt="profile_logo"
            />
            <p className={styles.name}>{profile?.name}</p>
            <p className={styles.email}>{profile?.email}</p>
            <Box className={styles.editBox}>
              <EditModal profile={profile} />
            </Box>
          </Box>
          <Box className={styles.info}>
            <p>{`User ID - ${profile?.userId}`}</p>
            <p>
              {"Gender -"}{" "}
              <span>{profile?.gender ? profile?.gender : "N/A"}</span>
            </p>
            <p>
              {"Age -"}
              <span>{profile?.age ? profile?.age : "N/A"}</span>
            </p>
            <p>
              {"Mobile -"}
              <span>{profile?.mob ? profile?.mob : "N/A"}</span>
            </p>
            <p>
              {"Address -"}
              <span>{profile?.address ? profile?.address : "N/A"}</span>
            </p>
          </Box>
          <Box className={styles.btn}>
            <button onClick={handleLogout}>Logout</button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
