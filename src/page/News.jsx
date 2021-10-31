import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

import { Section, Container } from "../components/ui/Layout.jsx";
import { Title } from "../components/ui/Typography";
import Loader from "../components/ui/Loader";
import Error from "../components/ui/Error";
import NewsCollection from "../components/NewsCollection";

const SelectBoxContainer = styled.div`
  ${tw`my-2 `}
`;

const ShowMore = styled.div`
  ${tw`pt-5 pb-2 pl-3`}
`;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const {
    data: cryptoNews,
    isFetching,
    error,
  } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 9 : 18,
  });

  return (
    <Section>
      <Container>
        <div className="flex flex-col">
          {!simplified && (
            <SelectBoxContainer>
              <select
                showsearch
                className="select select-bordered w-full max-w-xs"
                placeholder="Select a Crypto"
                optionFilterProp="children"
                onChange={(e) => {
                  setNewsCategory(e.target.value);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <option key={0} value="Cryptocurency">
                  Cryptocurrency
                </option>
                {data?.data?.coins?.map((currency, i) => (
                  <option key={i + 1} value={currency.name}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </SelectBoxContainer>
          )}
          {simplified && (
            <div className={"flex items-center"}>
              <Title style={{ display: "inline" }}>Cryptocurrencies News</Title>
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
          )}

          {error ? (
            <Error />
          ) : isFetching ? (
            <Loader />
          ) : (
            <NewsCollection cryptoNews={cryptoNews} />
          )}
        </div>
      </Container>
    </Section>
  );
};

export default News;
