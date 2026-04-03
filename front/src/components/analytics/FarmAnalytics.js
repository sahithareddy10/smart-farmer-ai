import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function FarmAnalytics() {
  const data = {
    labels: ["Rice", "Wheat", "Cotton"],
    datasets: [
      {
        label: "Production",
        data: [10, 20, 15],
      },
    ],
  };

  return (
    <div className="main">
      <h1>📊 Analytics</h1>
      <Bar data={data} />
    </div>
  );
}

export default FarmAnalytics;