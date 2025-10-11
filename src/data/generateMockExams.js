// generateMockExams.js
import fs from "fs";

const data = fs.readFileSync("./simulationQuestions.json", "utf-8");
const questionsData = JSON.parse(data);

const totalExams = 12;
const structure = { 1: 2, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1 };

// Nhóm câu hỏi theo chương
const chapters = {};
questionsData.forEach((q) => {
  if (!chapters[q.chapter]) chapters[q.chapter] = [];
  chapters[q.chapter].push(q);
});

const exams = [];

for (let examIndex = 0; examIndex < totalExams; examIndex++) {
  const examQuestions = [];

  for (const [chapter, count] of Object.entries(structure)) {
    const chapterQuestions = chapters[chapter] || [];
    const start = examIndex * count;
    const selected = [];

    for (let i = 0; i < count; i++) {
      const idx = (start + i) % chapterQuestions.length;
      selected.push(chapterQuestions[idx]);
    }

    examQuestions.push(...selected);
  }

  exams.push({
    id: examIndex + 1,
    title: `Đề thi thử số ${examIndex + 1}`,
    questions: examQuestions.map((q) => ({
      id: q.id,
      title: q.title,
      category: q.category,
      chapter: q.chapter,
      video: q.video,
      hintImage: q.hintImage,
      correctTimeStart: q.correctTimeStart,
      correctTimeEnd: q.correctTimeEnd,
      duration: q.duration,
    })),
  });
}

fs.writeFileSync("./mockExams.json", JSON.stringify(exams, null, 2), "utf-8");
console.log("✅ Đã tạo file mockExams.json thành công!");
