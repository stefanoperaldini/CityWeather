import React from "react";
import { Header } from "../components/Header";

/**
 * Page CityWeather
 */

export function CityWeather() {
  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home m-t-md p-r-md p-l-md">
        <section className="allWidth centeredComponent">
          <h1 className="f-s-xxl txtCenter">
            City weather
          </h1>
          <p className="f-s-l txtCenter">
            Weather details
          </p>
        </section>
      </main>
    </React.Fragment>
  );
}