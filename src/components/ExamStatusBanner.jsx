import React from "react";

export default function ExamStatusBanner({ mode, examMode }) {
  // Xác định nội dung hiển thị
  let text = "";
  let colorClass = "";

  if (mode === "practice") {
    text = "💡 Luyện tập";
    colorClass = "bg-green-100 text-green-800 border-green-400";
  } else if (mode === "exam" && examMode === "random") {
    text = "🧭 Thi thử (ngẫu nhiên)";
    colorClass = "bg-blue-100 text-blue-800 border-blue-400";
  } else if (mode === "exam" && examMode === "fixed") {
    text = "📘 Thi thử (đề cố định)";
    colorClass = "bg-purple-100 text-purple-800 border-purple-400";
  } else {
    text = "Chế độ không xác định";
    colorClass = "bg-gray-100 text-gray-700 border-gray-300";
  }

  return (
    <div
      className={`px-4 py-2 rounded-xl border font-semibold shadow-sm ${colorClass}`}
    >
      {text}
    </div>
  );
}
