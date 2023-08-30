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
          <a href="/login">LOGIN</a>
          <a href="/signup">SIGNUP</a>
        </div>
      </nav>
    </header>
  );
}
