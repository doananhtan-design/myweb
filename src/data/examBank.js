// src/data/examBank.js
// Tập hợp toàn bộ các bộ đề cố định theo từng hạng

import exams_A1 from "./exams_A1.json";
import exams_B from "./exams_B.json";
import exams_C1 from "./exams_C1.json";
import exams_C from "./exams_C.json";
import exams_D from "./exams_D.json";

export const fixedExamBank = {
  A1: exams_A1,
  B: exams_B,
  C1: exams_C1,
  C: exams_C,
  D: exams_D,
};

// ✅ Hàm tiện ích: Lấy danh sách đề theo hạng
export function getFixedExamList(license) {
  return fixedExamBank[license] || [];
}

// ✅ Hàm tiện ích: Lấy 1 đề cụ thể theo chỉ số
export function getFixedExam(license, index = 0) {
  const list = fixedExamBank[license];
  if (!list || !Array.isArray(list)) return null;
  return list[index] || null;
}
