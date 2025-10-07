import React, { useEffect, useRef, useState } from "react";

// === Data model with 14 tests ===
const TESTS = [
  { key: "XP", name: "Xuất phát", mistakes: [
      { key: "xp2", label: "Không tắt xi-nhan", minus: 5 },
      { key: "xp3", label: "Không thắt dây an toàn", minus: 5 },
  ]},
  { key: "ĐB", name: "Dừng nhường người đi bộ", mistakes: [
      { key: "db1", label: "Dừng xe đúng vị trí", minus: 0 },
      { key: "db2", label: "Dừng xe chưa tới vị trí", minus: 5 },
      { key: "db3", label: "Dừng xe quá vị trí", minus: 5 },
      { key: "db4", label: "Không dừng xe", minus: 5 },
  ]},
  { key: "DC", name: "Dừng & khởi hành ngang dốc", mistakes: [
      { key: "DC1", label: "Dừng xe đúng vị trí", minus: 0 },
      { key: "DC2", label: "Dừng xe chưa đến vị trí", minus: 5 },
      { key: "DC3", label: "Dừng xe quá vị trí", minus: 25 },
      { key: "DC4", label: "Không dừng xe", minus: 25 },
      { key: "DC5", label: "Tụt dốc > 50cm", minus: 25 },
  ]},
  { key: "VG", name: "Vệt bánh xe & đường vuông góc", mistakes: [
      { key: "vg1", label: "Không đi qua vệt bánh xe", minus: 25 },
      { key: "vg2", label: "Bánh xe đè vạch", minus: 5 },
  ]},
  { key: "NT1", name: "Qua ngã tư có tín hiệu giao thông", mistakes: [
      { key: "nt1", label: "Vượt đèn đỏ", minus: 10 },
      { key: "nt2", label: "Dừng xe quá vạch", minus: 5 },
  ]},
  { key: "QC", name: "Đường vòng quanh co", mistakes: [
      { key: "qc1", label: "Bánh xe đè vạch", minus: 5 },
  ]},
  { key: "NT2", name: "Qua ngã tư có tín hiệu giao thông", mistakes: [
      { key: "nt2.1", label: "Vượt đèn đỏ", minus: 10 },
      { key: "nt2.2", label: "Dừng xe quá vạch", minus: 5 },
  ]},
  { key: "GXD", name: "Ghép xe dọc vào nơi đỗ", mistakes: [
      { key: "gd1", label: "Ghép xe đúng vị trí", minus: 0 },
      { key: "gd2", label: "Ghép xe sai vị trí", minus: 5 },
      { key: "gd3", label: "Không ghép xe", minus: 25 },
      { key: "gd4", label: "Bánh xe đè vạch", minus: 5 },
  ]},
  { key: "NT3", name: "Qua ngã tư có tín hiệu giao thông", mistakes: [
      { key: "nt3.1", label: "Vượt đèn đỏ", minus: 10 },
      { key: "nt3.2", label: "Dừng xe quá vạch", minus: 5 },
      { key: "nt3.3", label: "Không bật xinhan trai", minus: 5 },
  ]},
  { key: "DS", name: "Tạm dừng ở chỗ đường sắt", mistakes: [
      { key: "ds1", label: "Dừng xe đúng vị trí", minus: 0 },
      { key: "ds2", label: "Dừng xe quá vị trí", minus: 5 },
      { key: "ds3", label: "Dừng xe chưa đến vị trí", minus: 5 },
      { key: "ds4", label: "Không dừng xe", minus: 5 },
  ]},
  { key: "TDS", name: "Thay đổi số trên đường thẳng", mistakes: [
      { key: "TSD1", label: "Tăng số sai", minus: 5 },
      { key: "TSD2", label: "Giảm số sai", minus: 5 },
      { key: "TSD3", label: "Không đạt tốc độ quy định", minus: 5 },
  ]},
  { key: "GXN", name: "Ghép xe ngang vào nơi đỗ", mistakes: [
      { key: "GXN1", label: "Ghép xe đúng vị trí", minus: 0 },
      { key: "GXN2", label: "Ghép xe sai vị trí", minus: 5 },
      { key: "GXN3", label: "Không ghép xe", minus: 5 },
      { key: "GXN4", label: "Bánh xe đè vạch", minus: 5 },
       ]},
  { key: "NT4", name: "Qua ngã tư có tín hiệu giao thông", mistakes: [
      { key: "nt4.1", label: "Vượt đèn đỏ", minus: 10 },
      { key: "nt4.2", label: "Dừng xe quá vạch", minus: 5 },
      { key: "nt4.3", label: "Không bật xinhan phải", minus: 5 },
  ]},
  { key: "KT", name: "Bài thi kết thúc", mistakes: [
      { key: "kt1", label: "Không bật xi-nhan phải", minus: 5 },
  ]},
];

// === Lỗi chung === (trừ 5 điểm mỗi lần)
const GLOBAL_MISTAKES = [
  { key: "stall", label: "Chết máy", minus: 5, repeatable: true },
  { key: "overspeed", label: "Quá tốc độ", minus: 5, repeatable: true },
  { key: "overrpm1", label: "Quá RPM", minus: 5, repeatable: true },
];

const DEFAULT_TIME = 18 * 60; // seconds
const SUB_TIME = 120;

function pad(n) { return n.toString().padStart(2, "0"); }

function useCountdown(initialSeconds, running) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const reset = (val = initialSeconds) => setSeconds(val);
  const timeText = `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
  return { seconds, timeText, reset };
}

function playSound(type = "error") {
  let file = "/error.mp3";
  if (type === "start") file = "/start.mp3";
  else if (type === "pause") file = "/pause.mp3";
  else if (type === "success") file = "/success.mp3"; 

  const audio = new Audio(file);
  audio.play().catch(() => {});
}

async function playCustomSound(path) {
  try {
    // HEAD request to quickly check existence; may fail on some static hosts but we catch errors
    const res = await fetch(path, { method: "HEAD" });
    if (!res.ok) {
      console.warn(`Không tìm thấy file âm thanh: ${path}`);
      return;
    }
    const audio = new Audio(path);
    await audio.play();
  } catch (err) {
    console.warn(`Không thể phát âm thanh: ${path}`, err);
  }
}

function MistakeButton({ testKey, mistake, count, onClick, isGlobal, disabled }) {
  const bgColor = isGlobal
    ? "bg-red-100 border-red-400 text-red-800"
    : "bg-yellow-100 border-yellow-400 text-yellow-800";

  return (
    <button
      onClick={() => onClick(testKey, mistake)}
      disabled={disabled}
      className={`flex justify-between items-center border rounded-2xl px-3 py-1 text-sm shadow ${bgColor} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span>{mistake.label} {count > 0 ? `(x${count})` : ""}</span>
      <span>-{mistake.minus}</span>
    </button>
  );
}

export default function DrivingTestSimDemo2() {
  const [running, setRunning] = useState(false);
  const { seconds, timeText, reset } = useCountdown(DEFAULT_TIME, running);
  const [stageIndex, setStageIndex] = useState(0);
  const [score, setScore] = useState(100);
  const [violated, setViolated] = useState({});
  const [finished, setFinished] = useState(false);

  const [subRunning, setSubRunning] = useState(false);
  const { seconds: subSeconds, timeText: subTimeText, reset: resetSub } = useCountdown(SUB_TIME, subRunning);

  const safeStageIndex = Math.min(Math.max(0, stageIndex), TESTS.length - 1);
  const currentTest = TESTS[safeStageIndex];

  useEffect(() => {
    if (subRunning && subSeconds === 0) {
      setScore((s) => Math.max(0, s - 5));
      playSound("error");
      setSubRunning(false);
    }
  }, [subSeconds, subRunning]);

  useEffect(() => {
    let interval;
    if (running && seconds === 0) {
      interval = setInterval(() => {
        setScore((s) => Math.max(0, s - 2));
        playSound("error");
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [running, seconds]);

  function gotoNextTest() {
    if (!running) return;
    playCustomSound("/vaobai.mp3");

    const nextIndex = safeStageIndex + 1;
    if (nextIndex < TESTS.length) {
      const nextTest = TESTS[nextIndex];
      setStageIndex(nextIndex);
      playCustomSound(`/sounds/${nextTest.key}.mp3`);
    } else {
      playSound("success");
    }
  }

  // --- Hàm endCurrentTest mới ---
  function endCurrentTest() {
    if (!running) return;
    setSubRunning(false);

    const nextIndex = safeStageIndex + 1;

    if (nextIndex < TESTS.length) {
      // Chuyển sang bài tiếp theo
      setStageIndex(nextIndex);

      // Phát file end phần thi
      playCustomSound("/end.mp3");

      // Phát tên bài tiếp theo
      const nextTest = TESTS[nextIndex];
      playCustomSound(`/sounds/${nextTest.key}.mp3`);
    } else {
      // Nếu là bài cuối
      setFinished(true);

      if (score >= 80) {
        playCustomSound("/chucmung.mp3"); // Chúc mừng
      } else {
        playCustomSound("/hoclai.mp3"); // Yêu cầu học thêm
        alert("Điểm chưa đạt, vui lòng học thêm trước khi thi lại!");
      }
    }
  }

  function restartExam() {
    reset(DEFAULT_TIME);
    resetSub(SUB_TIME);
    setStageIndex(0);
    setScore(100);
    setViolated({});
    setRunning(false);
    setSubRunning(false);
    setFinished(false);
    playSound("success");
  }

  const applyMistake = (tKey, mistake) => {
    if (!running) return;

    setViolated((prev) => {
      const prevCount = prev?.[tKey]?.[mistake.key] || 0;

      // Only block repeat if mistake.repeatable is explicitly false
      if (mistake.repeatable === false && prevCount > 0) return prev;

      const next = {
        ...prev,
        [tKey]: { ...(prev[tKey] || {}), [mistake.key]: prevCount + 1 },
      };

      setScore((s) => Math.max(0, s - mistake.minus));
      // try to play per-mistake sound; non-blocking
      playCustomSound(`/mistakes/${mistake.key}.mp3`);
      return next;
    });
  };

  function handleStartPause() {
    setRunning((r) => {
      const next = !r;
      if (next) {
        playCustomSound("/start.mp3");
        // start sub-timer when exam starts
        setSubRunning(true);
      } else {
        playSound("pause");
      }
      return next;
    });
  }

  function renderViolations() {
    const items = [];
    Object.entries(violated).forEach(([tKey, mistakes]) => {
      Object.entries(mistakes).forEach(([mKey, count]) => {
        if (count > 0) {
          const test = TESTS.find(t => t.key === tKey);
          const lookup = test ? test.mistakes : GLOBAL_MISTAKES;
          const found = lookup.find(m => m.key === mKey);
          if (found) {
            items.push(`${test ? test.name : 'Lỗi chung'} - ${found.label} (x${count}) - Trừ ${found.minus * count} điểm`);
          } else {
            items.push(`${tKey} - ${mKey} (x${count})`);
          }
        }
      });
    });
    return items.length ? (
      <ul className="list-disc pl-6 mt-2 text-red-700">
        {items.map((txt, i) => <li key={i}>{txt}</li>)}
      </ul>
    ) : <div className="mt-2 text-green-600">Chưa có lỗi vi phạm</div>;
  }

  return (
    <div className="p-4">
      <header className="flex flex-col items-center bg-white p-4 shadow rounded-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="font-bold text-xl">Trung Tâm DNLX Thanh Long Đỏ</div>
        </div>
        <div className="font-bold text-lg mb-2">Bài Thi Trong Hình</div>
        <div className="flex gap-4 items-center">
          <div>Điểm: {score}</div>
          <div>TG.Tổng: {timeText}</div>
          <div>TG.Bài thi: {subTimeText}</div>
        </div>
        <button
          onClick={handleStartPause}
          className={`mt-4 px-6 py-3 rounded-2xl font-bold text-lg ${running ? "bg-amber-300" : "bg-green-400 text-white"}`}
        >
          {running ? "Tạm dừng" : "Bắt đầu"}
        </button>
      </header>

      <nav className="grid grid-cols-2 sm:grid-cols-7 gap-2 mt-4">
        {TESTS.map((t, i) => (
          <button
            key={t.key}
            onClick={() => {
              if (running) {
                setStageIndex(i);
                playCustomSound("/click.mp3");
              }
            }}
            disabled={!running}
            className={`rounded-2xl px-3 py-2 text-sm font-semibold shadow ${i === safeStageIndex ? "bg-blue-600 text-white" : "bg-white"} ${!running ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {t.key}
          </button>
        ))}
      </nav>

      <main className="mt-4 bg-white p-4 rounded-2xl shadow">
        <h2>Bài thi hiện tại: {currentTest.name}</h2>

        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {currentTest.mistakes.map((m) => (
            <MistakeButton
              key={m.key}
              testKey={currentTest.key}
              mistake={m}
              count={violated?.[currentTest.key]?.[m.key] || 0}
              onClick={applyMistake}
              isGlobal={false}
              disabled={!running}
            />
          ))}
        </div>

        <div className="mt-4">
          <h3>Lỗi chung</h3>
          <div className="grid gap-2 sm:grid-cols-3">
            {GLOBAL_MISTAKES.map((m) => (
              <MistakeButton
                key={m.key}
                testKey="GLOBAL"
                mistake={m}
                count={violated?.GLOBAL?.[m.key] || 0}
                onClick={applyMistake}
                isGlobal={true}
                disabled={!running}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Các lỗi vi phạm đã ghi nhận:</h3>
          {renderViolations()}
        </div>

        <div className="mt-4 flex gap-2 flex-wrap">
          {safeStageIndex < TESTS.length - 1 && (
            <button
              onClick={gotoNextTest}
              disabled={!running}
              className="bg-blue-500 text-white px-4 py-2 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vào phần thi tiếp theo
            </button>
          )}

          <button
            onClick={endCurrentTest}
            disabled={!running}
            className="bg-red-500 text-white px-4 py-2 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Kết thúc phần thi
          </button>

          <button
            onClick={restartExam}
            className="bg-green-500 text-white px-4 py-2 rounded-2xl"
          >
            Thi lại
          </button>
        </div>

        {finished && (
          <div className="mt-4 p-4 bg-yellow-50 rounded">Bài thi đã kết thúc. Điểm: {score}</div>
        )}
      </main>
    </div>
  );
}
