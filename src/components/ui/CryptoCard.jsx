import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import millify from "millify";

import { CardTitle, CardContent } from "./Typography";

const CardContainer = styled.div`
  ${tw`flex flex-col border rounded-lg bg-white p-2 hover:shadow-2xl transition duration-300 ease-in-out`}
`;
const TitleContainer = styled.div`
  ${tw`flex justify-between border-b p-3 items-center`}
`;

const StatContainer = styled.div`
  ${tw`flex flex-col p-4`}
  p {
    margin-bottom: 15px;
  }
`;

const Icon = styled.div``;

const CryptoCard = ({
  data: { rank, name, iconUrl, price, marketCap, change },
}) => {
  return (
    <CardContainer>
      <TitleContainer>
        <CardTitle>{`${rank}. ${name}`}</CardTitle>
        <Icon>
          <img
            style={{ width: "30px", height: "30px" }}
            src={iconUrl}
            alt={"crytocurrency icon"}
          />
        </Icon>
      </TitleContainer>
      <StatContainer>
        <CardContent>{`Price: ${millify(price)}`}</CardContent>
        <CardContent>{`Market Cap: ${millify(marketCap)}`}</CardContent>
        <CardContent>{`Daily Change: ${change}%`}</CardContent>
      </StatContainer>
    </CardContainer>
  );
};

export default CryptoCard;
