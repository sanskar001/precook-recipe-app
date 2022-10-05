import React, { useState, useContext, useEffect } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import Button from "../../components/UI/Button";
import BookmarkContext from "../../components/Context/BookmarkContextProvider";
import classes from "./RecipeHeader.module.css";

const RecipeHeader = (props) => {
  let response;
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addBookmark, removeBookmark } = useContext(BookmarkContext);

  useEffect(() => {
    setIsBookmark(props.isBookmarked);
  }, [props.isBookmarked]);

  const bookmarkBtnClickHandler = async () => {
    setIsLoading(true);
    if (!isBookmark) {
      response = await addBookmark(props);
    } else {
      response = await removeBookmark(props.id);
    }

    // Update state of bookmark.
    setIsLoading(false);
    if (response) {
      setIsBookmark((preIsBookmark) => !preIsBookmark);
    }
  };

  // Cuisines and dishTypes
  const categories = props.cuisines?.concat(props.dishTypes);

  // Background image
  const recipeImgStyle = {
    backgroundImage: `url(${
      props.image || require("../../Images/Logos/default.jpg")
    })`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <header className={classes.recipe_header}>
      <div className={classes.top_card} style={recipeImgStyle}>
        <div className={classes.gradient}></div>
        <div className={classes.recipe_title}>
          <span>{props.title}</span>
        </div>
      </div>
      <div className={classes.recipe_info}>
        <div className={classes.info_line}>
          <p className={classes.title}>{props.title}</p>
          <Button className={classes.like_btn}>
            <FaHeart />
            <span>{props.likes}</span>
          </Button>
        </div>
        <div className={classes.info_line}>
          <p className={classes.category}>{categories?.join(", ")}</p>
          <div className={classes.right}>
            <p className={classes.ready_in_mins}>
              <FiClock />
              <span>
                {props.readyInMinutes} min | {props.servings} Serving
              </span>
            </p>
            <Button
              className={`${classes.bookmark_btn} ${
                isBookmark ? classes.bookmarked : ""
              }`}
              onClick={bookmarkBtnClickHandler}
            >
              {isLoading && <ClipLoader color="#353535" size={24} />}
              {!isLoading && (
                <React.Fragment>
                  {isBookmark && <FaBookmark />}
                  {!isBookmark && <FaRegBookmark />}
                  <span>{isBookmark ? "Bookmarked" : "Bookmark"}</span>
                </React.Fragment>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RecipeHeader;
