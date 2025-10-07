const fs = require("fs");

// Đọc file gốc (600 câu)
const all = JSON.parse(fs.readFileSync("questions600.json", "utf8"));

// Lọc ra chỉ những câu dùng cho A1
const a1 = all.filter(q => q.applyFor.includes("A1"));

// Kiểm tra số lượng
console.log("Tổng số câu A1:", a1.length);

// Ghi ra file mới
fs.writeFileSync("questionsA1.json", JSON.stringify(a1, null, 2), "utf8");

console.log("✅ Đã tạo xong file questionsA1.json");
