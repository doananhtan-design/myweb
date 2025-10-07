import React from "react";
import { Link } from "react-router-dom"; // 👈 import Link
import HeaderCenter from "../components/HeaderCenter";

export default function PracticePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        📝 Luyện tập & Thi thử
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {/* Luyện tập lý thuyết */}
        <Link
          to="/practicequiz"
          className="w-full block px-4 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-600 active:scale-95 text-center transition"
        >
          🔹 Luyện tập lý thuyết
        </Link>

        {/* Luyện tập mô phỏng */}
        <Link
          to="/practicesim"
          className="w-full block px-4 py-4 bg-green-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-600 active:scale-95 text-center transition"
        >
          🔹 Luyện tập mô phỏng
        </Link>

        {/* Quay về trang chính */}
        <Link
          to="/"
          className="w-full block px-4 py-4 bg-gray-400 text-white text-lg font-semibold rounded-lg shadow hover:bg-gray-500 active:scale-95 text-center transition"
        >
          🔙 Quay về trang chính
        </Link>
      </div>
    </div>
  );
}
