import { Line } from "react-chartjs-2";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Helmet } from "react-helmet";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

function Graph() {
  const [labelsArray, setLabelsArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    async function getCustomerAndTransaction(id) {
      const transactionData = await axios({
        url: `http://localhost:3000/transactions?customer_id=${id}`,
      });

      // eslint-disable-next-line no-unused-vars
      let dates = [];
      let counts = [];

      transactionData.data.forEach((transaction) => {
        const dateIndex = dates.indexOf(transaction.date);

        if (dateIndex !== -1) {
          // If date already exists in dates array, increment its corresponding count
          counts[dateIndex] += 1;
        } else {
          // If date doesn't exist in dates array, add it and set count to 1
          dates.push(transaction.date);
          counts.push(1);
        }
      });
      setLabelsArray(dates);
      setDataArray(counts);
      console.log("dates", dates); // Array of unique dates
      console.log("counts", counts); // Array corresponding to counts for each date

      console.log(transactionData.data);
    }

    if (id) {
      getCustomerAndTransaction(id);
    }
  }, [id]);

  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: "My First Dataset",
        data: dataArray,
        fill: false,
        borderColor: "#001510",
        tension: 0.3,
        backgroundColor: "#001510",
        pointBorderColor: "red",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return value;
          },
          color: "white",
        },
        grid: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Helmet>
        <title>Graph</title>
      </Helmet>
      <div className="w-1/2">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default Graph;
