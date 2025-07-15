
import React, { useState } from "react";
import axios from "axios";
import config from "../config";

function AddCO2Form({ onSuccess }) {
  const [date, setDate] = useState("");
  const [emission, setEmission] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${config.API_URL}/add-co2`, {
        date,
        emission: parseFloat(emission),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Veri başarıyla kaydedildi.");
      setDate("");
      setEmission("");
      onSuccess && onSuccess(); // Grafik güncelle
    } catch (err) {
      setMessage("Hata oluştu: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h3>📥 CO₂ Veri Giriş Formu</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Tarih:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <br />
        <label>
          Emisyon (kg):
          <input type="number" value={emission} onChange={(e) => setEmission(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Kaydet</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddCO2Form;
