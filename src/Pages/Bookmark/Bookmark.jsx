import React, { useContext } from "react";
import BookmarkContext from "../../components/Context/BookmarkContextProvider";
import RecipeContainer from "../../components/UI/RecipeContainer";

const Bookmark = () => {
  const { bookmarkItems } = useContext(BookmarkContext);

  return (
    <RecipeContainer
      recipes={bookmarkItems}
      title="Bookmarked"
      message="No Bookmarked Recipes"
    />
  );
};

export default Bookmark;
