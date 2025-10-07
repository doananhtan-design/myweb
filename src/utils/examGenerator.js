// src/utils/examGenerator.js
import questionsData from "../data/questions.json";
import questionsA1 from "../data/questionsA1.json";

// cấu trúc đề thi
export const examStructure = {
  A1: { total: 25, quydinh: 8, nghiemtrong: 1, vanhoa: 1, kythuat: 1, cautao: 0, bienhieu: 8, sahinh: 6, time: 19, passing: 22 },
  B:  { total: 30, quydinh: 8, nghiemtrong: 1, vanhoa: 1, kythuat: 1, cautao: 1, bienhieu: 9, sahinh: 9, time: 20, passing: 27 },
  C1: { total: 35, quydinh: 10, nghiemtrong: 1, vanhoa: 1, kythuat: 2, cautao: 1, bienhieu: 10, sahinh: 10, time: 22, passing: 32 },
  C:  { total: 40, quydinh: 10, nghiemtrong: 1, vanhoa: 1, kythuat: 2, cautao: 1, bienhieu: 14, sahinh: 11, time: 24, passing: 36 },
  D:  { total: 45, quydinh: 10, nghiemtrong: 1, vanhoa: 1, kythuat: 2, cautao: 1, bienhieu: 16, sahinh: 14, time: 26, passing: 41 },
};

function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// tạo ngân hàng đề cố định (ví dụ 20 đề)
export function createFixedExams(license, numExams = 20) {
  const allQuestions = license === "A1" ? questionsA1 : questionsData;
  const structure = examStructure[license];
  const exams = [];

  for (let i = 0; i < numExams; i++) {
    let selected = [];

    Object.keys(structure).forEach(cat => {
      if (["total","time","passing"].includes(cat)) return;
      const count = structure[cat];
      const pool = allQuestions.filter(q => q.category === cat);
      if (pool.length >= count) selected.push(...shuffle(pool).slice(0, count));
      else selected.push(...pool);
    });

    while (selected.length < structure.total) {
      const extra = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      if (!selected.some(q => q.id === extra.id)) selected.push(extra);
      if (selected.length === allQuestions.length) break;
    }

    exams.push(shuffle(selected).slice(0, structure.total));
  }

  return exams;
}

// lấy đề cố định theo số đề
export function getFixedExam(license, examNum, fixedExams) {
  return fixedExams[license][examNum - 1] || [];
}

// lấy đề ngẫu nhiên
export function getRandomExam(license) {
  const allQuestions = license === "A1" ? questionsA1 : questionsData;
  const structure = examStructure[license];
  const selected = [];

  Object.keys(structure).forEach(cat => {
    if (["total","time","passing"].includes(cat)) return;
    const count = structure[cat];
    const pool = allQuestions.filter(q => q.category === cat);
    if (pool.length >= count) selected.push(...shuffle(pool).slice(0, count));
    else selected.push(...pool);
  });

  while (selected.length < structure.total) {
    const extra = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    if (!selected.some(q => q.id === extra.id)) selected.push(extra);
    if (selected.length === allQuestions.length) break;
  }

  return shuffle(selected).slice(0, structure.total);
}
