import React, { useContext } from "react";
import { Link } from "react-router-dom";
import account_icon from "../../Images/Icons/account-icon.svg";
import AuthContext from "../Context/AuthContextProvider";
import classes from "./UserButton.module.css";

const UserButton = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.user_btn}>
      <Link to="/account">
        <div>
          <img
            src={authCtx.userData?.photoURL || account_icon}
            alt={authCtx.userData?.displayName || authCtx.userData?.email}
            referrerPolicy="no-referrer"
            className={classes.user_img}
          />
        </div>
      </Link>
      <ul className={classes.dropdown_container}>
        <Link to="/account">
          <li>User Profile</li>
        </Link>
        <li onClick={authCtx.logout}>Logout</li>
      </ul>
    </div>
  );
};

export default UserButton;
