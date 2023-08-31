import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="page-width">
        <div className="left-nav">
          <NavLink reloadDocument to="/">
            DECKS
          </NavLink>
          <NavLink reloadDocument to="/cards">
            CARDS
          </NavLink>
        </div>
        <div className="right-nav">
          <NavLink to="/login" reloadDocument>
            LOGIN
          </NavLink>
          <NavLink to="/signup" reloadDocument>
            SIGNUP
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
