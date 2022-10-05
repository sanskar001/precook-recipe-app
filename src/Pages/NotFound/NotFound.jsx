import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import logo from "../../Images/Logos/full_logo.svg";
import illustration from "../../Images/Illustrations/illustration5.jpg";
import classes from "./NotFound.module.css";
import AuthContext from "../../components/Context/AuthContextProvider";

const NotFound = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className={classes.not_found_screen}>
      <header>
        <img src={logo} alt="precook logo" />
      </header>
      <main className={classes.content}>
        <img src={illustration} alt="Illustration" />
        <h4>Page not found</h4>
        <p>
          Uh-oh! Looks like the page you are trying to access, doesn't exist.
          Please start afresh.
        </p>
        {!isLoggedIn && (
          <Link to="/">
            <Button className={classes.back_btn}>Back to Welcome Page</Button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/home">
            <Button className={classes.back_btn}>Back to Home Page</Button>
          </Link>
        )}
      </main>
    </div>
  );
};

export default NotFound;
