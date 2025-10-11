// src/pages/SimulationTopics.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderCenter from "../components/HeaderCenter";

const topicGroups = [
  { name: "toan-bo", title: "Luyện tập toàn bộ" },
  { name: "phanh-xe", title: "Nhóm Phanh xe" },
  { name: "xuat-hien-dau-xe", title: "Nhóm Xuất hiện đầu xe" },
  { name: "xi-nhan", title: "Nhóm Xi nhan" },
  { name: "lan-lan-de-vach", title: "Nhóm Lấn làn, đè vạch" },
  { name: "nguy-hiem-bat-ngo", title: "Nhóm Nguy hiểm bất ngờ" },
];

const categoryGroups = [
  { name: "do-thi", title: "Chương 1 - Đô thị" },
  { name: "ngoai-do-thi", title: "Chương 2 - Ngoài đô thị" },
  { name: "cao-toc", title: "Chương 3 - Cao tốc" },
  { name: "doi-nui", title: "Chương 4 - Đồi núi" },
  { name: "quoc-lo", title: "Chương 5 - Quốc lộ" },
  { name: "tai-nan", title: "Chương 6 - Tai nạn" },
];

export default function SimulationTopics() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 🔹 Header cố định */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-3 px-6 shadow-md flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/practice/simulation")}
            className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-full transition flex items-center justify-center w-9 h-9"
            title="Quay lại"
          >
            ⬅️
          </button>
          <h1 className="text-lg font-semibold">
            Luyện tập mô phỏng các tình huống
          </h1>
        </div>
        <div className="text-sm opacity-90">🚗 Trung tâm đào tạo lái xe</div>
      </header>

      {/* 🔹 Thông tin trung tâm */}
      <div className="bg-white shadow-md rounded-b-2xl">
        <HeaderCenter />
      </div>

      {/* 🔹 Nội dung chính */}
      <main className="flex-1 max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6 mb-10">
        {/* Nhóm luyện tập toàn bộ */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            🎯 Toàn bộ & chuyên đề
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {topicGroups.map((topic) => (
              <Link
                key={topic.name}
                to={`/simulation/topic/${topic.name}`}
                className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-4 transition"
              >
                <span className="font-medium text-blue-700">{topic.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Nhóm luyện tập theo loại đường */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            🛣️ Luyện tập theo loại đường
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {categoryGroups.map((cat) => (
              <Link
                key={cat.name}
                to={`/simulation/topic/${cat.name}`}
                className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-4 transition"
              >
                <span className="font-medium text-green-700">{cat.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
