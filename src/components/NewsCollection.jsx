import React from "react";
import { Select, Typography, Row, Col, Avatar } from "antd";
import styled from "styled-components";
import tw from "twin.macro";
import { Card, CardButton } from "../components/ui/Layout";
import { CardTitle, CardContent } from "./ui/Typography";
import moment from "moment";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const NewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
`;

const CustomCard = styled(Card)`
  ${Card} {
  }
  width: auto;
  height: auto;
  margin-bottom: 40px;
`;
// max-width: 380px;
// max-height: 380px;
const CardInnerWrapper = styled.div`
  display: flex;
  max-width: 380px;
  max-height: 380px;
  height: 100%;
  flex-direction: column;
`;
const Image = styled.div`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  height: 294px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url});
`;
const Caption = styled.div`
  display: flex;
  flex-direction: flex-column;

  flex-direction: column;
  justify-content: space-between;
  padding: 8px 10px;
`;

const CustomCardTitle = styled(CardTitle)`
  ${CardTitle} {
  }

  line-weight: 30px;
  line-height: 30px;
  width: 100%;
  margin-bottom: 19px;
  overflow: hidden;
`;

const CaptionBottom = styled.div`
  ${tw`flex justify-between`}
`;

const Sponsor = styled.div`
  ${tw`flex items-center`}
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
`;

const NewsCollection = ({ cryptoNews }) => {
  console.log("Cryptonews: ", cryptoNews);
  return (
    <NewsContainer>
      {cryptoNews.value.map((news, i) => (
        // <Col xs={24} sm={12} lg={8} key={i}>
        <CustomCard>
          <a href={news.url} target="_blank" rel="noreferrer">
            {/* <div> */}
            <CardInnerWrapper>
              <Image
                url={
                  `${news?.image?.thumbnail?.contentUrl}&w=412&h=300$c=14&rs=2&qlt=90` ||
                  demoImage
                }
              >
                {/* <img
                  src={
                    `${news?.image?.thumbnail?.contentUrl}&w=412&h=300$c=14&rs=2&qlt=90` ||
                    demoImage
                  }
                  alt=""
                /> */}
              </Image>
              <Caption>
                <CustomCardTitle>{news.name}</CustomCardTitle>
                <div>
                  <CaptionBottom>
                    <Sponsor>
                      <Icon>
                        <img
                          src={
                            news.provider[0]?.image?.thumbnail?.contentUrl ||
                            demoImage
                          }
                          alt=""
                        />
                      </Icon>

                      <CardContent style={{ display: "inline-block" }}>
                        {news.provider[0]?.name}
                      </CardContent>
                    </Sponsor>

                    <CardButton>Read More</CardButton>
                  </CaptionBottom>
                  <CardContent style={{ fontSize: "12px", marginTop: "10px" }}>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </CardContent>
                </div>
              </Caption>
            </CardInnerWrapper>
            {/* </div> */}
          </a>
        </CustomCard>
        // </Col>
      ))}
    </NewsContainer>
  );
};

export default NewsCollection;
