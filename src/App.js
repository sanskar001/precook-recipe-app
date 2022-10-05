import React, { Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AuthContext from "./components/Context/AuthContextProvider";

// Lazy Loading | code splitting
const Welcome = React.lazy(() => import("./Pages/Welcome/Welcome"));
const NotFound = React.lazy(() => import("./Pages/NotFound/NotFound"));
const Home = React.lazy(() => import("./Pages/Home/Home"));
const LogoutScreen = React.lazy(() => import("./Pages/Logout/LogoutScreen"));
const UserProfile = React.lazy(() => import("./Pages/UserProfile/UserProfile"));
const Inspiration = React.lazy(() => import("./Pages/Others/Inspiration"));
const Cuisine = React.lazy(() => import("./Pages/Others/Cuisine"));
const MealsType = React.lazy(() => import("./Pages/Others/MealsType"));
const Search = React.lazy(() => import("./Pages/Others/Search"));
const Recipe = React.lazy(() => import("./Pages/Recipe/Recipe"));
const Bookmark = React.lazy(() => import("./Pages/Bookmark/Bookmark"));

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <div className="loading">
            <ClipLoader size={45} color="#000" />
            <p>Loading...</p>
          </div>
        }
      >
        <Routes>
          {!isLoggedIn && (
            <React.Fragment>
              <Route path="/" element={<Welcome />} />
              <Route path="/logout" element={<LogoutScreen />} />
            </React.Fragment>
          )}
          {isLoggedIn && (
            <React.Fragment>
              <Route
                path="/"
                element={<Navigate to="/home" replace={true} />}
              />
              <Route path="/home" element={<Home />} />
              <Route path="/account" element={<UserProfile />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/inspiration/:foodName" element={<Inspiration />} />
              <Route path="/cuisine/:type" element={<Cuisine />} />
              <Route path="/meal-type/:type" element={<MealsType />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </React.Fragment>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;

// import Welcome from "./Pages/Welcome/Welcome";
// import NotFound from "./Pages/NotFound/NotFound";
// import Home from "./Pages/Home/Home";
// import LogoutScreen from "./Pages/Logout/LogoutScreen";
// import UserProfile from "./Pages/UserProfile/UserProfile";
// import Inspiration from "./Pages/Others/Inspiration";
// import Cuisine from "./Pages/Others/Cuisine";
// import MealsType from "./Pages/Others/MealsType";
// import Search from "./Pages/Others/Search";
// import Recipe from "./Pages/Recipe/Recipe";
// import Bookmark from "./Pages/Bookmark/Bookmark";
