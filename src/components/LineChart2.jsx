import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Title, Content } from "./ui/Typography";

import { format } from "date-fns";

import { numberWithCommas } from "./helper";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div>
        <h4>{format(new Date(payload[0]?.payload.date), "MMMM d, hh:mm a")}</h4>
        <p>
          ${numberWithCommas(parseFloat(payload[0]?.payload.val)?.toFixed(2))}
        </p>
      </div>
    );
  }
  return null;
};

const LineChart2 = ({ coinHistory }) => {
  const data = coinHistory?.data?.history?.map((obj) => ({
    date: obj.timestamp,
    val: obj.price,
  }));
  // var latest = new Date(Math.max.apply(null, dates));
  // var earliest = new Date(Math.min.apply(null, dates));
  const dateFormatter = (date) => {
    if (date) return format(new Date(date), "MMM dd")?.toUpperCase();
  };

  console.log("LineChart2: ", data);
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            type="number"
            domain={["min", "max"]}
            hasTicks={false}
            tickFormatter={dateFormatter}
            tickCount={6}
            padding={{ left: 30 }}
            tickSize={0}
            tickMargin={10}
          />
          <YAxis
            dataKey="val"
            // tickCount={7}
            padding={{ bottom: 10 }}
            tickSize={0}
            domain={["auto", "auto"]}
            tickMargin={10}
            // tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="val"
            stroke="#8884d8"
            dot={false}
            // activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChart2;
