import React from "react";
import millify from "millify";
import {
  // LineChart,
  // Line,
  XAxis,
  YAxis,
  Area,
  // CartesianGrid,
  AreaChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

import { useGetCryptoHistoryQuery } from "../services/cryptoApi";

import Loader from "./ui/Loader";
import Error from "./ui/Error";
import { Card } from "./ui/Layout";

import { format } from "date-fns";

import { numberWithCommas } from "./helper";

const LineChartLoader = styled(Loader)`
  ${Loader} {
  }
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px;
`;

const LineChartError = styled(Error)`
  ${Error} {
  }
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px;
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div>
        <h4>
          {format(new Date(payload[0]?.payload.date * 1000), "MMMM d, hh:mm a")}
        </h4>
        <p>
          ${numberWithCommas(parseFloat(payload[0]?.payload.val)?.toFixed(2))}
        </p>
      </div>
    );
  }
  return null;
};

const LineChart2 = ({ timeperiod, coinId }) => {
  console.log("inside linchart: ", timeperiod, coinId);
  const { value: time, text: dateType } = timeperiod;
  const {
    data: coinHistory,
    isFetching: isFetchingHistory,
    isError,
  } = useGetCryptoHistoryQuery({
    coinId,
    time,
  });

  const dateFormatter = (date) => {
    if (date) {
      if (dateType === "1D" || dateType === "3H") {
        return format(new Date(date * 1000), "h:mm a MMM dd")?.toUpperCase();
      } else if (dateType === "7D") {
        return format(new Date(date * 1000), "MMM dd")?.toUpperCase();
      } else if (dateType === "1M") {
        return format(new Date(date * 1000), "MMM dd yyyy")?.toUpperCase();
      }
      //  else if (dateType === "5Y") {
      //   return format(new Date(date), "MMM yyyy")?.toUpperCase();
      // }
      else {
        return format(new Date(date * 1000), "MMM yyyy")?.toUpperCase();
      }
    }
  };

  return (
    <Card style={{}}>
      {/* <div style={{ height: "450px", position: "relative" }}>
        <LineChartLoader />
      </div> */}
      {isFetchingHistory ? (
        <div style={{ height: "450px", position: "relative" }}>
          <LineChartLoader />
        </div>
      ) : isError ? (
        <div style={{ height: "450px", position: "relative" }}>
          <Error />
        </div>
      ) : coinHistory ? (
        <ResponsiveContainer width="100%" height={450}>
          <AreaChart
            width={500}
            height={450}
            data={coinHistory?.data?.history?.map((obj) => ({
              date: obj.timestamp,
              val: obj.price,
            }))}
            margin={{
              top: 20,
              right: 30,
              left: -30,
              bottom: 5,
            }}
          >
            <XAxis
              axisLine={false}
              stroke="#9da5b4"
              dataKey="date"
              type="number"
              domain={["dateMin", "dateMax"]}
              hasTicks={false}
              tickFormatter={dateFormatter}
              tickCount={8}
              // padding={{ left: 30 }}
              tickSize={0}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tick={false}
              stroke="#9da5b4"
              dataKey="val"
              tickCount={9}
              padding={{ bottom: 10 }}
              tickSize={0}
              domain={[
                Math.min(...coinHistory?.data?.history?.map((d) => d.price)),
                Math.max(...coinHistory?.data?.history?.map((d) => d.price)),
              ]}
              tickMargin={20}
              tickFormatter={(number) => {
                return millify(number);
              }}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="val"
              stroke="#8884d8"
              fill="url()"
              dot={false}
              fillOpacity={1}

              // activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        ""
      )}
    </Card>
  );
};

export default LineChart2;
