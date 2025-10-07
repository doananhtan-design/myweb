// src/pages/Practice.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderCenter from "../components/HeaderCenter";

export default function Practice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white via-red-50 to-yellow-50">
      <HeaderCenter size="w-24 h-24" />
      {/* Các nút lựa chọn */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link
          to="/practice/theory"
          className="w-full block px-4 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-600 transform transition-transform duration-150 active:scale-95 text-center"
        >
          🔹 Lý Thuyết
        </Link>

        <Link
          to="/practice/simulation"
          className="w-full block px-4 py-4 bg-green-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-600 transform transition-transform duration-150 active:scale-95 text-center"
        >
          🔹 Mô Phỏng
        </Link>

        {/* Link ra ngoài */}
        <a
          href="https://shlxtld.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block px-4 py-4 bg-gray-400 text-white text-lg font-semibold rounded-lg shadow hover:bg-gray-500 transform transition-transform duration-150 active:scale-95 text-center"
        >
          🔹 Trong Hình - Đường Trường
        </a>

        {/* Quay về trang trước */}
        <Link
          to="/"
          className="w-full block px-4 py-4 bg-gray-400 text-white text-lg font-semibold rounded-lg shadow hover:bg-gray-500 transform transition-transform duration-150 active:scale-95 text-center"
        >
          🔙 Quay Về
        </Link>
      </div>
    </div>
  );
}

