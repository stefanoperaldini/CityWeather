import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./pages/Home";
import { CityWeather } from "./pages/CityWeather";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
        <div className="wrapper">
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/city-weather">
              <CityWeather />
            </Route>
            <Route path="/not-found">
              <NotFound />
            </Route>
            <Route path="*">
              <Redirect to="/not-found" />
            </Route>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
