import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import styled from "styled-components";
import tw from "twin.macro";

import {
  Title,
  Content,
  SubHeading,
  SubContent,
} from "../components/ui/Typography";
import { Section, Container, Card } from "../components/ui/Layout";
import DropDown from "../components/ui/DropDown";
import LinkBadge from "../components/ui/LinkBadge";
import CoinStatInfo from "../components/ui/CoinStatInfo";
import Coverter from "../components/ui/Coverter";

import {
  UserGroupIcon,
  SearchIcon,
  CodeIcon,
  LinkIcon,
  CurrencyDollarIcon,
  HashtagIcon,
  ClockIcon,
  TrendingUpIcon,
  SwitchHorizontalIcon,
  StarIcon,
  BadgeCheckIcon,
  SupportIcon,
} from "@heroicons/react/outline";
import { StopOutlined, CheckOutlined } from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

import LineChart2 from "../components/LineChart2";

import {
  numberWithCommas,
  isEven,
  extractRootDomain,
} from "../components/helper";

const Loader = "Loading...";

const Icon = styled.div`
  ${tw`pr-2`}
  img {
    width: 22px;
    height: 22px;
  }
`;

const TitleWithIcon = styled.div`
  ${tw`flex items-center`}
`;

const PriceAndChange = styled.div`
  ${tw`flex items-center`}
`;

const PriceChanged = styled.div`
  ${tw`text-base rounded-md items-center`}
  font-size: 14px;
  font-weight: 600;
  padding: 3px 10px;
  color: white;
  background: ${(props) => (props.even ? "#16c784" : "#ea3943")};
`;

const CoinStatSection = styled.div`
  ${tw`grid grid-cols-2 gap-5`}
`;
const CoinInformation = styled.div`
  ${tw`grid grid-cols-5 gap-5 mt-1`}
`;
const WhatIsBitCoin = styled.div`
  ${tw`col-span-3 text-left`}
  h3 {
    font-weight: 700;
    color: rgba(55, 65, 81, 1);
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
  p {
    color: rgba(107, 114, 128, 1);
  }
  a {
    color: blue;
  }
`;
const CoinStatTableContainer = styled.div`
  ${tw` p-4`}
  box-sizing: border-box;
  padding: 24px;
  margin: 0px;
  background-color: #f7fafd;
  border-radius: 16px;
`;

const SubInfoContainer = styled.div`
  ${tw`grid grid-cols-4 col-span-3`}
`;
const SubInfo = styled.div`
  ${tw`flex flex-col justify-center`}
  width: 100%;
  height: 100%;
  border-bottom: none;
  padding-left: 10px;
`;

const CoinStatContent = styled.div``;

const HeaderSection = styled.div`
  ${tw`flex justify-between `}
  padding: 20px;
  border-bottom: 1px solid rgb(115 129 182);
`;

const SubInfoSection = styled.div`
  ${tw`flex justify-between`}
  padding: 15px 10px 15px 10px;
`;

const BadgeContainer = styled.li`
  ${tw`mr-1 mb-1`}
`;

const CustomTitle = styled(Title)`
  ${Title} {
  }
  color: rgb(253, 253, 253);
`;

const CustomSubHeading = styled(SubHeading)`
  ${SubHeading} {
  }
  color: rgb(115 129 182);
  font-weight: 0;
`;

const CustomSubContent = styled(SubContent)`
  ${SubContent} {
  }
  color: rgb(253, 253, 253);
`;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching: isFetchingDetail } =
    useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, isFetching: isFetchingHistory } =
    useGetCryptoHistoryQuery({
      coinId,
      timeperiod,
    });
  console.log("CryptoDetails: ", data);
  console.log("CrytoHistory:", coinHistory);

  if (isFetchingHistory) {
    console.log("loading bro: ", isFetchingDetail, isFetchingHistory);
    return <Loader />;
  } else if (isFetchingDetail) {
    console.log("loading bro: ", isFetchingDetail, isFetchingHistory);
    return <Loader />;
  }
  const cryptoDetails = data?.data?.coin;

  // const links = cryptoDetails.links.map(d => {

  // })

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <CurrencyDollarIcon />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <HashtagIcon /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ClockIcon />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <TrendingUpIcon />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <StarIcon />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <CurrencyDollarIcon />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <SwitchHorizontalIcon />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <BadgeCheckIcon />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <SupportIcon />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <SupportIcon />,
    },
  ];

  return (
    <Section>
      <Container>
        <Card
          style={{
            backgroundColor: "rgb(1, 18 ,118)",
            padding: "0px",
            marginTop: "20px",
          }}
        >
          <HeaderSection>
            <TitleWithIcon>
              <Icon>
                <img
                  // style={{ width: "30px", height: "30px" }}
                  src={cryptoDetails?.iconUrl}
                  alt={"crytocurrency icon"}
                />
              </Icon>
              <CustomTitle>
                {data?.data?.coin.name} ({data?.data?.coin.symbol})
              </CustomTitle>
            </TitleWithIcon>
            <div className="flex flex-col">
              <CustomSubHeading>
                {data?.data?.coin.name} Price ({data?.data?.coin.symbol})
              </CustomSubHeading>
              <PriceAndChange>
                <CustomTitle style={{ marginRight: "16px", padding: "0" }}>
                  $
                  {numberWithCommas(
                    parseFloat(cryptoDetails?.price).toFixed(3)
                  )}
                </CustomTitle>
                <PriceChanged even={isEven(cryptoDetails?.change)}>
                  {cryptoDetails?.change}%
                </PriceChanged>
              </PriceAndChange>
            </div>
          </HeaderSection>
          <SubInfoSection>
            <div className="block col-span-3">
              <ul className="flex flex-wrap ">
                <BadgeContainer>
                  {cryptoDetails?.websiteUrl ? (
                    <LinkBadge
                      style={{ textTransform: "lowercase" }}
                      Icon={LinkIcon}
                      type={extractRootDomain(cryptoDetails.websiteUrl)}
                      item={[
                        {
                          url: cryptoDetails.websiteUrl,
                          name: extractRootDomain(cryptoDetails.websiteUrl),
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}
                </BadgeContainer>
                <BadgeContainer>
                  <LinkBadge
                    Icon={CodeIcon}
                    type="Souce code"
                    item={cryptoDetails.links.filter(
                      (d) => d.type === "github"
                    )}
                  />
                </BadgeContainer>
                <BadgeContainer>
                  <DropDown
                    type="Community"
                    Icon={UserGroupIcon}
                    items={cryptoDetails.socials}
                  />
                </BadgeContainer>
                <BadgeContainer>
                  <DropDown
                    type="Websites"
                    Icon={SearchIcon}
                    items={cryptoDetails.links.filter(
                      (d) => d.type === "website"
                    )}
                  />
                </BadgeContainer>
              </ul>
            </div>
            <SubInfoContainer>
              <SubInfo>
                <CustomSubHeading>Market Cap</CustomSubHeading>
                <CustomSubContent>
                  $
                  {numberWithCommas(
                    parseFloat(cryptoDetails?.marketCap).toFixed(0)
                  )}
                </CustomSubContent>
              </SubInfo>
              <SubInfo>
                <CustomSubHeading>Volume</CustomSubHeading>
                <CustomSubContent>
                  $
                  {numberWithCommas(
                    parseFloat(cryptoDetails?.volume).toFixed(0)
                  )}
                </CustomSubContent>
              </SubInfo>
              <SubInfo>
                <CustomSubHeading>Circulating Supply</CustomSubHeading>
                <CustomSubContent>
                  $
                  {numberWithCommas(
                    parseFloat(cryptoDetails?.circulatingSupply).toFixed(0)
                  )}
                </CustomSubContent>
              </SubInfo>
              <SubInfo>
                <CustomSubHeading>Total Supply</CustomSubHeading>
                <CustomSubContent>
                  $
                  {numberWithCommas(
                    parseFloat(cryptoDetails?.totalSupply).toFixed(0)
                  )}
                </CustomSubContent>
              </SubInfo>
            </SubInfoContainer>
          </SubInfoSection>
        </Card>

        {/* <Content>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </Content> */}
        {/* <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select> */}

        <Card className="mt-3 p-7">
          <LineChart2 coinHistory={coinHistory} />
        </Card>
        {/* <CoinStatSection>
          <CoinStatContent>
            <Content>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </Content>
          </CoinStatContent>
          <CoinStatContent>
            <Title>Other Stats Info</Title>
            <Content>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </Content>
          </CoinStatContent>
        </CoinStatSection> */}

        <CoinInformation>
          <WhatIsBitCoin>
            <Title>What is {cryptoDetails.name}?</Title>
            {HTMLReactParser(cryptoDetails.description)}
          </WhatIsBitCoin>
          <div className="col-span-2" style={{ paddingTop: "20px" }}>
            {/* <Title>{cryptoDetails.name} Value Statistics</Title> */}
            <SubHeading style={{ fontSize: "13px" }}>
              {cryptoDetails.symbol} to USD Converter
            </SubHeading>
            <Card>
              <Coverter
                icon={cryptoDetails.iconUrl}
                symbol={cryptoDetails.symbol}
                name={cryptoDetails.name}
                price={numberWithCommas(
                  parseFloat(cryptoDetails?.price).toFixed(2)
                )}
              />
            </Card>
            <Card style={{ backgroundColor: "white" }}>
              <CoinStatInfo
                stats={[...stats, ...genericStats]}
                symbol={cryptoDetails.symbol}
                tableName={"Market Info"}
              />
            </Card>
            {/* <CoinStatTableContainer>
              <CoinStatInfo stats={genericStats} tableName={"Other Info"} />
            </CoinStatTableContainer> */}
          </div>
          {/* <div className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links?.map((link) => (
              <div className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </div>
            ))}
          </div> */}
        </CoinInformation>
      </Container>
    </Section>
  );
};

export default CryptoDetails;
