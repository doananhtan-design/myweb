import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import simulationQuestions from "../data/simulationQuestions.json";
import {
  getScoreSegments,
  getFlagPositionPercent,
  scoreColors,
  useSpaceScore,
} from "../utils/scoreUtils";

export default function SimulationRandom() {
  const videoRef = useRef(null);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [pressedTime, setPressedTime] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [lowScoreQuestions, setLowScoreQuestions] = useState([]);
  const [usedIds, setUsedIds] = useState(new Set());

  const structure = { 1: 2, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1 }; // tổng 10 câu
  const passingScore = 35; // điểm đạt

  // 🔹 Hàm tạo đề ngẫu nhiên 10 câu
  const generateRandomExam = () => {
    const selectedQuestions = [];
    const newUsedIds = new Set(usedIds);

    Object.entries(structure).forEach(([chapter, count]) => {
      const chapterQuestions = simulationQuestions.filter(
        (q) => Number(q.chapter) === Number(chapter) && !newUsedIds.has(q.id)
      );

      const availableQuestions =
        chapterQuestions.length >= count
          ? chapterQuestions
          : simulationQuestions.filter((q) => Number(q.chapter) === Number(chapter));

      const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
      const chosen = shuffled.slice(0, count);
      chosen.forEach((q) => newUsedIds.add(q.id));
      selectedQuestions.push(...chosen);
    });

    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setScore(null);
    setPressedTime(null);
    setTotalScore(0);
    setShowHint(false);
    setOverlayActive(false);
    setLowScoreQuestions([]);
    setUsedIds(newUsedIds);
  };

  useEffect(() => {
    generateRandomExam();
  }, []);

  const selected = questions[currentIndex];

  // 🔹 Bấm phím cách để chấm điểm
  useSpaceScore({
    videoRef,
    selected,
    onScore: ({ score: s, pressedTime: t }) => {
      if (overlayActive) return;
      setScore(s);
      setPressedTime(t);
      setTotalScore((prev) => prev + s);

      if (s < 4) {
        setShowHint(true);
        setOverlayActive(true);
        setLowScoreQuestions((prev) => [
          ...prev,
          { ...selected, index: currentIndex, score: s },
        ]);
        videoRef.current.pause();
      }
    },
  });

  // 🔹 Khi video kết thúc, auto play sang câu tiếp
  const handleVideoEnded = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setScore(null);
      setPressedTime(null);
      setShowHint(false);
      setOverlayActive(false);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }, 300);
    }
  };

  const handleRedoQuestion = (q) => {
    setCurrentIndex(q.index);
    setScore(null);
    setPressedTime(null);
    setShowHint(false);
    setOverlayActive(false);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 300);
  };

  if (!selected)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        ❌ Không có câu hỏi để luyện tập
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 relative">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 relative">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-700 mb-6">
          🎲 Đề ngẫu nhiên - 10 câu
        </h1>

        <div className="text-center text-gray-500 mb-2">
          Câu {currentIndex + 1}/{questions.length}
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {selected.title}
        </h2>

        {/* 🎬 Video */}
        <div className="relative">
          <video
            ref={videoRef}
            src={selected.video ? `/${selected.video}` : ""}
            controls
            autoPlay
            onEnded={handleVideoEnded}
            className="w-full rounded-lg mb-4"
          />

          {/* 💡 Gợi ý hình ảnh */}
          {showHint && selected.hintImage && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
              <img
                src={`/${selected.hintImage}`}
                alt="Hint"
                className="max-h-[70%] rounded-lg shadow-lg border border-white"
              />
              <button
                onClick={() => {
                  setShowHint(false);
                  setOverlayActive(false);
                  videoRef.current.play();
                }}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                ✅ Đã hiểu
              </button>
            </div>
          )}
        </div>

        {/* 🎯 Thanh màu điểm */}
        <div className="relative w-full h-5 rounded-full overflow-hidden border border-gray-300 shadow-inner mb-4">
          {getScoreSegments(selected.correctTimeStart, selected.correctTimeEnd).map(
            (seg, idx) => (
              <div
                key={idx}
                className="absolute top-0 h-full"
                style={{
                  left: `${(seg.start / selected.duration) * 100}%`,
                  width: `${((seg.end - seg.start) / selected.duration) * 100}%`,
                  backgroundColor: scoreColors[5 - seg.score],
                }}
                title={`${seg.score} điểm`}
              />
            )
          )}

          {pressedTime && (
            <div
              className="absolute text-red-600 transform -translate-x-1/2"
              style={{
                top: 0,
                fontSize: "1rem",
                left: `${getFlagPositionPercent(pressedTime, selected.duration)}%`,
              }}
            >
              🚩
            </div>
          )}
        </div>

        {/* 🔹 Nút tạo đề ngẫu nhiên mới */}
        <div className="flex justify-center mb-4">
          <button
            onClick={generateRandomExam}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            🔄 Tạo đề ngẫu nhiên mới
          </button>
        </div>

        {/* 🧮 Kết quả */}
        {score !== null && (
          <div
            className={`text-center text-xl font-bold mb-4 ${
              score > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            🚩 Bạn bấm tại {pressedTime}s → {score} điểm
          </div>
        )}

        <div className="text-center text-gray-500 mt-2">
          Tổng điểm: {totalScore} / {questions.length * 5}
        </div>

        {/* 🔔 Thông báo đạt hay cần luyện tập */}
        {currentIndex === questions.length - 1 && score !== null && (
          <div
            className={`mt-4 p-4 rounded-lg text-white font-bold text-center ${
              totalScore >= passingScore ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {totalScore >= passingScore
              ? "🎉 Chúc mừng! Bạn đã đạt"
              : "⚠️ Cần luyện tập thêm"}
          </div>
        )}

        {/* ⚠️ Câu chưa đạt */}
        {lowScoreQuestions.length > 0 && (
          <div className="mt-6 bg-yellow-50 p-3 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">
              ⚠️ Các câu cần luyện thêm:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {lowScoreQuestions.map((q) => (
                <li
                  key={q.index}
                  className="cursor-pointer hover:underline"
                  onClick={() => handleRedoQuestion(q)}
                >
                  {q.title} → {q.score} điểm
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/practice/simulation"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← Quay lại danh sách chủ đề
          </Link>
        </div>
      </div>
    </div>
  );
}
