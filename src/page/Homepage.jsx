import React from "react";
import GlobalStats from "../components/GlobalStats.jsx";
import Cryptocurrencies from "../components/Cryptocurrencies.jsx";
import News from "./News";

const Homepage = () => {
  return (
    <>
      <GlobalStats />
      <Cryptocurrencies simplified />
      <News simplified />
    </>
  );
};

export default Homepage;
