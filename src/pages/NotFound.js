import React from "react";
import { Link } from "react-router-dom";

/**
 * Page NotFound
 */

export function NotFound() {
  return (
    <React.Fragment>
      <main className="centered-container">
        <section className="boxAccount">
          <h1>Page not found</h1>
          <p>Sorry, we can't find the page you're looking for.</p>
          <Link to="/Home">Go back Home</Link>
        </section>
      </main>
    </React.Fragment>
  );
}