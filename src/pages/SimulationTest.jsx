
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

  // ✅ Lấy 10 câu đầu
  const questions = exam.questions.slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [spaceDisabled, setSpaceDisabled] = useState(false);

  const selected = questions[currentIndex];

  // ⌨️ Chấm điểm bằng phím cách
  useSpaceScore({
    videoRef,
    selected,
    onScore: ({ score: s }) => {
      if (isFinished || spaceDisabled) return;
      setScore(s);
      setTotalScore((prev) => prev + s);
      setSpaceDisabled(true); // ✅ Khóa phím sau khi bấm
    },
  });

  // ⏭ Chuyển video hoặc kết thúc
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
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

  // 🏁 Kết thúc bài
  const handleFinishExam = () => {
    setIsFinished(true);
    if (videoRef.current) videoRef.current.pause();
  };

  // 🔁 Làm lại
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

  // 🚫 Ẩn thanh điều khiển video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.controls = false;
    }
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

          {/* 🔴 Tổng điểm to, rõ */}
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

  // ✅ Giao diện khi đang thi
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 relative">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 relative">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-700 mb-4">
          🧾 {exam.title}
        </h1>

        <div className="text-center text-gray-500 mb-2 text-lg">
          Câu {currentIndex + 1}/{questions.length}
        </div>

        {/* 🎬 Video (ẩn thanh điều khiển) */}
        <div className="relative overflow-hidden rounded-xl">
          <video
            ref={videoRef}
            src={selected.videos ? `/${selected.videos}` : ""}
            autoPlay
            onEnded={nextQuestion}
            className="w-full select-none pointer-events-none"
          />
        </div>

        {/* 🟢 Chỉ hiện “Bạn được +x điểm” */}
        {score !== null && (
          <div className="text-center text-2xl font-bold mt-4 text-green-600 drop-shadow-sm">
            ✅ Bạn được +{score} điểm
          </div>
        )}

        {/* 🔢 Tổng điểm hiện tại */}
        <div className="text-center text-3xl font-extrabold text-red-600 mt-6 drop-shadow-sm">
          Tổng điểm hiện tại: {totalScore} / {questions.length * 5}
        </div>
      </div>
    </div>
  );
}
