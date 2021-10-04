import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import { SubHeading, CardContent } from "./Typography";

const ConverterContainer = styled.div`
  ${tw`flex flex-col`}
  div {
    padding: 5px 10px 5px 10px;
  }
  margin-bottom: 15px;
`;

const CryptoPrice = styled.div`
  ${tw`flex justify-between items-center `}
`;

const USDPrice = styled.div`
  ${tw`flex justify-between items-center `}
  background-color: rgb(247 250 253);
`;

const Icon = styled.span`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Coverter = ({ icon, symbol, name, price }) => {
  return (
    <ConverterContainer>
      <CryptoPrice>
        <div className="flex items-center">
          <Icon>
            <img src={icon} alt="crypto icon" />
          </Icon>
          <div className="flex flex-col">
            <SubHeading>{symbol}</SubHeading>
            <CardContent style={{ color: "black" }}>{name}</CardContent>
          </div>
        </div>
        <div>1</div>
      </CryptoPrice>
      <USDPrice>
        <div className="flex items-center">
          <Icon>
            <CurrencyDollarIcon color="green" />
          </Icon>
          <div className="flex flex-col">
            <SubHeading>USD</SubHeading>
            <CardContent style={{ color: "black" }}>US Dollar</CardContent>
          </div>
        </div>
        <div>{price}</div>
      </USDPrice>
    </ConverterContainer>
  );
};

export default Coverter;
