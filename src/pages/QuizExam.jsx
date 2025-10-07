import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import HeaderCenter from "../components/HeaderCenter";
import ExamStatusBanner from "../components/ExamStatusBanner";
import { examStructure, getRandomExam } from "../utils/examGenerator";
import { fixedExamBank } from "../data/examBank";

export default function QuizExam() {
  const { license } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const mode = state?.mode || "practice";
  const name = state?.name || "";
  const examMode = state?.examMode || "random";
  const selectedExamIndex = state?.selectedExam || 0;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [toast, setToast] = useState(null);
  const [started, setStarted] = useState(true);

  const showToast = (msg, duration = 2000) => {
    setToast({ message: msg });
    setTimeout(() => setToast(null), duration);
  };

  // 🎯 Load câu hỏi (random hoặc fixed)
  useEffect(() => {
    if (!started) return;

    let qs = [];
    if (examMode === "fixed") {
      const bank = fixedExamBank[license];
      if (bank && bank[selectedExamIndex]) {
        const exam = bank[selectedExamIndex];
        qs = exam.questions || [];
        console.log(`📘 Đang thi ${exam.name || "Đề cố định"} (${license})`);
      } else {
        console.warn("Không tìm thấy đề cố định, fallback sang ngẫu nhiên");
        qs = getRandomExam(license);
      }
    } else {
      qs = getRandomExam(license);
    }

    setQuestions(qs);
    if ((mode === "exam" || mode === "practice") && started) {
      setTimeLeft(examStructure[license]?.time * 60 || 1200);
    }
  }, [started, license, mode, examMode, selectedExamIndex]);

  // 🕒 Đồng hồ đếm ngược
  useEffect(() => {
    if ((mode !== "exam" && mode !== "practice") || timeLeft === null) return;
    if (timeLeft <= 0) {
      handleFinish(true);
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, mode]);

  const handleSelect = (qid, key) => setAnswers((p) => ({ ...p, [qid]: key }));
  const handleNext = () => current < questions.length - 1 && setCurrent(current + 1);
  const handlePrev = () => current > 0 && setCurrent(current - 1);
  const handleJump = (i) => setCurrent(i);

  // ✅ Khi nộp bài
  const handleFinish = (force = false) => {
    const unans = questions.findIndex((q) => !answers[q.id]);
    if (!force && unans !== -1) {
      setCurrent(unans);
      showToast(`Bạn chưa trả lời hết câu hỏi (chuyển tới câu ${unans + 1})`);
      return;
    }

    // Tính điểm
    const result = questions.map((q) => ({
      id: q.id,
      question: q.question,
      answers: q.answers,
      selected: answers[q.id] || null,
      correct: q.correctAnswer,
      category: q.category,
      suggestion: q.HINT || q.hint || q.explain || q.suggestion || "",
      isLiet: q.category === "nghiemtrong" && answers[q.id] !== q.correctAnswer,
    }));

    const total = questions.length;
    const correctCount = result.filter(
      (q) => String(q.selected) === String(q.correct)
    ).length;

    // 💾 Lưu tiến độ (chỉ khi là đề cố định)
    if (examMode === "fixed") {
      const key = `examProgress_${license}`;
      const saved = JSON.parse(localStorage.getItem(key) || "{}");
      const examId = selectedExamIndex + 1;
      saved[`Đề ${examId}`] = {
        score: correctCount,
        total,
        date: new Date().toLocaleDateString("vi-VN"),
      };
      localStorage.setItem(key, JSON.stringify(saved));
    }

    navigate("/result", {
      replace: true,
      state: {
        answers: result,
        total,
        license,
        passing: examStructure[license]?.passing,
        name,
        score: correctCount,
      },
    });
  };

  const handleExit = () => {
    const done = Object.keys(answers).length;
    if (done < questions.length) {
      if (
        !window.confirm(
          `Bạn mới làm ${done}/${questions.length} câu. Thoát ra sẽ mất bài, bạn chắc chứ?`
        )
      )
        return;
    }
    navigate("/practice/theory");
  };

  const fmt = (sec) => {
    if (sec == null) return "--:--";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!questions?.length)
    return (
      <div className="p-6 text-center text-red-600">
        ❌ Không load được câu hỏi ({license} - {examMode})
      </div>
    );

  const q = questions[current];
  const struct = examStructure[license];
  const done = Object.keys(answers).length;

  return (
    <div className="relative min-h-screen p-4 bg-gradient-to-b from-white via-red-50 to-yellow-50 flex flex-col items-center">
      <button
        onClick={handleExit}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
      >
        Thoát
      </button>

      <HeaderCenter size="w-20 h-20" />

      <div className="w-full max-w-5xl mb-2 flex items-center justify-between">
        <div>
          <p className="font-bold">🚗 Hạng: {license}</p>
          {struct && (
            <p>
              Cần đạt: {struct.passing}/{struct.total} câu ({struct.time} phút)
            </p>
          )}
          {examMode === "fixed" && (
            <p className="text-sm text-purple-700 font-semibold">
              📘 Đề cố định số {selectedExamIndex + 1}
            </p>
          )}
          {name && <p className="text-blue-700 font-semibold">👤 {name}</p>}
        </div>

        <div className="flex items-center gap-4">
          <ExamStatusBanner
            mode={mode}
            examMode={examMode}
            selectedExam={selectedExamIndex}
          />
          <p className="text-xl font-extrabold text-red-600 bg-yellow-200 px-4 py-2 rounded-lg shadow-md">
            ⏱ {fmt(timeLeft)}
          </p>
        </div>
      </div>

      {/* Câu hỏi */}
      <div className="w-full max-w-5xl grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2 bg-white rounded shadow p-6">
          <h2 className="text-lg font-bold mb-2">
            Câu {current + 1}/{questions.length}{" "}
            <span className="text-sm text-gray-500">(Đã làm: {done})</span>
          </h2>

          <div className="w-full h-3 bg-gray-200 rounded-full mb-4">
            <div
              className="h-3 bg-blue-500 rounded-full"
              style={{ width: `${(done / questions.length) * 100}%` }}
            />
          </div>

          <p className="mb-4">{q.question}</p>

          {/* 🖼 Hiển thị hình ảnh nếu có */}
    {console.log("🧩 Image path test:", `${window.location.origin}/images/${q.image}`)}     
{q.image && (
  <div className="flex justify-center mb-4">
    <img
      src={`${import.meta.env.BASE_URL}images/${q.image}`}
      alt="Hình minh họa"
      className="max-h-60 rounded shadow-md border border-gray-200"
      onError={(e) => (e.target.style.display = "none")}
    />
  </div>
)}

          <div className="space-y-2">
            {q.answers?.map((ans, idx) => {
              const sel = answers[q.id];
              let bg = "";
              if (mode === "practice" && sel) {
                if (ans.key === sel)
                  bg =
                    sel === q.correctAnswer
                      ? "bg-green-200 border-green-600"
                      : "bg-red-200 border-red-600";
                else if (ans.key === q.correctAnswer)
                  bg =
                    sel !== q.correctAnswer ? "bg-green-100 border-green-400" : "";
              } else bg = sel === ans.key ? "border-blue-500 bg-blue-50" : "";

              return (
                <label
                  key={ans.key}
                  className={`flex items-center space-x-2 p-2 border rounded cursor-pointer ${bg}`}
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={sel === ans.key}
                    onChange={() => handleSelect(q.id, ans.key)}
                    disabled={mode === "practice" && !!sel}
                  />
                  <span>
                    {idx + 1}. {ans.text}
                  </span>
                </label>
              );
            })}
          </div>

          {mode === "practice" &&
            q.category === "nghiemtrong" &&
            answers[q.id] &&
            answers[q.id] !== q.correctAnswer && (
              <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-600 text-red-800 rounded shadow">
                ⚠️ Sai câu điểm liệt ⇒ trượt ngay!
              </div>
            )}

          {mode === "practice" && (q.HINT || q.hint || q.explain) && (
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded shadow">
              💡 {q.HINT || q.hint || q.explain}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={current === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Câu trước
            </button>
            {current === questions.length - 1 ? (
              <button
                onClick={() => handleFinish(false)}
                className={`px-4 py-2 rounded text-white ${
                  done < questions.length
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Nộp bài
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Câu sau
              </button>
            )}
          </div>
        </div>

        {/* Danh sách câu hỏi */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-3">Danh sách câu hỏi</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, idx) => {
              const isCur = idx === current;
              const isAns = !!answers[questions[idx].id];
              return (
                <button
                  key={idx}
                  onClick={() => handleJump(idx)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold border ${
                    isCur
                      ? "bg-orange-400 border-black text-white"
                      : isAns
                      ? "bg-green-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {toast.message}
        </div>
      )}
    </div>
  );
}
