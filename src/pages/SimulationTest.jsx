import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSpaceScore } from "../utils/scoreUtils";

export default function SimulationFixedExam() {
  const location = useLocation();
  const videoRef = useRef(null);

  // ✅ Lấy đề được chọn
  const exam = location.state?.exam;
  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        ❌ Không tìm thấy đề thi — hãy quay lại chọn lại đề.
      </div>
    );
  }

  const questions = exam.questions.slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [spaceDisabled, setSpaceDisabled] = useState(false);
  const selected = questions[currentIndex];

  // ⌨️ Dùng hook chấm điểm
  useSpaceScore({
    videoRef,
    selected,
    onScore: ({ score: s }) => {
      if (isFinished || spaceDisabled) return;
      setScore(s);
      setTotalScore((prev) => prev + s);
      setSpaceDisabled(true);
    },
  });

  // ⏭ Chuyển câu
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setScore(null);
      setSpaceDisabled(false);
    } else {
      handleFinishExam();
    }
  };

  // 🏁 Kết thúc
  const handleFinishExam = () => {
    setIsFinished(true);
    videoRef.current?.pause();
  };

  // 🔁 Làm lại
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(null);
    setTotalScore(0);
    setIsFinished(false);
    setSpaceDisabled(false);
    setTimeout(() => videoRef.current?.play(), 300);
  };

  // 🚫 Ẩn thanh điều khiển video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.controls = false;
    }
  }, [currentIndex]);

  // ✅ Reset trạng thái khi đổi câu
  useEffect(() => {
    setScore(null);
    setSpaceDisabled(false);
  }, [currentIndex]);

  if (!selected)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        ❌ Không có câu hỏi trong đề này
      </div>
    );

  // ✅ Trang kết quả
  if (isFinished) {
    const maxScore = questions.length * 5;
    const passed = totalScore >= maxScore * 0.8;
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            🎯 Kết quả thi - {exam.title}
          </h2>
          <p className="text-4xl font-extrabold mb-3 text-red-600 drop-shadow-sm">
            {totalScore} / {maxScore}
          </p>
          {passed ? (
            <>
              <p className="text-2xl font-semibold text-green-600 mb-2">✅ ĐẠT</p>
              <p className="text-lg text-gray-700 font-medium">
                🎉 Chúc mừng bạn!
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-semibold text-red-600 mb-2">❌ CHƯA ĐẠT</p>
              <p className="text-lg text-gray-700 font-medium">
                💪 Cần luyện thêm nhé!
              </p>
            </>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button
              onClick={handleRestart}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              🔁 Làm lại đề
            </button>
            <Link
              to="/simulation/fixed-exams"
              className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              🗂 Chọn đề khác
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Trang thi
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 relative">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 relative">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-700 mb-4">
          🧾 {exam.title}
        </h1>

        <div className="text-center text-gray-500 mb-2 text-lg">
          Câu {currentIndex + 1}/{questions.length}
        </div>

        {/* 🎬 Video */}
        <div className="relative overflow-hidden rounded-xl">
          <video
            ref={videoRef}
            src={selected.videos ? `/${selected.videos}` : ""}
            autoPlay
            onEnded={nextQuestion}
            onLoadedData={() => videoRef.current?.play()}
            className="w-full select-none pointer-events-none"
          />

          {/* 🚩 Nút GẮN CỜ (mobile + ngang) */}
          {!isFinished && (
            <button
              onClick={() => {
                if (isFinished || spaceDisabled) return;
                const currentTime = videoRef.current?.currentTime || 0;
                console.log("🚩 Gắn cờ tại", currentTime.toFixed(1), "s");
                const event = new KeyboardEvent("keydown", { code: "Space" });
                window.dispatchEvent(event);
              }}
              className="mobile-flag z-50 fixed bottom-4 right-4 bg-red-600 text-white px-5 py-3 text-xl rounded-full shadow-xl active:scale-95 transition-transform"
            >
              🚩
            </button>
          )}
        </div>

        {/* ✅ Hiện điểm */}
        {score !== null && (
          <div className="text-center text-2xl font-bold mt-4 text-green-600 drop-shadow-sm">
            ✅ Bạn được +{score} điểm
          </div>
        )}

        {/* 🔢 Tổng điểm */}
        <div className="text-center text-3xl font-extrabold text-red-600 mt-6 drop-shadow-sm">
          Tổng điểm hiện tại: {totalScore} / {questions.length * 5}
        </div>
      </div>

      {/* ⚙️ Style riêng cho xoay ngang mobile */}
      <style>{`
        @media (orientation: landscape) {
          .mobile-flag {
            position: fixed !important;
            bottom: 1rem;
            right: 1rem;
            z-index: 9999 !important;
          }
        }
      `}</style>
    </div>
  );
}
