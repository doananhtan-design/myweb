// src/scripts/buildAllFixedExams.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { examStructure } from "../config/examStructure.js";
import { generateFixedExams } from "../utils/generateFixedExams.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Helper đọc file JSON ===
const readJSON = (p) =>
  JSON.parse(fs.readFileSync(path.resolve(__dirname, p), "utf-8"));

// === Dữ liệu nguồn ===
const questionsCar = readJSON("../data/questions.json");
const questionsA1 = readJSON("../data/questionsA1.json");

const OUTPUT_DIR = path.resolve(__dirname, "../data");

// === Số đề cố định theo yêu cầu ===
const examCount = {
  A1: 10,
  B: 20,
  C1: 18,
  C: 15,
  D: 14,
};

// Gom các hạng và ngân hàng tương ứng
const questionSets = {
  A1: questionsA1,
  B: questionsCar,
  C1: questionsCar,
  C: questionsCar,
  D: questionsCar,
};

// Tạo thư mục data nếu chưa có
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const allExams = {};

for (const [license, questionSet] of Object.entries(questionSets)) {
  const totalQuestions = questionSet.length;
  const totalPerExam = examStructure[license].total;
  const numExams = examCount[license] ?? 10; // mặc định 10 nếu thiếu

  console.log(
    `⚙️  Hạng ${license}: ${totalQuestions} câu / ${totalPerExam} câu/đề → ${numExams} đề`
  );

  // Sinh đề
  const exams = generateFixedExams(questionSet, examStructure, license, numExams);
  allExams[license] = exams;

  // Xuất file riêng cho từng hạng
  const outFile = path.join(OUTPUT_DIR, `exams_${license}.json`);
  fs.writeFileSync(outFile, JSON.stringify(exams, null, 2), "utf-8");
  console.log(`✅ Đã tạo ${outFile} (${exams.length} đề)\n`);
}

// Gộp tất cả lại file tổng hợp
const allFile = path.join(OUTPUT_DIR, "allExams.json");
fs.writeFileSync(allFile, JSON.stringify(allExams, null, 2), "utf-8");

console.log("🎯 Hoàn tất! Sinh đúng số đề theo quy định:");
Object.entries(allExams).forEach(([k, v]) => {
  console.log(`   - ${k}: ${v.length} đề`);
});
