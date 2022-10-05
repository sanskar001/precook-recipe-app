import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import AuthForm from "./AuthForm";
import Button from "../UI/Button";
import { IoClose } from "react-icons/io5";
import google_icon from "../../Images/Icons/google-icon.svg";
import classes from "./AuthFormModal.module.css";
import AuthContext from "../Context/AuthContextProvider";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const Modal = (props) => {
  const [isLogin, setIsLogin] = useState(props.isLoginState);

  const authCtx = useContext(AuthContext);

  const toggleBtnClickHandler = () => {
    setIsLogin((preIsLogin) => !preIsLogin);
  };

  return (
    <div className={classes.modal}>
      <header>
        <h3>{isLogin ? "Login" : "Sign Up"}</h3>
        <Button className={classes.close_btn} onClick={props.onClose}>
          <IoClose />
        </Button>
      </header>
      <AuthForm isLogin={isLogin} onCloseModal={props.onClose} />
      <footer>
        <div className={classes.separator}>
          <span></span>
          <span>or</span>
          <span></span>
        </div>
        <button
          className={classes.google_btn}
          onClick={authCtx.signInWithGoogle}
        >
          <img src={google_icon} alt="google icon" />
          <span>Continue with Google</span>
        </button>
        <p>
          {isLogin ? "New to PreCook? " : "Already have an account? "}
          <Button
            onClick={toggleBtnClickHandler}
            className={classes.toggle_btn}
          >
            {!isLogin ? "Login" : "Create account"}
          </Button>
        </p>
      </footer>
    </div>
  );
};

const AuthFormModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <Modal isLoginState={props.isLogin} onClose={props.onClose} />,
        document.getElementById("overlay")
      )}
    </React.Fragment>
  );
};

export default AuthFormModal;
