// src/components/HeaderCenter.jsx
import React from "react";

export default function HeaderCenter({
  logo = "/logo.PNG",
  centerName = "Trung Tâm DNLX",
  centerSubtitle = "Thanh Long Đỏ",
  address = "VP tuyển sinh 08 – Tân Hà - 0914.531.591"
}) {
  return (
    <div className="text-center mb-6">
      <img
        src={logo}
        alt="Logo"
        className="mx-auto w-20 h-20 rounded-full mb-4 shadow-lg"
      />
      <h1 className="text-3xl font-extrabold text-red-700 drop-shadow mb-2">
        {centerName} <br />
        <span className="uppercase text-4xl">{centerSubtitle}</span>
      </h1>
      <p className="text-lg font-medium text-gray-700">{address}</p>
    </div>
  );
}
