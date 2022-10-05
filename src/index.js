import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/Context/AuthContextProvider";
import { BookmarkContextProvider } from "./components/Context/BookmarkContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <BookmarkContextProvider>
          <App />
        </BookmarkContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
