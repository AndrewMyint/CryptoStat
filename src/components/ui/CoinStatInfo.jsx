import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { SubHeading, SubContent } from "./Typography";

const StatName = styled(SubHeading)`
  font-size: 13px;
`;
// color: rgb(253, 253, 253);

const StatValue = styled(SubContent)`
  font-size: 13px;
  text-align: right;
`;
// color: rgb(253, 253, 253);

const Th = styled.th`
  ${tw`py-4 text-left pl-4`}
  border: 1px solid #e9e9e9;
`;

const Td = styled.td`
  ${tw`pr-4`}
  border: 1px solid #e9e9e9
`;
// border-top: 1px solid rgb(115 129 182);
const Tr = styled.tr`
  ${tw`px-2`}
  border: 1px solid #e9e9e9;
  &:nth-of-type(2n) {
    background-color: #fbfbfb;
  }
  // &:hover {
  //   border: 3px solid #e9e9e9;
  // }
`;

const Icon = styled.span`
  width: 14px;
  height: 14px;
  margin-right: 10px;
`;

const Table = styled.table`
  ${tw`w-full`}
`;

const CoinStatInfo = ({ stats, tableName, symbol }) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th
            style={{
              fontSize: "24px",
              lineHeight: "34px",
              fontWeight: "450",
              borderWidth: "0px",
              backgroundColor: "rgb(1 18 118)",
              color: "#fff",
              borderTopLeftRadius: "6px",
            }}
          >
            {symbol} Price Statistics
          </Th>
          <td
            style={{
              backgroundColor: "rgb(1 18 118)",
              borderTopRightRadius: "6px",
            }}
          ></td>
        </tr>
      </thead>
      <tbody>
        {stats?.map(({ icon, title, value }) => (
          <Tr key={title}>
            <Th>
              <div className="flex items-center">
                <Icon>{icon}</Icon>
                {/* <Icon style={{ width: "14px", height: "14px" }} /> */}
                <StatName>{title}</StatName>
              </div>
            </Th>
            <Td>
              <StatValue>{value}</StatValue>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CoinStatInfo;
