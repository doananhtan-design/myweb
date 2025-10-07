import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderCenter from "../components/HeaderCenter";
import { fixedExamBank } from "../data/examBank";

export default function FixedExamSelect() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const license = state?.license || "B";
  const name = state?.name || "";

  const exams = fixedExamBank[license] || [];
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const key = `examProgress_${license}`;
    const data = localStorage.getItem(key);
    if (data) setProgress(JSON.parse(data));
  }, [license]);

  // ✅ Gửi cả index và id của đề
  const handleSelectExam = (index) => {
    const selectedExam = exams[index];
    const examId = selectedExam?.id || index;

   navigate(`/theory/exam/${license}`, {
  state: {
    mode: state?.mode || "exam",
    examMode: "fixed",
    selectedExam: index,
    name,
  },
});

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-yellow-50 p-4">
      <HeaderCenter title={`📘 Danh sách đề cố định (${license})`} />

      <p className="text-gray-600 text-center mb-4">
        Học viên: <b>{name}</b> — Có {exams.length} đề cố định
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {exams.map((exam, i) => {
          const info = progress[`Đề ${exam.id || i + 1}`];
          const scoreText = info
            ? `✅ ${info.score}/${info.total} (${info.date})`
            : "Chưa làm";

          return (
            <button
              key={i}
              onClick={() => handleSelectExam(i)}
              className={`rounded-2xl shadow p-4 border-2 transition-all duration-200 ${
                info
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <h3 className="font-bold text-lg">Đề {exam.id || i + 1}</h3>
              <p className="text-sm mt-1 opacity-90">{scoreText}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/practice/theory")}
        className="block w-full max-w-sm mx-auto mt-8 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-xl font-medium"
      >
        ← Quay lại
      </button>
    </div>
  );
}
