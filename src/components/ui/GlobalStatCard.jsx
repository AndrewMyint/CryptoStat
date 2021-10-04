import React from "react";
import millify from "millify";
import tw from "twin.macro";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//bg-white min-w-0 rounded-lg shadow p-4
const CardContainer = styled.div`
  ${tw`flex p-6 border bg-white `}
`;
const Icon = styled.div`
  ${tw`p-3 `}
`;

const StatContainer = styled.div`
  ${tw`flex flex-col pl-4`}
`;

const StatName = styled.span`
  ${tw`mb-2`}
`;

const Title = styled.p`
  ${tw`text-sm font-medium text-gray-400`}
`;

const Value = styled.p`
  ${tw`text-lg font-semibold text-gray-700`}
`;

const StatValue = styled.span``;

const GlobalStatCard = ({ name, value, icon, iconColor }) => {
  return (
    <CardContainer>
      <Icon>
        <FontAwesomeIcon
          style={{ color: iconColor, width: "25px", height: "25px" }}
          icon={icon}
        />
      </Icon>
      <StatContainer>
        <StatName>
          <Title>{name}</Title>
        </StatName>
        <StatValue>
          <Value>{millify(value)}</Value>
        </StatValue>
      </StatContainer>
    </CardContainer>
  );
};

export default GlobalStatCard;
