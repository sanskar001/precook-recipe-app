import React from "react";
import classes from "./MainHeader.module.css";
import logo from "../../Images/Logos/dark_logo.svg";
import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";
import UserButton from "./UserButton";
import SearchBar from "./SearchBar";

const MainHeader = () => {
  return (
    <header className={classes.main_header}>
      <Link to="/home">
        <img src={logo} className={classes.logo} alt="precook logo" />
      </Link>
      <div className={classes.right}>
        <div className={classes.search}>
          <SearchBar />
        </div>
        <BookmarkButton />
        <UserButton />
      </div>
    </header>
  );
};

export default MainHeader;
