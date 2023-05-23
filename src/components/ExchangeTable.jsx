import React, { useState, useEffect } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import styled from "styled-components";
import "./style.css";

import { useGetExchangesQuery } from "../services/cryptoExchangeApi";
import Loader from "../components/ui/Loader";
import { Section, Container, Card } from "../components/ui/Layout";
import { SubHeading } from "./ui/Typography";

const { Text } = Typography;
const { Panel } = Collapse;

const Header = styled(Row)`
  ${Row} {
  }
  background-color: #011276;
  color: white;
  padding: 20px;
`;

const Description = styled.div`
  h2 {
    font-weight: 700;
    color: rgba(55, 65, 81, 1);
    margin-top: 1rem;
  }
  h3 {
    font-weight: 700;
    color: rgba(55, 65, 81, 1);
    margin-top: 1rem;
  }
  p {
    color: rgba(107, 114, 128, 1);
    margin-bottom: 1rem;
  }
  a {
    color: blue;
  }
`;

const Exchanges = () => {
  const [list, setList] = useState({});
  const { data, isFetching, isError, error } = useGetExchangesQuery();
  // const [getExchanges, { data: exchangeData, isLoading, isError }] =
  //   useLazyGetExchangeQuery({
  //     preferCacheValue: true,
  //   });

  const exchangesList = data;

  useEffect(() => {
    const initialList = {};
    exchangesList?.forEach((exchange) => {
      initialList[exchange.id] = {
        id: exchange.id,
        description: exchange.description,
        cached: false,
      };
    });
    setList(initialList);
  }, [exchangesList]);

  const handleOnClick = async () => {};

  return (
    <Section>
      <Container>
        {isFetching ? (
          <Loader />
        ) : (
          <>
            <SubHeading className="mt-3">
              Click to Read the Description
            </SubHeading>
            <Card>
              <Header>
                <Col style={{ textAlign: "center" }} span={6}>
                  Exchanges
                </Col>
                <Col style={{ textAlign: "center" }} span={6}>
                  24h Trade Volume
                </Col>
                <Col style={{ textAlign: "center" }} span={6}>
                  Trust Score
                </Col>
                <Col style={{ textAlign: "center" }} span={6}>
                  URL
                </Col>
              </Header>
              <Row>
                {isError ? (
                  <div>{error?.data?.status?.error_message}</div>
                ) : (
                  exchangesList?.map((exchange, i) => (
                    <Col
                      key={i}
                      span={24}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOnClick(exchange.id);
                      }}
                    >
                      <Collapse
                      // defaultActiveKey={["1"]}
                      // expandIcon={({ isActive }) => (
                      //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      // )}
                      >
                        <Panel
                          style={{
                            backgroundColor: i % 2 === 0 ? "#fbfbfb" : "#fff",
                          }}
                          className="custom-panel"
                          key={exchange.id}
                          showArrow={false}
                          header={
                            <Row key={exchange.id}>
                              <Col span={6}>
                                <Text>
                                  <strong>{exchange.trust_score_rank}.</strong>
                                </Text>
                                <Avatar
                                  className="exchange-image"
                                  style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                  src={exchange.image}
                                />
                                <Text>
                                  <strong>{exchange.name}</strong>
                                </Text>
                              </Col>
                              <Col style={{ textAlign: "center" }} span={6}>
                                ${millify(exchange["trade_volume_24h_btc"])}
                              </Col>
                              <Col style={{ textAlign: "center" }} span={6}>
                                {exchange.trust_score}
                              </Col>
                              <Col style={{ textAlign: "center" }} span={6}>
                                <a href={exchange.url}> {exchange.url}</a>
                              </Col>
                            </Row>
                          }
                        >
                          <Description>
                            {list &&
                            list[exchange.id]?.description?.length > 0 ? (
                              HTMLReactParser(list[exchange.id].description)
                            ) : (
                              <div>No Description Available</div>
                            )}
                          </Description>
                        </Panel>
                      </Collapse>
                    </Col>
                  ))
                )}
              </Row>
            </Card>
          </>
        )}
      </Container>
    </Section>
  );
};

export default Exchanges;
