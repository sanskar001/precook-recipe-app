import React from "react";
import { MdCopyright } from "react-icons/md";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <MdCopyright />
      <p>Copyright by Sanskar Maheshwari @{new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
