import React from "react";
import { Switch, Route, Link } from "react-router-dom";
//import { Layout, Typography, Space } from "antd";

import {
  Exchanges,
  Homepage,
  News,
  CryptocurrenciesPage,
  CryptoDetails,
  Navbar,
} from "./page";

const App = () => (
  <div>
    <Navbar />
    <div className="main">
      <div>
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/exchanges">
              <Exchanges />
            </Route>
            <Route exact path="/cryptocurrencies">
              <CryptocurrenciesPage />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </div>
      </div>
      {/* <div className="footer">
        <h1>
          Copyright © 2021
          <Link to="/">Cryptoverse Inc.</Link> <br />
          All Rights Reserved.
        </h1>

        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </div> */}
    </div>
  </div>
);

export default App;
