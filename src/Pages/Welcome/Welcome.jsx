import React, { useRef, useState } from "react";
import classes from "./Welcome.module.css";
import logo from "../../Images/Logos/light_logo.svg";
import tag_line from "../../Images/Logos/tag_line.svg";
import Button from "../../components/UI/Button";
import AuthFormModal from "../../components/AuthFormModal/AuthFormModal";
import { Link } from "react-router-dom";

const Welcome = () => {
  const isLogin = useRef(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const showLoginModalHandler = () => {
    setShowAuthModal(true);
    isLogin.current = true;
  };

  const showSignUpModalHandler = () => {
    setShowAuthModal(true);
    isLogin.current = false;
  };

  const closeModalHandler = () => {
    setShowAuthModal(false);
  };

  return (
    <React.Fragment>
      {showAuthModal && (
        <AuthFormModal isLogin={isLogin.current} onClose={closeModalHandler} />
      )}
      <div className={classes.welcome}>
        <header>
          <Link to="/">
            <img src={logo} alt="precook logo" />
          </Link>
          <nav>
            <Button onClick={showLoginModalHandler}>Login</Button>
            <Button onClick={showSignUpModalHandler}>Sign Up</Button>
          </nav>
        </header>
        <main>
          <div className={classes.content}>
            <img src={tag_line} alt="Tag line" />
            <h1>Cooking a delecious food easily</h1>
            <p>
              Discover more than 1000+ beautifaul and delecious recipes in your
              hands and cooking it easily.
            </p>
            <div className={classes.actions}>
              <Button
                className={classes.login_btn}
                onClick={showLoginModalHandler}
              >
                Login
              </Button>
              <Button
                className={classes.signup_btn}
                onClick={showSignUpModalHandler}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Welcome;
