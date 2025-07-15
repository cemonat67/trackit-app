import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CO2Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/co2-history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res.data || []))
      .catch((err) => console.error("CO2Chart Error:", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">📈 CO₂ Emisyon Geçmişi</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit=" kg" />
          <Tooltip />
          <Line type="monotone" dataKey="emission" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CO2Chart;