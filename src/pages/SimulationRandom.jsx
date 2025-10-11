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
  const passingScore = 35;

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
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6 relative">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-4 sm:p-6 relative">
        <h1 className="text-lg sm:text-2xl font-bold text-center text-blue-700 mb-3">
          🎲 Đề ngẫu nhiên - 10 câu
        </h1>

        <div className="text-center text-gray-500 mb-2 text-sm sm:text-base">
          Câu {currentIndex + 1}/{questions.length}
        </div>

        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
          {selected.title}
        </h2>

        {/* 🎬 Video (to hơn + tương thích mobile landscape) */}
        <div className="relative">
          <video
            ref={videoRef}
            src={selected.video ? `/${selected.video}` : ""}
            controls
            autoPlay
            playsInline
            webkit-playsinline="true"
            onEnded={handleVideoEnded}
            className="w-full max-h-[90vh] sm:max-h-[75vh] object-contain rounded-xl shadow-lg mb-3"
            style={{ aspectRatio: "16/9" }}
          />

          {/* 💡 Gợi ý hình ảnh */}
          {showHint && selected.hintImage && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
              <img
                src={`/${selected.hintImage}`}
                alt="Hint"
                className="max-h-[75%] rounded-lg shadow-lg border border-white"
              />
              <button
                onClick={() => {
                  setShowHint(false);
                  setOverlayActive(false);
                  videoRef.current.play();
                }}
                className="mt-4 bg-green-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                ✅ Đã hiểu
              </button>
            </div>
          )}
        </div>

        {/* 🎯 Thanh điểm */}
        <div className="relative w-full h-4 rounded-full overflow-hidden border border-gray-300 shadow-inner mb-3">
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
              />
            )
          )}
          {pressedTime && (
            <div
              className="absolute text-red-600 transform -translate-x-1/2"
              style={{
                top: 0,
                left: `${getFlagPositionPercent(pressedTime, selected.duration)}%`,
              }}
            >
              🚩
            </div>
          )}
        </div>

        {/* 🚩 Nút gắn cờ luôn hiển thị trên mobile */}
        <button
          onClick={() => {
            if (!videoRef.current || overlayActive) return;
            const t = Math.floor(videoRef.current.currentTime * 10) / 10;
            const s = getScoreSegments(
              selected.correctTimeStart,
              selected.correctTimeEnd
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
          }}
          className="fixed bottom-4 right-4 z-50 sm:hidden bg-red-500 text-white font-semibold px-4 py-3 rounded-full shadow-lg active:scale-95"
        >
          🚩 Gắn cờ
        </button>

        {/* 🔹 Nút tạo đề ngẫu nhiên mới */}
        <div className="flex justify-center mb-3">
          <button
            onClick={generateRandomExam}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
          >
            🔄 Tạo đề mới
          </button>
        </div>

        {/* 🧮 Kết quả */}
        {score !== null && (
          <div
            className={`text-center text-base sm:text-xl font-bold mb-3 ${
              score > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            🚩 Bạn bấm tại {pressedTime}s → {score} điểm
          </div>
        )}

        <div className="text-center text-gray-600 mb-3 text-sm sm:text-base">
          Tổng điểm: {totalScore} / {questions.length * 5}
        </div>

        {/* 🔔 Kết quả cuối */}
        {currentIndex === questions.length - 1 && score !== null && (
          <div
            className={`mt-3 p-3 rounded-lg text-white font-bold text-center text-sm sm:text-base ${
              totalScore >= passingScore ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {totalScore >= passingScore
              ? "🎉 Chúc mừng! Bạn đã đạt"
              : "⚠️ Cần luyện tập thêm"}
          </div>
        )}

        {/* ⚠️ Câu cần luyện thêm */}
        {lowScoreQuestions.length > 0 && (
          <div className="mt-4 bg-yellow-50 p-3 rounded-lg text-sm">
            <h3 className="font-semibold text-yellow-800 mb-2">
              ⚠️ Các câu cần luyện thêm:
            </h3>
            {lowScoreQuestions.map((q) => (
              <p
                key={q.index}
                className="cursor-pointer hover:underline"
                onClick={() => handleRedoQuestion(q)}
              >
                {q.title} → {q.score} điểm
              </p>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <Link
            to="/practice/simulation"
            className="text-gray-600 hover:text-gray-800 underline text-sm"
          >
            ← Quay lại danh sách chủ đề
          </Link>
        </div>
      </div>
    </div>
  );
}
