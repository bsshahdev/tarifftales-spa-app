import React from "react"
import { PolarArea } from "react-chartjs-2"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PolarChart = () => {
  const data = {
    datasets: [
      {
        data: [11, 16, 7, 18],
        backgroundColor: ["#f46a6a", "#34c38f", "#f1b44c", "#556ee6"],
        label: "My dataset", // for legend
        hoverBorderColor: "#fff",
      },
    ],
    labels: ["Series 1", "Series 2", "Series 3", "Series 4"],
  }

  return <PolarArea width={755} height={260} data={data} options={{ maintainAspectRatio: false }} />
}

export default PolarChart
