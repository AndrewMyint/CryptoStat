import React from "react";
import { ChevronDownIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import styled from "styled-components";
import tw from "twin.macro";

const BadgeContainer = styled.div`
  ${tw`btn btn-xs text-black hover:text-white bg-gray-100 hover:bg-gray-400 border-0 capitalize h-7 rounded-md font-normal`}
  font-size: 11px;
`;

const DropDown = ({ Icon, type, items }) => {
  return (
    <div className="dropdown dropdown-hover">
      <BadgeContainer
        tabIndex="0"
        className="btn btn-xs text-black hover:text-white bg-gray-100 hover:bg-gray-400 border-0 capitalize h-7 rounded-md "
      >
        <span className="mr-1">
          <Icon style={{ width: "14px", height: "14px" }} />
        </span>
        <span>{type}</span>
        <span className="ml-1">
          <ChevronDownIcon style={{ width: "15px", height: "15px" }} />
        </span>
      </BadgeContainer>
      <ul
        tabIndex="0"
        className=" shadow menu dropdown-content bg-base-100 rounded-md w-auto text-xs "
      >
        {items?.map(({ name, url }) => (
          <li key={name}>
            <div className="flex px-2 py-3 tems-center hover:bg-gray-200 rounded-sm">
              <div className="">
                <a
                  alt={name}
                  href={url}
                  target="_black"
                  rel="noreferrer noopener"
                >
                  {name}
                </a>
              </div>
              <ExternalLinkIcon width="15px" height="15px" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
