import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Deck from "./components/Deck.jsx";
import Header from "./components/Header.jsx";
import Cards from "./components/Cards.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/decks/:deckId",
    element: <Deck />,
  },
  {
    path: "/cards",
    element: <Cards />,
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
