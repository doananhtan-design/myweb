import React from "react";

export default function Footer() {
  return (
    <footer className="mt-14 text-sm text-slate-500 py-6 border-t">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 px-4">
        <div>
          © {new Date().getFullYear()} Vp_08 Tân Hà -Trung Tâm DNLX Thanh Long
          Đỏ. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#!" className="hover:text-red-600">
            Giấy phép
          </a>
          <a href="#!" className="hover:text-red-600">
            Chính sách
          </a>
        </div>
      </div>
    </footer>
  );
}
