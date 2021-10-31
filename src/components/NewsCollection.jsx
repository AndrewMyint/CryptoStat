import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Card, CardButton } from "../components/ui/Layout";
import { CardTitle, CardContent } from "./ui/Typography";
import moment from "moment";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const NewsContainer = styled.div`
  ${tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 mx-auto`}
`;

const CustomCard = styled(Card)`
  ${Card} {
  }
  ${tw`hover:shadow-2xl transition duration-300 ease-in-out`}
  width: auto;
  height: auto;
`;
// max-width: 380px;
// max-height: 380px;
const CardInnerWrapper = styled.div`
  display: flex;

  height: 100%;
  flex-direction: column;
`;
// max-width: 350px;
// max-height: 380px;
const Image = styled.div`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  min-height: 194px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url});
`;
const Caption = styled.div`
  display: flex;
  height: 100%;
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
  return (
    <NewsContainer>
      {cryptoNews.value.map((news, i) => (
        // <Col xs={24} sm={12} lg={8} key={i}>
        <CustomCard key={i}>
          <a href={news.url} target="_blank" rel="noreferrer">
            {/* <div> */}
            <CardInnerWrapper>
              <Image
                url={
                  `${news?.image?.thumbnail?.contentUrl}&w=412&h=300$c=14&rs=2&qlt=90` ||
                  demoImage
                }
              ></Image>
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
