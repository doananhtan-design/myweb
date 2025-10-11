import React from "react";
import { Link } from "react-router-dom";
import simulationQuestions from "../data/simulationQuestions.json";

export default function SimulationTopicSelect() {
  // Lấy danh sách chương có dữ liệu
  const chapters = Array.from(
    new Set(simulationQuestions.map((q) => q.chapter))
  ).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          🎯 Chọn chương luyện tập mô phỏng
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {chapters.map((ch) => (
            <Link
              key={ch}
              to={`/simulation/topic/toan-bo/chapter-${ch}`}
              className="bg-blue-500 text-white px-4 py-3 rounded-lg text-center hover:bg-blue-600 transition"
            >
              Luyện tập toàn bộ - Chương {ch}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/simulation/topics"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← Quay lại danh sách chủ đề
          </Link>
        </div>
      </div>
    </div>
  );
}
