import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSpaceScore } from "../utils/scoreUtils";

export default function SimulationFixedExam() {
  const location = useLocation();
  const videoRef = useRef(null);

  // ✅ Lấy đề từ state
  const exam = location.state?.exam;
  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        ❌ Không tìm thấy đề thi — hãy quay lại chọn lại đề.
      </div>
    );
  }

  // ✅ Đảm bảo có danh sách câu hỏi
  const questions = Array.isArray(exam.questions) ? exam.questions.slice(0, 10) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [spaceDisabled, setSpaceDisabled] = useState(false);

  const selected = questions[currentIndex];

  // ✅ Xử lý phím cách (Space)
  useSpaceScore({
    videoRef,
    selected,
    onScore: ({ score: s }) => {
      if (isFinished || spaceDisabled) return;
      setScore(s);
      setTotalScore((prev) => prev + s);
      setSpaceDisabled(true); // khóa phím sau khi bấm
    },
  });

  // ✅ Chuyển sang video tiếp theo
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((p) => p + 1);
      setScore(null);
      setSpaceDisabled(false);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }, 300);
    } else {
      handleFinishExam();
    }
  };

  // ✅ Kết thúc bài
  const handleFinishExam = () => {
    setIsFinished(true);
    if (videoRef.current) videoRef.current.pause();
  };

  // ✅ Làm lại
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(null);
    setTotalScore(0);
    setSpaceDisabled(false);
    setIsFinished(false);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 300);
  };

  // ✅ Ẩn thanh điều khiển video
  useEffect(() => {
    if (videoRef.current) videoRef.current.controls = false;
  }, [currentIndex]);

  // ❌ Không có dữ liệu
  if (!selected)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        ❌ Không có câu hỏi trong đề này
      </div>
    );

  // ✅ Màn hình kết quả
  if (isFinished) {
    const maxScore = questions.length * 5;
    const passed = totalScore >= maxScore * 0.8;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            🎯 Kết quả thi - {exam.title || "Đề cố định"}
          </h2>

          <p className="text-4xl font-extrabold mb-3 text-red-600 drop-shadow-sm">
            {totalScore} / {maxScore}
          </p>

          {passed ? (
            <>
              <p className="text-2xl font-semibold text-green-600 mb-2">✅ ĐẠT</p>
              <p className="text-lg text-gray-700 font-medium">🎉 Chúc mừng bạn!</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-semibold text-red-600 mb-2">❌ CHƯA ĐẠT</p>
              <p className="text-lg text-gray-700 font-medium">
                💪 Cần luyện tập thêm!
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

  // ✅ Màn hình thi
  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-4 sm:p-6 relative">
        <h1 className="text-lg sm:text-2xl font-bold text-center text-blue-700 mb-3">
          🧾 {exam.title || "Đề thi mô phỏng"}
        </h1>

        <div className="text-center text-gray-500 mb-2 text-sm sm:text-base">
          Câu {currentIndex + 1}/{questions.length}
        </div>

        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
          {selected.title}
        </h2>

        {/* 🎬 Video */}
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg mb-3">
          <video
            ref={videoRef}
            src={selected.video ? `/${selected.video}` : ""}
            autoPlay
            playsInline
            webkit-playsinline="true"
            onEnded={nextQuestion}
            className="w-full max-h-[90vh] sm:max-h-[70vh] object-contain rounded-xl"
            style={{ aspectRatio: "16/9" }}
          />
        </div>

        {/* ✅ Kết quả tạm thời */}
        {score !== null && (
          <div className="text-center text-lg sm:text-2xl font-bold mt-4 text-green-600 drop-shadow-sm">
            ✅ Bạn được +{score} điểm
          </div>
        )}

        <div className="text-center text-xl sm:text-3xl font-extrabold text-red-600 mt-4 drop-shadow-sm">
          Tổng điểm hiện tại: {totalScore} / {questions.length * 5}
        </div>

        {/* 🚩 Nút Gắn cờ cho mobile */}
        <button
          onClick={() => {
            if (!videoRef.current || spaceDisabled || isFinished) return;
            const currentTime = Math.floor(videoRef.current.currentTime * 10) / 10;
            const correctStart = selected.correctTimeStart || 0;
            const correctEnd = selected.correctTimeEnd || 0;
            const duration = selected.duration || 0;

            // Chấm thủ công: nếu nằm trong khoảng đúng, 5 điểm, nếu trễ, ít hơn
            let s = 0;
            if (currentTime >= correctStart && currentTime <= correctEnd) s = 5;
            else if (
              currentTime >= correctStart - 0.5 &&
              currentTime <= correctEnd + 0.5
            )
              s = 4;

            setScore(s);
            setTotalScore((prev) => prev + s);
            setSpaceDisabled(true);
          }}
          className="fixed bottom-4 right-4 z-50 sm:hidden bg-red-500 text-white font-semibold px-4 py-3 rounded-full shadow-lg active:scale-95"
        >
          🚩 Gắn cờ
        </button>
      </div>
    </div>
  );
}
