import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚗 Trường dạy lái xe Thanh Long Đỏ
      </h1>

      <p className="text-lg text-gray-600 mb-8 text-center">
        Học lái xe dễ dàng – Thi đậu ngay từ lần đầu tiên 🎉
      </p>

      <button
        onClick={() => navigate("/practice")}
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow active:scale-95 transition"
      >
        📝 Luyện tập & Thi thử
      </button>
    </div>
  );
}
