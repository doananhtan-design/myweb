// src/utils/generateFixedExams.js

export function generateFixedExams(questions, examStructure, license = "B", numExams = 20) {
  const structure = examStructure[license];
  if (!structure) throw new Error(`Không tìm thấy cấu trúc cho hạng ${license}`);

  const exams = Array.from({ length: numExams }, (_, i) => ({
    id: i + 1,
    name: `Đề ${i + 1}`,
    questions: [],
  }));

  // Gom câu hỏi theo category
  const categorized = {};
  Object.keys(structure).forEach((key) => {
    if (key !== "total") {
      categorized[key] = questions.filter((q) => q.category === key);
    }
  });

  // Phân bố đều câu hỏi
  Object.entries(categorized).forEach(([cat, pool]) => {
    const perExam = structure[cat];
    if (!perExam || pool.length === 0) return;

    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    // Đảm bảo mỗi câu xuất hiện ít nhất 1 lần
    shuffled.forEach((q, i) => {
      const idx = i % numExams;
      exams[idx].questions.push(q);
    });

    // Bổ sung ngẫu nhiên cho đủ số lượng
    exams.forEach((exam) => {
      while (exam.questions.filter((q) => q.category === cat).length < perExam) {
        const randomQ = pool[Math.floor(Math.random() * pool.length)];
        exam.questions.push(randomQ);
      }
    });
  });

  // Cắt đúng số câu quy định
  exams.forEach((exam) => {
    if (exam.questions.length > structure.total) {
      exam.questions = exam.questions.slice(0, structure.total);
    }
  });

  return exams;
}
