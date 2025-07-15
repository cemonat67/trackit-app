import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Giriş başarısız!");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold mb-6 text-center">Login</h1>

        <label className="block mb-4">
          <span className="block text-sm mb-1">Username</span>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm mb-1">Password</span>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-blue-600 text-white font-medium"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
