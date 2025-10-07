import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { examStructure } from "./data/examStructure.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Đọc JSON bằng fs
const questionsAll = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/questions.json"), "utf-8")
);
const questionsA1 = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/questionsA1.json"), "utf-8")
);

// 🔹 Cấu hình số đề cho từng hạng (tùy bạn chỉnh)
const setsPerLicense = {
  A1: 25,
  B: 20,
  C1: 18,
  C: 15,
  D: 14,
};

// Shuffle mảng
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Lấy ngẫu nhiên n phần tử
function sample(arr, n) {
  return shuffle(arr).slice(0, n);
}

// 🔹 Sinh đề cho từng hạng (cho phép lặp)
function generateExamSets_allowRepeat(license = "A1", numSets = 25) {
  const config = examStructure[license];
  if (!config) throw new Error("Loại bằng không hợp lệ: " + license);

  const bank = license === "A1" ? questionsA1 : questionsAll;

  // Gom theo category
  const pools = {};
  for (const q of bank) {
    if (!pools[q.category]) pools[q.category] = [];
    pools[q.category].push(q);
  }

  const sets = [];
  for (let i = 0; i < numSets; i++) {
    let exam = [];

    // chọn theo cấu trúc từng nhóm
    for (const [cat, count] of Object.entries(config)) {
      if (["total", "time", "passing"].includes(cat)) continue;
      const pool = pools[cat] || [];
      if (pool.length === 0) continue;

      const chosen =
        pool.length >= count ? sample(pool, count) : sample(pool, pool.length);
      exam.push(...chosen);
    }

    // nếu chưa đủ tổng thì bù từ toàn bộ ngân hàng
    if (exam.length < config.total) {
      const need = config.total - exam.length;
      const remaining = bank.filter((q) => !exam.includes(q));
      if (remaining.length >= need) {
        exam.push(...sample(remaining, need));
      } else {
        exam.push(...sample(bank, need)); // cho phép lặp
      }
    }

    exam = shuffle(exam);

    sets.push({
      license,
      title: `${license} - Đề ${String(i + 1).padStart(2, "0")}`, // 👈 đánh số đề
      time: config.time,
      passing: config.passing,
      questions: exam,
    });
  }

  return sets;
}

// 🔹 Sinh đề cho từng hạng dựa trên setsPerLicense
const all_sets = {};
for (const license of Object.keys(examStructure)) {
  const numSets = setsPerLicense[license] || 25; // mặc định 25 nếu không config
  all_sets[license] = generateExamSets_allowRepeat(license, numSets);
  console.log(`✔ Đã tạo ${numSets} đề cho hạng ${license}`);
}

// 🔹 Xuất ra file
const outPath = path.join(__dirname, "allExams.json");
fs.writeFileSync(outPath, JSON.stringify(all_sets, null, 2), "utf-8");
console.log(`\n📄 Xuất thành công: ${outPath}`);
