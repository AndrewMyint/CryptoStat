import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import {
  faCoins,
  faChartLine,
  faExchangeAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import { Title } from "./ui/Typography";
import { Section, Container } from "./ui/Layout";
import GlobalStatCard from "./ui/GlobalStatCard";

import { useGetGlobalStatsQuery } from "../services/cryptoApi";

const GlobalStatContainer = styled.div`
  ${tw`flex flex-col`}
`;
const GlobalStatCardContainer = styled.div`
  ${tw`grid grid-cols-2`}
`;

const GlobalStats = () => {
  const { data, isFetching, error, isLoading } = useGetGlobalStatsQuery();
  const globalStats = { ...data?.data };
  console.log("GlobalStats: ", globalStats);

  return (
    <Section>
      <Container>
        {error ? (
          <div>Something went wrong...</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : globalStats ? (
          <GlobalStatContainer>
            <Title>Global Crypto Stats</Title>
            <GlobalStatCardContainer>
              <GlobalStatCard
                key={1}
                iconColor={"#ceb708"}
                icon={faCoins}
                value={globalStats.totalCoins}
                name={"Total Coins"}
              />
              <GlobalStatCard
                key={2}
                iconColor={"blue"}
                icon={faExchangeAlt}
                value={globalStats.totalExchanges}
                name={"Total Exchanges"}
              />
              <GlobalStatCard
                key={3}
                iconColor={"green"}
                icon={faChartLine}
                value={globalStats.totalMarkets}
                name={"Total Markets"}
              />
              <GlobalStatCard
                key={4}
                iconColor={"orange"}
                icon={faClock}
                value={globalStats.total24hVolume}
                name={"Total 24h Volume"}
              />
            </GlobalStatCardContainer>
          </GlobalStatContainer>
        ) : (
          "No Data"
        )}
      </Container>
    </Section>
  );
};

export default GlobalStats;

// (isFetching) ? return "Loading...";
// if (error) return "Something went wrong...";
// if (globalStats) {
//   let arrayStats = Object.keys(globalStats).map((key) => ({
//     name: key,
//     value: globalStats[key],
//   }));
//   console.log("globalStats: ", globalStats);
//   return (
//     <>
//       <Section>
//         <h1>Global Crypto Stats</h1>
//         <GlobalStatsContainer></GlobalStatsContainer>
//       </Section>
//       <h1>Top 10 Cryptos In The World</h1>
//       <h1>Latest Crypto News</h1>
//     </>
//   );
// }
