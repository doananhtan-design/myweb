const fs = require('fs');

// đọc file 600 câu hỏi chưa có category
const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'));

// gán category theo id
questions.forEach(q => {
  if (q.id >= 1 && q.id <= 180) q.category = 'quydinh';
  else if (q.id >= 181 && q.id <= 205) q.category = 'vanhoa';
  else if (q.id >= 206 && q.id <= 263) q.category = 'kythuat';
  else if (q.id >= 264 && q.id <= 300) q.category = 'cautao';
  else if (q.id >= 301 && q.id <= 485) q.category = 'bienhieu';
  else if (q.id >= 486 && q.id <= 600) q.category = 'sahinh';
  
  // mặc định câu chưa phải câu điểm liệt
  q.isCritical = false;
});

// danh sách 60 câu điểm liệt (ví dụ)
const criticalIds = [
19,20,21,22,23,24,25,26,27,28,30,32,34,35,47,48,52,53,55,58,63,64,65,66,67,68,70,71,72,73,74,85,86,87,88,89,90,91,92,93,97,98,102,117,163,165,167,197,198,206,215,226,234,245,246,252,253,254,255,260
];

// gán isCritical = true cho các câu trong danh sách
questions.forEach(q => {
  if (criticalIds.includes(q.id)) q.isCritical = true;
});

// ghi ra file mới
fs.writeFileSync('./questions_with_category_and_critical.json', JSON.stringify(questions, null, 2));
console.log('Đã gán category và 60 câu điểm liệt theo danh sách!');
