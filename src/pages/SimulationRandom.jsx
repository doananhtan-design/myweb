import React, { useState, useRef, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import simulationQuestions from "../data/simulationQuestions.json";
import {
  getScoreSegments,
  getFlagPositionPercent,
  scoreColors,
  calculateScoreBy5Parts,
  useSpaceScore,
} from "../utils/scoreUtils";

// ✅ Bộ lọc nhóm chuyên đề
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

// ✅ Tên hiển thị chuyên đề
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

  // 🧩 Lọc danh sách câu hỏi
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
    } else {
      const categoryMap = {
        "do-thi": "Đô thị",
        "ngoai-do-thi": "Ngoài đô thị",
        "cao-toc": "Cao tốc",
        "doi-nui": "Đồi núi",
        "quoc-lo": "Quốc lộ",
        "tai-nan": "Tai nạn",
      };
      const categoryName = categoryMap[name];
      return categoryName
        ? simulationQuestions.filter((q) => q.category === categoryName)
        : [];
    }
  }, [name, chapter]);

  const title =
    name === "toan-bo" && chapter
      ? `Luyện tập toàn bộ - Chương ${chapter}`
      : topicTitles[name] || "Chủ đề không xác định";

  // 🧮 Trạng thái
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [pressedTime, setPressedTime] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [autoNext, setAutoNext] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [lowScoreQuestions, setLowScoreQuestions] = useState([]);
  const [allowRePress, setAllowRePress] = useState(true);

  const selected = questions[currentIndex];

  // 🔄 Theo dõi xoay ngang / dọc
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  useEffect(() => {
    const handleResize = () =>
      setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🎯 Gắn cờ điểm bằng phím cách
  useSpaceScore({
    videoRef,
    selected,
    onScore: ({ score: s, pressedTime: t }) => {
      if (overlayActive) return;
      setScore(s);
      setPressedTime(t);
      setTotalScore((prev) => prev + s);
      setAllowRePress(false);

      if (s < 4) {
        setShowHint(true);
        setOverlayActive(true);
        setLowScoreQuestions((prev) => [
          ...prev,
          { ...selected, index: currentIndex, score: s },
        ]);
        videoRef.current.pause();
      } else if (autoNext && currentIndex < questions.length - 1) {
        setTimeout(() => {
          nextQuestion();
        }, 2500);
      }
    },
    allowRePress,
  });

  // 🚩 Gắn cờ thủ công khi xoay ngang (nút bấm)
  const handleManualFlag = () => {
    if (overlayActive || !videoRef.current || !selected || !allowRePress) return;

    const current = videoRef.current.currentTime;
    const point = calculateScoreBy5Parts(
      current,
      selected.correctTimeStart,
      selected.correctTimeEnd
    );

    setScore(point);
    setPressedTime(current.toFixed(1));
    setTotalScore((prev) => prev + point);
    setAllowRePress(false);

    if (point < 4) {
      setShowHint(true);
      setOverlayActive(true);
      setLowScoreQuestions((prev) => [
        ...prev,
        { ...selected, index: currentIndex, score: point },
      ]);
      videoRef.current.pause();
    }
  };

  // 🔄 Reset trạng thái câu hiện tại (cho phép gắn cờ lại)
  const resetStateCurrent = () => {
    setScore(null);
    setPressedTime(null);
    setShowHint(false);
    setOverlayActive(false);
    setAllowRePress(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 relative">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 relative">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-700 mb-6">
          🎥 {title}
        </h1>

        <div className="text-center text-gray-500 mb-2">
          Câu {currentIndex + 1}/{questions.length}
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {selected.title}
        </h2>

        {/* 🎬 Video */}
        {selected.video ? (
          <video
            key={currentIndex}
            ref={videoRef}
            src={`/${selected.video}`}
            controls
            autoPlay
            onEnded={() => {
              if (autoNext && currentIndex < questions.length - 1) {
                nextQuestion();
              }
            }}
            className="w-full rounded-lg mb-3"
          />
        ) : (
          <div className="text-center text-red-500 my-4">
            ❌ Thiếu video cho câu này
          </div>
        )}

        {/* 🚩 Nút gắn cờ (chỉ hiện khi xoay ngang hoặc mobile) */}
        {isLandscape && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleManualFlag}
              disabled={overlayActive || !allowRePress}
              className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-red-700 transition disabled:opacity-50"
            >
              🚩 Gắn cờ
            </button>
          </div>
        )}

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

        {/* 🎮 Điều khiển */}
        <div className="flex justify-between mb-4 gap-2">
          <button
            onClick={nextQuestion}
            disabled={overlayActive}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
          >
            Câu tiếp
          </button>

          <button
            onClick={() => setAutoNext((prev) => !prev)}
            disabled={overlayActive}
            className={`px-4 py-2 rounded-lg transition ${
              autoNext ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            } disabled:opacity-50`}
          >
            {autoNext ? "⏸ Dừng tự chạy" : "▶️ Tự chạy"}
          </button>

          {/* 🔁 Làm lại */}
          <button
            onClick={() => {
              resetStateCurrent();
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
              }
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            🔁 Làm lại
          </button>

          <button
            onClick={() => {
              setShowHint(true);
              setOverlayActive(true);
              videoRef.current.pause();
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            💡 Gợi ý
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
            to="/simulation/topics"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← Quay lại danh sách chủ đề
          </Link>
        </div>
      </div>
    </div>
  );
}
