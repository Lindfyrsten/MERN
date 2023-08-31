import React from "react";
import ReactDOM from "react-dom/client";
import "./base.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import Deck from "./routes/Deck";
import Cards from "./routes/Cards";
import Decks from "./routes/Decks";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/decks",
    element: <Decks />,
  },
  {
    path: "/decks/:deckId",
    element: <Deck />,
  },
  {
    path: "/cards",
    element: <Cards />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
    <RouterProvider router={router} />
  </React.StrictMode>
);
