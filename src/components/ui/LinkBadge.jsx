import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { LinkIcon, ExternalLinkIcon } from "@heroicons/react/outline";

const BadgeContainer = styled.div`
  ${tw` inline-flex px-2 justify-center items-center text-black hover:text-white  font-normal bg-gray-100 hover:bg-gray-400 h-7 capitalize cursor-pointer rounded-md`}
  font-size: 11px;
  span {
    display: inline-flex;
  }
`;

const LinkBadge = ({ Icon, type, item, style }) => {
  return (
    <BadgeContainer style={style}>
      <span className="mr-1">
        <Icon style={{ width: "14px", height: "14px" }} />
      </span>
      <span>
        <a
          href={item[0].url}
          alt={item[0].name}
          target="_black"
          rel="noreferrer noopener"
        >
          {type}
        </a>
      </span>
      <span className="ml-1">
        <ExternalLinkIcon style={{ width: "15px", height: "15px" }} />
      </span>
    </BadgeContainer>
  );
};

export default LinkBadge;
