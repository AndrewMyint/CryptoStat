import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import {
  faCoins,
  faChartLine,
  faExchangeAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import Loader from "./ui/Loader";
import Error from "./ui/Error";
import { Title } from "./ui/Typography";
import { Section, Container } from "./ui/Layout";
import GlobalStatCard from "./ui/GlobalStatCard";

import { useGetGlobalStatsQuery } from "../services/cryptoApi";

const GlobalStatContainer = styled.div`
  ${tw`flex flex-col`}
`;
const GlobalStatCardContainer = styled.div`
  ${tw`grid grid-cols-1 sm:grid-cols-2`}
`;

const GlobalStats = () => {
  const { data, isFetching, error, isLoading } = useGetGlobalStatsQuery();
  const globalStats = { ...data?.data };

  return (
    <Section>
      <Container>
        <GlobalStatContainer>
          <Title>Global Crypto Stats</Title>
          {error ? (
            <Error />
          ) : isLoading || isFetching ? (
            <Loader />
          ) : globalStats ? (
            <>
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
            </>
          ) : (
            "No Data"
          )}
        </GlobalStatContainer>
      </Container>
    </Section>
  );
};

export default GlobalStats;
