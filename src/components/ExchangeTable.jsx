import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import styled from "styled-components";
import { CaretRightOutlined } from "@ant-design/icons";
import "./style.css";

import { useGetExchangesQuery } from "../services/cryptoApi";
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
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;
  console.log(Row, Col);
  return (
    <Section>
      <Container>
        <SubHeading className="mt-3">Click to Read the Description</SubHeading>
        <Card>
          <Header>
            <Col style={{ textAlign: "center" }} span={6}>
              Exchanges
            </Col>
            <Col style={{ textAlign: "center" }} span={6}>
              24h Trade Volume
            </Col>
            <Col style={{ textAlign: "center" }} span={6}>
              Markets
            </Col>
            <Col style={{ textAlign: "center" }} span={6}>
              Change
            </Col>
          </Header>
          <Row>
            {exchangesList.map((exchange, i) => (
              <Col span={24}>
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
                            <strong>{exchange.rank}.</strong>
                          </Text>
                          <Avatar
                            className="exchange-image"
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                            src={exchange.iconUrl}
                          />
                          <Text>
                            <strong>{exchange.name}</strong>
                          </Text>
                        </Col>
                        <Col style={{ textAlign: "center" }} span={6}>
                          ${millify(exchange.volume)}
                        </Col>
                        <Col style={{ textAlign: "center" }} span={6}>
                          {millify(exchange.numberOfMarkets)}
                        </Col>
                        <Col style={{ textAlign: "center" }} span={6}>
                          {millify(exchange.marketShare)}%
                        </Col>
                      </Row>
                    }
                  >
                    <Description>
                      {HTMLReactParser(
                        exchange.description || "No Description is found"
                      )}
                    </Description>
                  </Panel>
                </Collapse>
              </Col>
            ))}
          </Row>
        </Card>
      </Container>
    </Section>
  );
};

export default Exchanges;
