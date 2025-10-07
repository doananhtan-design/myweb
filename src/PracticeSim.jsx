// src/components/MockSim.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MockSim() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-6 bg-red-50">
      <h1 className="text-2xl font-bold">🔴 Thi thử mô phỏng</h1>
      <p className="text-center">Trang này mô phỏng kỳ thi thử lái xe.</p>
      <button
  onClick={() => navigate("/practice")}
  className="mt-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
>
  🔙 Quay về Luyện tập
</button>
    </div>
  );
}
