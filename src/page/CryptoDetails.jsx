import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import styled from "styled-components";
import tw from "twin.macro";
import { Title, SubHeading, SubContent } from "../components/ui/Typography";
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

import {
  MessageFilled,
  RedditSquareFilled,
  YoutubeFilled,
  TwitterSquareFilled,
  FacebookFilled,
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

import LineChart2 from "../components/LineChart2";

import {
  numberWithCommas,
  isEven,
  extractRootDomain,
  generateSocialBadges,
} from "../components/helper";

const Loader = () => <div>Loading...</div>;

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

const CoinInformation = styled.div`
  ${tw`grid sm:grid-flow-row sm:grid-cols-5 gap-5 mt-1`}
`;
const WhatIsBitCoin = styled.div`
  ${tw`order-2 sm:order-none sm:col-span-2 md:col-span-3 text-left`}
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

// const SubInfoContainer = styled.div`
//   ${tw`grid grid-cols-4 col-span-3`}
// `;

const SubInfoContainer = styled.ul`
  ${tw`flex flex-row mt-3 md:mt-0 flex-wrap`}
  flex-basis: 40%;
`;

const SubInfo = styled.li`
  ${tw`flex flex-col justify-center`}

  border-bottom: none;
  padding-left: 10px;
`;

const HeaderSection = styled.div`
  ${tw`flex justify-between `}
  padding: 20px;
  border-bottom: 1px solid rgb(115 129 182);
`;

const SubInfoSection = styled.div`
  ${tw`flex flex-col md:flex-row justify-between`}
  padding: 15px 10px 15px 10px;
`;

const BadgeContainer = styled.li`
  ${tw`mr-1 mb-1`}
`;

const CustomTitle = styled(Title)`
  ${Title} {
  }
  color: rgb(253, 253, 253);
  padding: 0;
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

const TimePeriodBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

const TimeSlot = styled.div`
  ${tw`px-2 py-1 hover:bg-white rounded-lg cursor-pointer`}
  background-color: ${(props) => (props.selected ? "white" : "none")}
`;

const TimeSlotContainer = styled.div`
  ${tw`px-2 rounded-lg`}
  display: flex;
  flex-direction: row;
  background-color: rgb(239 242 245);
  color: rgb(88 102 126);
  padding-top: 4px;
  padding-bottom: 4px;
`;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState({ value: "7d", text: "7D" });
  const { data, isFetching: isFetchingDetail } =
    useGetCryptoDetailsQuery(coinId);
  // const { data: coinHistory, isFetching: isFetchingHistory } =
  //   useGetCryptoHistoryQuery({
  //     coinId,
  //     timeperiod,
  //   });

  if (isFetchingDetail) {
    return (
      <Section>
        <Container>
          <Loader />
        </Container>
      </Section>
    );
  }
  const cryptoDetails = data?.data?.coin;

  const dropDownBadges = generateSocialBadges(cryptoDetails?.links);

  const time = [
    { value: "3h", text: "3H" },
    { value: "24h", text: "1D" },
    { value: "7d", text: "7D" },
    { value: "30d", text: "1M" },
    { value: "3m", text: "3M" },
    { value: "1y", text: "1Y" },
    { value: "3y", text: "3Y" },
    // { value: "5y", text: "5Y" },
  ];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <CurrencyDollarIcon />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <HashtagIcon /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] &&
        millify(parseFloat(cryptoDetails["24hVolume"]))
      }`,
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
      value: cryptoDetails.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <BadgeCheckIcon />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails?.supply?.total)}`,
      icon: <SupportIcon />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails?.supply?.circulating)}`,
      icon: <SupportIcon />,
    },
  ];

  return (
    <Section>
      <Container>
        {!cryptoDetails ? (
          "Something went wrong"
        ) : (
          <>
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
                      {parseFloat(cryptoDetails?.change).toFixed(2)}%
                    </PriceChanged>
                  </PriceAndChange>
                </div>
              </HeaderSection>
              <SubInfoSection>
                <div className="block">
                  <ul style={{ flexBasis: "30%" }} className="flex flex-wrap ">
                    {cryptoDetails?.websiteUrl ? (
                      <BadgeContainer>
                        <LinkBadge
                          style={{ textTransform: "lowercase" }}
                          Icon={LinkIcon}
                          type={extractRootDomain(cryptoDetails.websiteUrl)}
                          item={[
                            {
                              url: cryptoDetails?.websiteUrl,
                              name: extractRootDomain(
                                cryptoDetails?.websiteUrl
                              ),
                            },
                          ]}
                        />
                      </BadgeContainer>
                    ) : (
                      ""
                    )}

                    {cryptoDetails?.links ? (
                      <BadgeContainer>
                        <LinkBadge
                          Icon={CodeIcon}
                          type="Souce code"
                          item={cryptoDetails?.links?.filter(
                            (d) => d.type === "github"
                          )}
                        />
                      </BadgeContainer>
                    ) : (
                      ""
                    )}

                    {dropDownBadges?.facebook.length > 0 && (
                      <BadgeContainer>
                        <DropDown
                          type="Facebook"
                          Icon={FacebookFilled}
                          items={dropDownBadges?.facebook}
                        />
                      </BadgeContainer>
                    )}
                    {dropDownBadges?.reddit.length > 0 && (
                      <BadgeContainer>
                        <DropDown
                          type="Reddit"
                          Icon={RedditSquareFilled}
                          items={dropDownBadges?.reddit}
                        />
                      </BadgeContainer>
                    )}
                    {dropDownBadges?.youtube.length > 0 && (
                      <BadgeContainer>
                        <DropDown
                          type="Youtube"
                          Icon={YoutubeFilled}
                          items={dropDownBadges?.youtube}
                        />
                      </BadgeContainer>
                    )}
                    {dropDownBadges?.twitter.length > 0 && (
                      <BadgeContainer>
                        <DropDown
                          type="Twitter"
                          Icon={TwitterSquareFilled}
                          items={dropDownBadges?.twitter}
                        />
                      </BadgeContainer>
                    )}
                    {dropDownBadges?.telegram.length > 0 && (
                      <BadgeContainer>
                        <DropDown
                          type="Telegram"
                          Icon={MessageFilled}
                          items={dropDownBadges?.telegram}
                        />
                      </BadgeContainer>
                    )}
                    {dropDownBadges?.other.length > 0 && (
                      <BadgeContainer>
                        <DropDown
                          type="Other"
                          Icon={UserGroupIcon}
                          items={dropDownBadges?.other}
                        />
                      </BadgeContainer>
                    )}
                    {cryptoDetails?.links ? (
                      <BadgeContainer>
                        <DropDown
                          type="Websites"
                          Icon={SearchIcon}
                          items={cryptoDetails.links.filter(
                            (d) => d.type === "website"
                          )}
                        />
                      </BadgeContainer>
                    ) : (
                      ""
                    )}
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
                        parseFloat(cryptoDetails["24hVolume"]).toFixed(0)
                      )}
                    </CustomSubContent>
                  </SubInfo>
                  <SubInfo>
                    <CustomSubHeading>Circulating Supply</CustomSubHeading>
                    <CustomSubContent>
                      $
                      {numberWithCommas(
                        parseFloat(cryptoDetails?.supply?.circulating).toFixed(
                          0
                        )
                      )}
                    </CustomSubContent>
                  </SubInfo>
                  <SubInfo>
                    <CustomSubHeading>Total Supply</CustomSubHeading>
                    <CustomSubContent>
                      $
                      {numberWithCommas(
                        parseFloat(cryptoDetails?.supply?.total).toFixed(0)
                      )}
                    </CustomSubContent>
                  </SubInfo>
                </SubInfoContainer>
              </SubInfoSection>
            </Card>

            <TimePeriodBar>
              <TimeSlotContainer>
                {time.map(({ value, text }) => (
                  <TimeSlot
                    key={value}
                    value={value}
                    selected={value === timeperiod.value}
                    onClick={() => setTimeperiod({ value, text })}
                  >
                    {text}
                  </TimeSlot>
                ))}
              </TimeSlotContainer>
            </TimePeriodBar>
            <LineChart2
              timeperiod={timeperiod}
              // dateType={timeperiod.text.toUpperCase()}
              coinId={coinId}
            />
            {/* <Content>
            {cryptoDetails.name} live price in US Dollar (USD). View value
            statistics, market cap and supply.
          </Content> */}
            <CoinInformation>
              <WhatIsBitCoin>
                <Title>What is {cryptoDetails.name}?</Title>
                {HTMLReactParser(cryptoDetails.description)}
              </WhatIsBitCoin>
              <div
                className="sm:col-span-3 md:col-span-2"
                style={{ paddingTop: "20px" }}
              >
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
              </div>
            </CoinInformation>
          </>
        )}
      </Container>
    </Section>
  );
};

export default CryptoDetails;
