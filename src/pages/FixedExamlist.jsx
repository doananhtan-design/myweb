// src/pages/FixedExamlist.jsx
import React from "react";
import { Link } from "react-router-dom";
import mockExams from "../data/mockExams.json";

export default function FixedExamSelect() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        📝 Danh sách 12 đề thi cố định
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockExams.map((exam) => (
          <Link
            key={exam.id}
            to="/simulation/test"
            state={{ exam }}
            className="flex items-center justify-between p-4 rounded-2xl shadow bg-white hover:bg-blue-50 hover:shadow-lg transition"
          >
            <span className="font-medium text-gray-700">{exam.title}</span>
            <span className="text-blue-600 font-semibold">Bắt đầu →</span>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
           to="/practice/simulation"
          className="text-gray-600 hover:text-gray-800 underline"
        >
          ← Quay lại mô phỏng
        </Link>
      </div>
    </div>
  );
}
