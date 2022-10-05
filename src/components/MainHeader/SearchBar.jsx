import React, { useState, useRef } from "react";
import classes from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const [isSearchBtnClicked, setIsSearchBtnClicked] = useState(false);
  const searchInput = useRef();
  const navigate = useNavigate();

  const searchBtnClickHandler = () => {
    setIsSearchBtnClicked((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredSearchedQuery = searchInput.current.value;

    // form validation
    if (enteredSearchedQuery.trim().length === 0) {
      return;
    }

    // Naviagte to searched result page
    navigate(`/search/${enteredSearchedQuery.trim().toLowerCase()}`);
  };

  return (
    <React.Fragment>
      <Button className={classes.search_btn} onClick={searchBtnClickHandler}>
        <FiSearch />
      </Button>
      <form
        className={`${classes.search_form} ${
          isSearchBtnClicked ? classes.dropdown_search : ""
        }`}
        onSubmit={formSubmitHandler}
      >
        <label htmlFor="search">
          <FiSearch />
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search for your favourite recipes &amp; cuisine"
          autoComplete="off"
          ref={searchInput}
        />
      </form>
    </React.Fragment>
  );
};

export default SearchBar;
