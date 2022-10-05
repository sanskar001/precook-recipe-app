import React, { useContext, useState } from "react";
import Button from "../../components/UI/Button";
import logo from "../../Images/Logos/full_logo.svg";
import ChangePassword from "./ChangePassword";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import AuthContext from "../../components/Context/AuthContextProvider";
import { ClipLoader } from "react-spinners";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const uploadImageHandler = async (event) => {
    if (event.target.files.length > 0) {
      // 1) Start loading
      setIsLoading(true);

      // 2) Call upload image method
      await authCtx.uploadProfileImage(event.target.files[0]);

      // 3) At last stop loading
      setIsLoading(false);
    }
  };

  const uploadImagePath = authCtx.userData?.photoURL;

  return (
    <React.Fragment>
      <div className={classes.user_profile}>
        <header>
          <Link to="/home">
            <img src={logo} alt="precook logo" />
          </Link>
        </header>
        <main>
          <div className={classes.upload_image}>
            {isLoading && (
              <div className={classes.loading}>
                <ClipLoader color="#fff" />
              </div>
            )}
            {uploadImagePath && (
              <img src={uploadImagePath} alt={authCtx.userData?.displayName} />
            )}
            <label htmlFor="user_image">+</label>
            <input
              type="file"
              id="user_image"
              accept="image/*"
              onChange={uploadImageHandler}
            />
          </div>
          <div className={classes.user_info}>
            <h3>{authCtx.userData.displayName}</h3>
            <p>{authCtx.userData.email}</p>
          </div>
          <ChangePassword />
          <Button className={classes.logout_btn} onClick={authCtx.logout}>
            Logout
          </Button>
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default UserProfile;
