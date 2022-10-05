import React, { useContext } from "react";
import AuthContext from "../../components/Context/AuthContextProvider";
import illustration from "../../Images/Illustrations/illustration1.jpg";
import classes from "./Banner.module.css";

const Banner = () => {
  const { userData } = useContext(AuthContext);

  const firstName = userData?.displayName?.split(" ")[0] || "";

  return (
    <div className={classes.banner}>
      <div className={classes.left}>
        <h2>
          Hello, <span>{firstName || ""}</span>
        </h2>
        <h3>Welcome to preCook</h3>
        <p>
          Here you can get your favourite recipes from all around the world and
          cook it easily.
        </p>
      </div>
      <div className={classes.right}>
        <img src={illustration} alt="illustration" />
      </div>
    </div>
  );
};

export default Banner;
