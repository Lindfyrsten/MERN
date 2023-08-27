import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="page-width">
        <div className="left-nav">
          <a href="/">DECKS</a>
        </div>
        <div className="right-nav">
          <a href="/login">LOGIN</a>
          <a href="/signup">SIGNUP</a>
        </div>
      </nav>
    </header>
  );
}
