import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

import { Title } from "./ui/Typography";
import { Section, Container } from "./ui/Layout";
import SearchBar from "./ui/SearchBar";
import CryptoCard from "./ui/CryptoCard";

import { useGetCryptosQuery } from "../services/cryptoApi";

const CryptoContainer = styled.div`
  ${tw`flex flex-col`}
`;

const CryptoCardContainer = styled.div`
  ${tw`grid grid-cols-3`}
`;

const ShowMore = styled.div`
  ${tw`py-5`}
`;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const {
    data: cryptosList,
    isFetching,
    isLoading,
    error,
  } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  console.log("cryptosList: ", cryptosList);

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
        {error ? (
          <div>Something went wrong...</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : cryptosList ? (
          <CryptoContainer>
            {simplified ? (
              <>
                <div className={"flex justify-between"}>
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
                      className={"link hover:text-gray-500 text-gray-300"}
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
            <CryptoCardContainer>
              {cryptos?.map((obj) => (
                <Link key={obj.id} to={`/crypto/${obj.id}`}>
                  <CryptoCard data={obj} />
                </Link>
              ))}
            </CryptoCardContainer>
          </CryptoContainer>
        ) : (
          "No Data"
        )}
      </Container>
    </Section>
  );
};

export default Cryptocurrencies;
