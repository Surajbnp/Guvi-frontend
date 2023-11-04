import React from "react";
import styles from "../styles/profile.module.css";
import { Box } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";

const Profile = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.card}>
        <Box className={styles.image}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/512px-Circle-icons-profile.svg.png?20160314153816"
            alt="profile_logo"
          />
          <p className={styles.name}>Suraj Kumar gupta</p>
          <p className={styles.email}>surajguptabnp14c@gmail.com</p>
          <Box className={styles.editBox}>
            <Box>
              <button>edit</button>
              <AiOutlineEdit size={"20px"} />
            </Box>
          </Box>
        </Box>
        <Box className={styles.info}>
          <p>User ID : 359589555556</p>
          <p>Gender : Male</p>
          <p>Age : 21</p>
          <p>Mobile : 9234851174</p>
          <p>Address : Bhawnathpur</p>
        </Box>
        <Box className={styles.btn}>
          <button>Logout</button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
