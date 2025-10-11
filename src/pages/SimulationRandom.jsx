import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import simulationQuestions from "../data/simulationQuestions.json";
import {
  getScoreSegments,
  useSpaceScore,
} from "../utils/scoreUtils";

export default function SimulationFixedExam() {
  const { id } = useParams();
  const examId = parseInt(id);

  // ✅ Kiểm tra có dữ liệu đề không
  const exam = simulationQuestions?.exams?.find?.((e) => e.id === examId);

  // Nếu không có đề, trả thông báo đẹp
  if (!exam) {
    return (
      <div className="p-5 text-center text-gray-700">
        <h2 className="text-lg font-semibold text-red-500">
          ❌ Không tìm thấy đề thi!
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Hãy quay lại danh sách đề và chọn lại.
        </p>
        <Link
          to="/simulation"
          className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          ⏪ Quay lại danh sách đề
        </Link>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [pressedTime, setPressedTime] = useState(null);
  const [score, setScore] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const videoRef = useRef(null);

  const currentQuestion = exam.questions?.[currentIndex];
  if (!currentQuestion) {
    return (
      <div className="p-5 text-center text-gray-700">
        <p>⚠️ Đề này chưa có câu hỏi nào!</p>
        <Link
          to="/simulation"
          className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          ⏪ Quay lại danh sách đề
        </Link>
      </div>
    );
  }

  const handleVideoEnded = () => {
    if (currentIndex < exam.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setPressedTime(null);
      setScore(null);
      setShowHint(false);
      setOverlayActive(false);
    } else {
      alert(`🎉 Kết thúc! Tổng điểm: ${totalScore} / ${exam.questions.length * 5}`);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto">
      {/* 🔹 Tiêu đề */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-gray-800">
          Đề {exam.id}: {exam.title}
        </h1>
        <span className="text-sm text-blue-600 font-medium">
          Tổng điểm: {totalScore} / {exam.questions.length * 5}
        </span>
      </div>

      {/* 🎬 Video + nút gắn cờ */}
      <div className="relative">
        <video
          ref={videoRef}
          src={currentQuestion.video ? `/${currentQuestion.video}` : ""}
          controls
          autoPlay
          playsInline
          webkit-playsinline="true"
          onEnded={handleVideoEnded}
          className="w-full max-h-[90vh] sm:max-h-[75vh] object-contain rounded-xl shadow-lg mb-3"
          style={{ aspectRatio: "16/9" }}
        />

        {/* 🚩 Nút gắn cờ chạy mượt cả khi xoay ngang */}
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            if (!videoRef.current || overlayActive) return;

            requestAnimationFrame(() => {
              const t = Math.round(videoRef.current.currentTime * 10) / 10;
              const s = getScoreSegments(
                currentQuestion.correctTimeStart,
                currentQuestion.correctTimeEnd
              ).reduce(
                (best, seg) =>
                  t >= seg.start && t <= seg.end ? Math.max(best, seg.score) : best,
                0
              );

              setScore(s);
              setPressedTime(t);
              setTotalScore((prev) => prev + s);

              if (s < 4) {
                setShowHint(true);
                setOverlayActive(true);
                videoRef.current.pause();
              }
            });
          }}
          className="absolute top-3 right-3 z-30 bg-red-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg active:scale-95 transition-transform duration-100 sm:hidden"
          style={{
            transform: "translateZ(0)",
            touchAction: "none",
          }}
        >
          🚩
        </button>

        {/* 💡 Gợi ý hình ảnh */}
        {showHint && currentQuestion.hintImage && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
            <img
              src={`/${currentQuestion.hintImage}`}
              alt="Hint"
              className="max-h-[75%] rounded-lg shadow-lg border border-white"
            />
            <button
              onClick={() => {
                setShowHint(false);
                setOverlayActive(false);
                videoRef.current.play().catch(() => {});
              }}
              className="mt-4 bg-green-600 text-white px-3 py-2 rounded-lg text-sm"
            >
              ✅ Đã hiểu
            </button>
          </div>
        )}
      </div>

      {/* 📊 Thông tin điểm */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-gray-600">
          Câu {currentIndex + 1} / {exam.questions.length}
        </span>
        {score !== null && (
          <span
            className={`font-semibold ${
              score >= 4 ? "text-green-600" : "text-red-500"
            }`}
          >
            +{score} điểm
          </span>
        )}
      </div>

      {/* 🔘 Nút điều hướng */}
      <div className="flex justify-between mt-3">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40"
        >
          ⬅ Trước
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              Math.min(prev + 1, exam.questions.length - 1)
            )
          }
          disabled={currentIndex === exam.questions.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-40"
        >
          Tiếp ➡
        </button>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/simulation"
          className="text-blue-600 underline text-sm"
        >
          ⏪ Chọn đề khác
        </Link>
      </div>
    </div>
  );
}
