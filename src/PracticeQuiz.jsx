import React, { useState } from "react";

const examStructure = { 
  A1: { total: 25, quydinh: 8, nghiemtrong: 1, vanhoa: 1, kythuat: 1, cautao: 0, bienhieu: 8, sahinh: 6, time: 19, passing: 22 },
  B:  { total: 30, quydinh: 8, nghiemtrong: 1, vanhoa: 1, kythuat: 1, cautao: 1, bienhieu: 9, sahinh: 9, time: 20, passing: 27 },
  C1: { total: 35, quydinh: 10, nghiemtrong: 1, vanhoa: 1, kythuat: 2, cautao: 1, bienhieu: 10, sahinh: 10, time: 22, passing: 32 },
  C:  { total: 40, quydinh: 10, nghiemtrong: 1, vanhoa: 1, kythuat: 2, cautao: 1, bienhieu: 14, sahinh: 11, time: 24, passing: 36 },
  D:  { total: 45, quydinh: 10, nghiemtrong: 1, vanhoa: 1, kythuat: 2, cautao: 1, bienhieu: 16, sahinh: 14, time: 26, passing: 41 },
};

const pickRandom = (arr, n) => {
  const copy = [...arr];
  const result = [];
  while (result.length < n && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
};

function StartScreen({ onStart }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("B");
  const [examMode, setExamMode] = useState("random");

  const handleStart = () => {
    if (!name.trim()) return alert("⚠️ Vui lòng nhập họ tên!");
    onStart({ name, grade, mode: "test", examMode, page: 'quiz' });
  };
  const total = examStructure[grade]?.total || 20;
  const time = examStructure[grade]?.time || 20;
  const passingCount = examStructure[grade]?.passing || Math.ceil(total * 0.85);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-purple-50 to-purple-100 p-4">

<h1 className="text-4xl font-extrabold text-purple-700 drop-shadow-lg">🚦 Thi thử lý thuyết lái xe</h1>
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6 border border-purple-200">
        <div>
          <label className="block mb-2 font-semibold text-purple-700">Họ và tên:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 transition" />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-purple-700">Hạng xe:</label>
          <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 transition">
            <option value="A1">A1 (Xe máy)</option>
            <option value="B">B (Ô tô)</option>
            <option value="C1">C1</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <p className="text-gray-500 mt-2">⏱ {time} phút | Tổng {total} câu | Đạt ≥ {passingCount} câu</p>
        </div>
        <div>
          <label className="block mb-2 font-semibold text-purple-700">Chế độ đề:</label>
          <select value={examMode} onChange={e => setExamMode(e.target.value)} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 transition">
            <option value="random">Đề ngẫu nhiên</option>
            <option value="fixed">Đề cố định</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button onClick={handleStart} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:from-purple-600 hover:to-pink-700 transition duration-300 transform hover:scale-105">🚀 Bắt đầu thi</button>
          <button onClick={() => window.history.back()} className="flex-1 py-3 bg-gray-300 text-black font-bold rounded-2xl shadow hover:bg-gray-400 transition duration-300">🔙 Quay về trang trước</button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
