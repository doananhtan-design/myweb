// src/components/StartScreen.jsx
import React, { useState } from "react";

export default function StartScreen({ onStart }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("B");

  const handleStart = () => {
    if (!name.trim()) {
      alert("Vui lòng nhập họ tên!");
      return;
    }
    onStart({ name, grade });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-2xl font-bold">Luyện tập-lý thuyết</h1>
      <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <div>
          <label className="block mb-1">Họ và tên:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Hạng xe:</label>
          <select
            value={grade}
            onChange={e => setGrade(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="A1">A1 (Xe máy)</option>
            <option value="B">B (Ô tô)</option>
            <option value="C1">C1</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <button
          onClick={handleStart}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🚀 Bắt đầu thi
        </button>
      </div>
    </div>
  );
}
