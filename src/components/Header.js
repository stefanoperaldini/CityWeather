import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="page-header">
      <nav>
        <Link to="/">
          CityWeather
        </Link>
     </nav>
    </header>
  );
}