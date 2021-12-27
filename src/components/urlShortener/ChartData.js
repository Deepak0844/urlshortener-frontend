import axios from "axios";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { URL } from "../Authentication/url";

//chart
export default function ChartData() {
  const value = [];
  const months = [];
  const getData = () => {
    axios
      .get(`${URL}/url/data/chart`)
      .then((res) => {
        for (const dataObj of res.data) {
          months.push(dataObj.Month);
          value.push(dataObj.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="chartContainer">
      {value ? <Chart value={value} months={months} /> : ""}
    </div>
  );
}
function Chart({ value, months }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const labels = months;
  const data = {
    labels,
    datasets: [
      {
        label: "URLs",
        data: value,
        backgroundColor: "#1f497d",
      },
    ],
  };

  return (
    <div className="App">
      <Bar options={options} data={data} />
    </div>
  );
}
