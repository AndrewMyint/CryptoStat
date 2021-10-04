import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { de } from "date-fns/locale";
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
    // coinTimestamp.push(coinHistory?.data?.history[i].timestamp);
  }
  const timeData = coinHistory?.data?.history?.map((obj) => ({
    x: obj.timestamp,
    y: obj.price,
  }));

  const data = {
    // labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        // data: coinPrice,
        data: timeData,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  console.log("data in lineChart: ", data, timeData);

  const options = {
    scales: {
      // adapters: {
      //   date: {
      //     locale: de,
      //   },
      // },
      x: {
        type: "timeseries",
        time: {
          unit: "day",
          // stepSize: 0.5,
        },
        grid: {
          display: true,
        },
        ticks: {
          souce: "data",
          // autoSkip: true,
          maxTicksLimit: 5,
        },
      },

      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div>
      <div>
        <div>{coinName} Price Chart </div>
        <div>
          <div>Change: {coinHistory?.data?.change}%</div>
          <div>
            Current {coinName} Price: $ {currentPrice}
          </div>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
