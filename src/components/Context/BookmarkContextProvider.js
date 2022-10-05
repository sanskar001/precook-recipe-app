import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import AuthContext from "./AuthContextProvider";

const BookmarkContext = React.createContext({ bookmarkItems: [] });

// Context Provider component

const BookmarkContextProvider = (props) => {
  const [bookmarkItems, setBookmarkItems] = useState([]);

  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookmarkRecipeHandler(userData.uid);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [userData.uid]);

  // Fetch recipe from database
  const fetchBookmarkRecipeHandler = async (userId) => {
    let loadedRecipes = [];
    try {
      if (userId) {
        const querySnapshot = await getDoc(doc(db, "bookmarks", userId));

        if (querySnapshot.exists()) {
          loadedRecipes = querySnapshot.data().bookmarks;
        }
      }

      // Update state
      setBookmarkItems(loadedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  // Add recipe to bookmark list
  const addBookmarkHandler = async (recipe) => {
    const updatedRecipe = { ...recipe, isBookmarked: true };
    const updatedBookmarkItems = [updatedRecipe].concat(bookmarkItems);

    try {
      // Add a new document in collection "bookmarks"
      await setDoc(doc(db, "bookmarks", `${userData.uid}`), {
        bookmarks: updatedBookmarkItems,
      });

      // Update state
      setBookmarkItems(updatedBookmarkItems);

      return true;
    } catch (e) {
      alert(e.message);
    }
  };

  // Remove recipe from bookmark list
  const removeBoomarkHandler = async (id) => {
    const updatedBookmarkItems = bookmarkItems.filter((item) => item.id !== id);

    try {
      // Add a new document in collection "Recipes"
      await setDoc(doc(db, "bookmarks", `${userData.uid}`), {
        bookmarks: updatedBookmarkItems,
      });

      // Update state
      setBookmarkItems(updatedBookmarkItems);

      return true;
    } catch (e) {
      alert(e.message);
    }
  };

  const bookmarkContext = {
    bookmarkItems: bookmarkItems,
    addBookmark: addBookmarkHandler,
    removeBookmark: removeBoomarkHandler,
  };

  return (
    <BookmarkContext.Provider value={bookmarkContext}>
      {props.children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
export { BookmarkContextProvider };
