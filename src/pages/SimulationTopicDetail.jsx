import React, { useState, useRef, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import simulationQuestions from "../data/simulationQuestions.json";
import {
  getScoreSegments,
  getFlagPositionPercent,
  scoreColors,
  useSpaceScore,
} from "../utils/scoreUtils";

const groupFilters = {
  "toan-bo": (q) => true,
  "phanh-xe": (q) =>
    q.title.toLowerCase().includes("phanh") ||
    q.description?.toLowerCase().includes("phanh"),
  "xuat-hien-dau-xe": (q) =>
    q.title.toLowerCase().includes("đầu xe") ||
    q.description?.toLowerCase().includes("đầu xe"),
  "xi-nhan": (q) =>
    q.title.toLowerCase().includes("xi nhan") ||
    q.description?.toLowerCase().includes("xi-nhan"),
  "lan-lan-de-vach": (q) =>
    q.title.toLowerCase().includes("lấn làn") ||
    q.title.toLowerCase().includes("vạch") ||
    q.description?.toLowerCase().includes("vạch"),
  "nguy-hiem-bat-ngo": (q) =>
    q.title.toLowerCase().includes("bất ngờ") ||
    q.description?.toLowerCase().includes("bất ngờ"),
};

const topicTitles = {
  "toan-bo": "Luyện tập toàn bộ",
  "phanh-xe": "Nhóm Phanh xe",
  "xuat-hien-dau-xe": "Nhóm Xuất hiện đầu xe",
  "xi-nhan": "Nhóm Xi nhan",
  "lan-lan-de-vach": "Nhóm Lấn làn, đè vạch",
  "nguy-hiem-bat-ngo": "Nhóm Nguy hiểm bất ngờ",
};

export default function SimulationTopicDetail() {
  const { name, chapter } = useParams();
  const videoRef = useRef(null);
  const [allowRePress, setAllowRePress] = useState(false);

  const questions = useMemo(() => {
    if (name === "toan-bo") {
      if (chapter) {
        return simulationQuestions.filter(
          (q) => Number(q.chapter) === Number(chapter)
        );
      }
      return simulationQuestions;
    } else if (groupFilters[name]) {
      return simulationQuestions.filter(groupFilters[name]);
    }
    return [];
  }, [name, chapter]);

  const title =
    name === "toan-bo" && chapter
      ? `Luyện tập toàn bộ - Chương ${chapter}`
      : topicTitles[name] || "Chủ đề không xác định";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [pressedTime, setPressedTime] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [autoNext, setAutoNext] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [lowScoreQuestions, setLowScoreQuestions] = useState([]);

  const selected = questions[currentIndex];

  useSpaceScore({
    videoRef,
    selected,
    allowRePress,
    onScore: ({ score: s, pressedTime: t }) => {
      if (overlayActive) return;
      setScore(s);
      setPressedTime(t);
      setTotalScore((p) => p + s);
      if (s < 4) {
        setShowHint(true);
        setOverlayActive(true);
        setLowScoreQuestions((p) => [
          ...p,
          { ...selected, index: currentIndex, score: s },
        ]);
        videoRef.current.pause();
      } else if (autoNext && currentIndex < questions.length - 1) {
        setTimeout(() => nextQuestion(), 2500);
      }
    },
  });

  const resetStateCurrent = () => {
    setScore(null);
    setPressedTime(null);
    setShowHint(false);
    setOverlayActive(false);
    setAllowRePress(false);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((p) => p + 1);
      resetStateCurrent();
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
    resetStateCurrent();
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
        ❌ Không có dữ liệu cho chủ đề này
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-3 sm:p-6">
        <h1 className="text-lg sm:text-2xl font-bold text-center text-blue-700 mb-2">
          🎥 {title}
        </h1>

        <div className="text-center text-gray-500 mb-2">
          Câu {currentIndex + 1}/{questions.length}
        </div>

        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
          {selected.title}
        </h2>

        {/* 🎬 VIDEO TO GẤP ĐÔI VÀ TƯƠNG THÍCH MOBILE */}
        {selected.video ? (
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg mb-3">
            <video
              key={currentIndex}
              ref={videoRef}
              src={`/${selected.video}`}
              controls
              autoPlay
              playsInline
              webkit-playsinline="true"
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
              style={{ aspectRatio: "16/9" }}
              onEnded={() => {
                if (autoNext && currentIndex < questions.length - 1) nextQuestion();
              }}
            />
          </div>
        ) : (
          <div className="text-center text-red-500 my-4">❌ Thiếu video cho câu này</div>
        )}

        {/* Gợi ý */}
        {showHint && selected.hintImage && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
            <img
              src={`/${selected.hintImage}`}
              alt="Hint"
              className="max-h-[80%] rounded-lg shadow-lg border border-white"
            />
            <button
              onClick={() => {
                setShowHint(false);
                setOverlayActive(false);
                videoRef.current.play();
              }}
              className="mt-4 bg-green-600 text-white px-3 py-2 rounded-md text-sm"
            >
              ✅ Đã hiểu
            </button>
          </div>
        )}

        {/* Thanh điểm */}
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
                left: `${getFlagPositionPercent(
                  pressedTime,
                  selected.duration
                )}%`,
              }}
            >
              🚩
            </div>
          )}
        </div>

        {/* Nút điều khiển nhỏ gọn */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4 text-sm">
          <button
            onClick={nextQuestion}
            disabled={overlayActive}
            className="bg-green-500 text-white px-2 py-2 rounded-md hover:bg-green-600"
          >
            ▶️ Tiếp
          </button>
          <button
            onClick={() => setAutoNext((p) => !p)}
            className={`px-2 py-2 rounded-md ${
              autoNext ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {autoNext ? "⏸ Dừng" : "▶️ Tự"}
          </button>
          <button
            onClick={() => {
              resetStateCurrent();
              setAllowRePress(true);
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }}
            className="bg-gray-500 text-white px-2 py-2 rounded-md hover:bg-gray-600"
          >
            🔁 Lại
          </button>
          <button
            onClick={() => {
              setShowHint(true);
              setOverlayActive(true);
              videoRef.current.pause();
            }}
            className="bg-yellow-500 text-white px-2 py-2 rounded-md hover:bg-yellow-600"
          >
            💡 Gợi ý
          </button>
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
              setTotalScore((p) => p + s);
              if (s < 4) {
                setShowHint(true);
                setOverlayActive(true);
                videoRef.current.pause();
              } else if (autoNext && currentIndex < questions.length - 1) {
                setTimeout(() => nextQuestion(), 2000);
              }
            }}
            className="bg-red-500 text-white font-semibold px-2 py-2 rounded-md hover:bg-red-600"
          >
            🚩 Gắn cờ
          </button>
        </div>

        {/* Kết quả */}
        {score !== null && (
          <div
            className={`text-center text-base font-bold mb-2 ${
              score > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            🚩 Bấm tại {pressedTime}s → {score} điểm
          </div>
        )}

        <div className="text-center text-gray-600 mb-4">
          Tổng điểm: {totalScore} / {questions.length * 5}
        </div>

        {lowScoreQuestions.length > 0 && (
          <div className="bg-yellow-50 p-3 rounded-lg text-sm">
            <h3 className="font-semibold text-yellow-800 mb-1">
              ⚠️ Câu cần luyện thêm:
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

        <div className="text-center mt-4">
          <Link to="/simulation/topics" className="text-gray-600 underline text-sm">
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    </div>
  );
}
