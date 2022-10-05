import React, { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import illustration from "../../Images/Illustrations/illustration4.jpg";
import { FaBookmark } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import classes from "./BookmarkButton.module.css";
import { Link } from "react-router-dom";
import BookmarkContext from "../Context/BookmarkContextProvider";

const getBookmarkCount = (num) => {
  return num > 9 ? "9+" : num;
};

const BookmarkButton = () => {
  const { bookmarkItems } = useContext(BookmarkContext);
  const [badgeIsHighlighted, setBadgeIsHighlighted] = useState(false);
  const bookmarkItemsCount = bookmarkItems.length;

  useEffect(() => {
    if (bookmarkItems.length === 0) {
      return;
    }

    setBadgeIsHighlighted(true);

    const timer = setTimeout(() => {
      setBadgeIsHighlighted(false);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [bookmarkItems]);

  return (
    <React.Fragment>
      <div className={classes.bookmark_btn}>
        <Link to="/bookmark">
          <div className={classes.content}>
            <FaBookmark />
            <p>
              Bookmarks
              <span
                className={`${classes.badge} ${
                  badgeIsHighlighted ? classes.bump : ""
                }`}
              >
                {getBookmarkCount(bookmarkItemsCount)}
              </span>
            </p>
          </div>
        </Link>
        <div className={classes.dropdown_container}>
          {bookmarkItemsCount === 0 && (
            <React.Fragment>
              <img
                src={illustration}
                alt="illustration"
                className={classes.illustration_img}
              />
              <h3>No Bookmarks found</h3>
            </React.Fragment>
          )}
          {bookmarkItemsCount > 0 && (
            <React.Fragment>
              <div className={classes.bookmark_list}>
                {bookmarkItems.map((item) => {
                  return (
                    <Link to={`/recipe/${item.id}`} key={item.id}>
                      <div className={classes.bookmark_item} key={item.id}>
                        <img
                          src={
                            item.image ||
                            require("../../Images/Logos/default.jpg")
                          }
                          alt={item.title}
                          className={classes.food_img}
                        />
                        <div className={classes.info}>
                          <p>{item.title}</p>
                          <p>
                            <FiClock />
                            <span>
                              {" "}
                              {item.readyInMinutes} min | {item.servings}{" "}
                              Serving
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link to="/bookmark">
                <Button className={classes.bookmark_btn2}>
                  Go to Bookmarks
                </Button>
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BookmarkButton;
