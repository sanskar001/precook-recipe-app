import React, { useContext } from "react";
import Button from "../../components/UI/Button";
import logo from "../../Images/Logos/full_logo.svg";
import illustration from "../../Images/Illustrations/illustration2.jpg";
import classes from "./LogoutScreen.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../components/Context/AuthContextProvider";

const LogoutScreen = () => {
  const { userData, clearAccount } = useContext(AuthContext);

  const firstName = userData?.displayName?.split(" ")[0] || "";

  return (
    <div className={classes.logout_screen}>
      <header>
        <Link to="/">
          <img src={logo} alt="precook logo" />
        </Link>
      </header>
      <main>
        <div className={classes.content}>
          <div className={classes.left}>
            <h2>
              Hey,
              <span>{" " + firstName || ""}</span>
            </h2>
            <h3>You have successfully logged out</h3>
            <p>
              Please come back soon and discover some more delicious recipes
              that you can cook loved ones.
            </p>
          </div>
          <div className={classes.right}>
            <img src={illustration} alt="illustration" />
          </div>
        </div>
        <Link to="/">
          <Button className={classes.back_btn} onClick={clearAccount}>
            Back to Welcome Page
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default LogoutScreen;
