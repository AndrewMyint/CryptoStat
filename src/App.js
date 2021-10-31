import React from "react";
import { Switch, Route } from "react-router-dom";
//import { Layout, Typography, Space } from "antd";
import { Section, Container } from "./components/ui/Layout";
import { LinkedinFilled, GithubFilled } from "@ant-design/icons";

import {
  Exchanges,
  Homepage,
  News,
  CryptocurrenciesPage,
  CryptoDetails,
  Navbar,
} from "./page";

const App = () => (
  <div className="h-full">
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
      <footer
        style={{
          backgroundColor: "rgb(0, 24, 113)",
          bottom: "0px",
          padding: "48px",
          color: "white",
          fontColor: "white",
          marginTop: "10px",
          width: "100%",
        }}
      >
        <Section>
          <Container>
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <span className="my-3">
                  <h1 className="text-gray-400">
                    Copyright © 2021
                    <a href="/">CrytoStat Inc.</a>
                  </h1>
                  <h1 className="text-gray-400 "> All Rights Reserved.</h1>
                </span>
                <h1 className="text-gray-400 my-3">
                  Built with <a href="https://reactjs.org//">ReactJS</a> |
                  <a href="https://www.styled-components.com/">
                    {" "}
                    Styled-Components
                  </a>{" "}
                  |
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    TailwindCSS
                  </a>
                  |
                  <a
                    href="https://recharts.org/en-US/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    ReChartJS
                  </a>{" "}
                  and more
                </h1>
              </div>
              <div className="my-3">
                <h1 className="text-gray-400 ">
                  Developed By{" "}
                  <a
                    href="https://linkedin.com/in/andrew-myint"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    @AndrewMyint
                  </a>
                </h1>
                <span className="flex justify-left mt-1">
                  <a
                    href="https://linkedin.com/in/andrew-myint"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedinFilled
                      style={{ fontSize: "30px", paddingRight: "10px" }}
                    />
                  </a>
                  <a
                    href="https://github.com/AndrewMyint"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubFilled style={{ fontSize: "30px" }} />
                  </a>
                </span>
              </div>
            </div>
          </Container>
        </Section>
      </footer>
    </div>
  </div>
);

export default App;
