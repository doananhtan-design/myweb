import { PlayCircle, Shuffle, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HeaderCenter from "../components/HeaderCenter";

export default function Simulation() {
  const modes = [
    {
      title: "Thi thử- đề cố định",
      icon: <PlayCircle className="w-8 h-8 text-red-500 mb-2" />,
      desc: "Làm bài thi mô phỏng như thật, gồm 10 tình huống ngẫu nhiên.",
      path: "/simulation/fixed-exams", // ← dẫn đến FixedExamList
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      title: "Luyện Tâp Đề ngẫu nhiên",
      icon: <Shuffle className="w-8 h-8 text-blue-500 mb-2" />,
      desc: "Hệ thống chọn ngẫu nhiên tình huống cho bạn luyện tập.",
      path: "/simulation/random",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Luyện Tập Theo chủ đề",
      icon: <BookOpen className="w-8 h-8 text-green-500 mb-2" />,
      desc: "Luyện tập theo từng nhóm tình huống: người đi bộ, xe tải, giao lộ...",
      path: "/simulation/topics",
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">🎮 Mô phỏng tình huống giao thông</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {modes.map((mode) => (
          <Link
            key={mode.title}
            to={mode.path}  // ← dẫn đến FixedExamList
            className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            {mode.icon}
            <h2 className="text-xl font-semibold mb-2">{mode.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{mode.desc}</p>
            <span
              className={`${mode.color} text-white px-4 py-2 rounded-lg font-medium transition`}
            >
              Bắt đầu
            </span>
          </Link>
        ))}
      </div>

      <Link
        to="/practice"
        className="mt-10 text-gray-600 hover:text-gray-800 transition"
      >
        ← Quay lại luyện tập
      </Link>
    </div>
  );
}
