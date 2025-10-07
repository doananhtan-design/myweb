import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-4">
        <div className="flex gap-3 items-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg ring-1 ring-red-300 shadow-md overflow-hidden bg-white">
            <img
              src="/logo.PNG"
              alt="Logo Thanh Long Đỏ"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-extrabold text-2xl text-red-700 drop-shadow-sm">
              Vp_Tuyển Sinh 08_Trung Tâm DNLX Thanh Long Đỏ
            </div>
            <div className="text-3xl text-red-600 font-bold">
              Đào tạo B, C1 & A/A1
            </div>
          </div>
        </div>
        <nav className="flex gap-5 mt-3 sm:mt-0 text-sm font-medium">
          <a href="#courses" className="hover:text-red-600 transition">
            Khóa học
          </a>
          <a href="#schedule" className="hover:text-red-600 transition">
            Lịch & Giá
          </a>
          <a href="#contact" className="hover:text-red-600 transition">
            Liên hệ
          </a>
        </nav>
      </div>
    </header>
  );
}