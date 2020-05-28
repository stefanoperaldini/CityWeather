import React from "react";
import { Header } from "../components/Header";

/**
 * Home page
 */

export function Home() {
  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home m-t-md p-r-md p-l-md">
        <section className="allWidth centeredComponent">
          <h1 className="f-s-xxl txtCenter">
            Find the city
          </h1>
          <p className="f-s-l txtCenter">
            Get access to the city weather
          </p>
        </section>
      </main>
    </React.Fragment>
  );
}