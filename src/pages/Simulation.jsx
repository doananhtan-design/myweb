// src/pages/Simulation.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Simulation() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">🚧 Tính năng mô phỏng</h1>
      <p className="text-gray-600 mb-6">Chức năng đang được phát triển...</p>
      <Link
        to="/practice"
        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
      >
        ← Quay lại
      </Link>
    </div>
  );
}
