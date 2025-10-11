import React, { useEffect, useState } from "react";

/**
 * 🎯 Tính điểm chia 5 phần từ start → end
 */
export const calculateScoreBy5Parts = (pressTime, start, end) => {
  if (pressTime < start || pressTime > end) return 0;
  const part = (end - start) / 5;
  if (pressTime <= start + part) return 5;
  if (pressTime <= start + 2 * part) return 4;
  if (pressTime <= start + 3 * part) return 3;
  if (pressTime <= start + 4 * part) return 2;
  return 1;
};

/**
 * 🎨 Màu thang điểm từ cao → thấp (5→1)
 * 🟥🟧🟨🟦🟩 = đỏ, cam, vàng, xanh dương, xanh lá
 */
export const scoreColors = [
  "#00cc44", // 5 điểm (xanh lá)
  "#007bff", // 4 điểm (xanh dương)
  "#ffff00", // 3 điểm (vàng)
  "#ff7f00", // 2 điểm (cam)
  "#ff0000", // 1 điểm (đỏ)
];

/**
 * Trả về màu theo điểm (5→1)
 */
export const scoreToColor = (score) => {
  if (score < 1 || score > 5) return "#ccc";
  return scoreColors[5 - score];
};

/**
 * 🚩 Tính vị trí cờ đỏ trên thanh timeline (%)
 */
export const getFlagPositionPercent = (pressTime, videoDuration) => {
  if (!videoDuration || pressTime < 0) return 0;
  let percent = (pressTime / videoDuration) * 100;
  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;
  return percent;
};

/**
 * 🧩 Tạo mảng 5 phần điểm cho thanh hiển thị (start → end)
 */
export const getScoreSegments = (start, end) => {
  const part = (end - start) / 5;
  const segments = [];
  for (let i = 0; i < 5; i++) {
    segments.push({
      start: start + i * part,
      end: start + (i + 1) * part,
      score: 5 - i,
    });
  }
  return segments;
};

/**
 * ⌨️ Hook: Lắng nghe phím Space
 * - Chỉ cho bấm 1 lần mỗi lượt xem
 * - Có thể mở lại khi `allowRePress = true`
 */
export const useSpaceScore = ({ videoRef, selected, allowRePress = false, onScore }) => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && selected && videoRef.current && (!pressed || allowRePress)) {
        e.preventDefault();
        const current = videoRef.current.currentTime;

        const point = calculateScoreBy5Parts(
          current,
          selected.correctTimeStart,
          selected.correctTimeEnd
        );

        onScore({ score: point, pressedTime: current.toFixed(1) });
        setPressed(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, videoRef, onScore, pressed, allowRePress]);

  // 🔄 Reset khi đổi câu
  useEffect(() => {
    setPressed(false);
  }, [selected]);
};

/**
 * 🧭 Hook quản lý “Câu tiếp / Tự chạy / Xem lại”
 * - goNext(): chuyển câu tiếp theo
 * - replay(): xem lại video hiện tại
 * - autoNext: tự động chuyển câu
 */
export const useQuestionControl = ({
  questions,
  currentIndex,
  setCurrentIndex,
  autoNext,
  videoRef,
}) => {
  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const replay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (autoNext && currentIndex < questions.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1500); // delay 1.5s
      return () => clearTimeout(timer);
    }
  }, [autoNext, currentIndex, questions.length, setCurrentIndex]);

  return { goNext, replay };
};
