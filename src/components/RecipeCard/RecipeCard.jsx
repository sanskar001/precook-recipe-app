import React, { useContext, useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { ClipLoader } from "react-spinners";
import classes from "./RecipeCard.module.css";
import BookmarkContext from "../Context/BookmarkContextProvider";

const RecipeCard = (props) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addBookmark, removeBookmark } = useContext(BookmarkContext);
  let response;

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
  const categories = props.cuisines.concat(props.dishTypes);

  return (
    <div className={classes.recipe_card}>
      <Button
        className={classes.bookmark_btn}
        onClick={bookmarkBtnClickHandler}
      >
        {isLoading && <ClipLoader color="#fff" size={24} />}
        {!isLoading && (
          <React.Fragment>
            {isBookmark && <FaBookmark className={classes.filled_icon} />}
            {!isBookmark && <FaRegBookmark />}
          </React.Fragment>
        )}
      </Button>
      <Link to={`/recipe/${props.id}`} className={classes.link}>
        <div className={classes.recipe_img}>
          <div className={classes.gradient}></div>
          <img
            src={props.image || require("../../Images/Logos/default.jpg")}
            alt={props.title}
          />
        </div>
        <div className={classes.recipe_info}>
          <div className={classes.info_line}>
            <p className={classes.title}>{props.title}</p>
            <Button className={classes.like_btn}>
              <FaHeart />
              <span>{props.likes || 0}</span>
            </Button>
          </div>
          <div className={classes.info_line}>
            <p className={classes.category}>{categories.join(", ")}</p>
            <p className={classes.ready_in_mins}>
              <FiClock />
              <span>
                {props.readyInMinutes} min | {props.servings} Serving
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
