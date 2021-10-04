import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { Section, Container } from "../components/ui/Layout.jsx";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "../components/ui/Loader";
import NewsCollection from "../components/NewsCollection";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Section>
      <Container>
        <Row gutter={[24, 24]}>
          {!simplified && (
            <Col span={24}>
              <Select
                showSearch
                className="select-news"
                placeholder="Select a Crypto"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Cryptocurency">Cryptocurrency</Option>
                {data?.data?.coins?.map((currency) => (
                  <Option value={currency.name}>{currency.name}</Option>
                ))}
              </Select>
            </Col>
          )}
          <NewsCollection cryptoNews={cryptoNews} />
        </Row>
      </Container>
    </Section>
  );
};

export default News;
