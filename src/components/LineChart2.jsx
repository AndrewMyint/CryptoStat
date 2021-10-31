import React from "react";
import millify from "millify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const LineChart2 = ({ coinHistory, dateType }) => {
  const data = coinHistory?.data?.history?.map((obj) => ({
    date: obj.timestamp,
    val: obj.price,
  }));
  // var latest = new Date(Math.max.apply(null, dates));
  // var earliest = new Date(Math.min.apply(null, dates));
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
  const min = Math.min(...coinHistory?.data?.history?.map((d) => d.price));
  const max = Math.max(...coinHistory?.data?.history?.map((d) => d.price));

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            stroke="#9da5b4"
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
            stroke="#9da5b4"
            dataKey="val"
            tickCount={9}
            padding={{ bottom: 10 }}
            tickSize={0}
            domain={[min, max]}
            tickMargin={20}
            tickFormatter={(number) => {
              return millify(number);
            }}
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
