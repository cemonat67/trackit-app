import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import AddCO2Form from "../components/AddCO2Form";
import config from "../config";

// Chart.js bileşenlerini REGISTER ediyoruz
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${config.API_URL}/co2-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Veri alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "CO₂ Emisyon (kg)",
        data: data.map((d) => d.emission),
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Günlük CO₂ Emisyonları",
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Dashboard</h2>
      <AddCO2Form onSuccess={fetchData} />
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Dashboard;
