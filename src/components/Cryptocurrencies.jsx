import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

import { Title } from "./ui/Typography";
import { Section, Container } from "./ui/Layout";
import SearchBar from "./ui/SearchBar";
import CryptoCard from "./ui/CryptoCard";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Error from "./ui/Error";
import Loader from "./ui/Loader";

const CryptoContainer = styled.div`
  ${tw`flex flex-col`}
`;

const CryptoCardContainer = styled.div`
  ${tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 `}
`;

const ShowMore = styled.div`
  ${tw`pt-5 pb-2 pl-3`}
`;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data: cryptosList, isLoading, error } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  const onSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <Section>
      <Container>
        <CryptoContainer>
          {simplified ? (
            <>
              <div className={"flex items-center"}>
                <Title style={{ display: "inline" }}>
                  Top 10 Cryptos In The World
                </Title>
                <ShowMore
                  style={{
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                >
                  <Link
                    className={"link hover:text-gray-500 text-gray-400"}
                    to="/cryptocurrencies"
                  >
                    Show more
                  </Link>
                </ShowMore>
              </div>
            </>
          ) : (
            <SearchBar onSearch={onSearch} />
          )}
          {error ? (
            <Error />
          ) : isLoading ? (
            <Loader />
          ) : cryptosList ? (
            <CryptoCardContainer>
              {cryptos?.map((obj) => (
                <Link key={obj.uuid} to={`/crypto/${obj.uuid}`}>
                  <CryptoCard data={obj} />
                </Link>
              ))}
            </CryptoCardContainer>
          ) : (
            "No Data"
          )}
        </CryptoContainer>
      </Container>
    </Section>
  );
};

export default Cryptocurrencies;
