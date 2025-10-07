// src/pages/TheoryPractice.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderCenter from "../components/HeaderCenter";

export default function TheoryPractice() {
  const [form, setForm] = useState({ name: "", license: "B" });
  const [mode, setMode] = useState(null); // "practice" hoặc "exam"
  const [examMode, setExamMode] = useState("fixed"); // mặc định cố định
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const start = (selectedMode) => {
    if (selectedMode === "exam" && !form.name.trim()) {
      setError("Vui lòng nhập tên đăng nhập");
      return;
    }
    setError("");

    if (examMode === "fixed") {
      // Chọn đề cố định → danh sách đề
      navigate("/theory/fixed-exam", {
        state: {
          license: form.license,
          name: form.name,
          mode: selectedMode,
        },
      });
    } else {
      // Ngẫu nhiên → vào bài luôn
      navigate(`/theory/exam/${form.license}`, {
        state: {
          mode: selectedMode,
          name: form.name,
          examMode,
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-white via-red-50 to-yellow-50">
      <div className="max-w-md w-full">
        <HeaderCenter size="w-24 h-24" />
        <div className="bg-white p-6 rounded shadow space-y-4">
          {/* Hạng thi */}
          <div>
            <label className="block text-sm font-medium mb-1">Hạng thi</label>
            <select
              name="license"
              value={form.license}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="A1">A1</option>
              <option value="B">B</option>
              <option value="C1">C1</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          {/* Nhập tên học viên */}
          {mode === "exam" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Tên đăng nhập / Mã học viên
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Nguyễn Văn A"
              />
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </div>
          )}

          {/* Chọn chế độ đề (luôn hiển thị) */}
          <div>
            <label className="block text-sm font-medium mb-1">Chọn chế độ đề</label>
            <select
              value={examMode}
              onChange={(e) => setExamMode(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="random">Ngẫu nhiên</option>
              <option value="fixed">Cố định</option>
            </select>
          </div>

          {/* Nút chọn chế độ */}
          <div className="flex gap-4">
            <button
              onClick={() => start("practice")}
              className="flex-1 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Luyện tập
            </button>

            {mode === "exam" ? (
              <button
                onClick={() => start("exam")}
                className="flex-1 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Bắt đầu
              </button>
            ) : (
              <button
                onClick={() => setMode("exam")}
                className="flex-1 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Thi thử
              </button>
            )}
          </div>

          <Link
            to="/practice"
            className="block text-center text-sm text-gray-600 mt-2"
          >
            ← Quay lại
          </Link>
        </div>
      </div>
    </div>
  );
}
