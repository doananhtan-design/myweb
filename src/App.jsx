import { Routes, Route, Link } from "react-router-dom";
import DrivingSchoolLanding from "./pages/DrivingSchoolLanding";
import Practice from "./pages/Practice";
import TheoryPractice from "./pages/TheoryPractice";
import QuizExam from "./pages/QuizExam";
import Simulation from "./pages/Simulation";
import Result from "./pages/Result";
import FixedExamSelect from "./pages/FixedExamSelect";
import SimulationTest from "./pages/SimulationTest";
import SimulationTopics from "./pages/SimulationTopics";
import SimulationTopicDetail from "./pages/SimulationTopicDetail";
import SimulationTopicSelect from "./pages/SimulationTopicSelect";
import SimulationRandom from "./pages/SimulationRandom";
import FixedExamList from "./pages/FixedExamList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DrivingSchoolLanding />} />

      {/* 🧩 Luyện tập */}
      <Route path="/practice">
        <Route index element={<Practice />} />
        <Route path="theory" element={<TheoryPractice />} />
        <Route path="simulation" element={<Simulation />} />
      </Route>

      {/* ✅ Danh sách đề cố định */}
      <Route path="/theory/fixed-exam" element={<FixedExamSelect />} />
      <Route path="/simulation/fixed-exams" element={<FixedExamList />} />
      {/* ✅ Luyện tập mô phỏng */}
      <Route path="/simulation/test" element={<SimulationTest />} />
      <Route path="/simulation/topics" element={<SimulationTopics />} />
      <Route path="/simulation/topic-select" element={<SimulationTopicSelect />} />
 
      {/* 🚀 Route đề ngẫu nhiên */}
      <Route path="/simulation/random" element={<SimulationRandom />} />

      {/* ⚡ Route cụ thể hơn (chapter) phải nằm TRƯỚC route :name */}
      <Route
        path="/simulation/topic/toan-bo/chapter-:chapter"
        element={<SimulationTopicDetail />}
      />
      <Route
        path="/simulation/topic/:name"
        element={<SimulationTopicDetail />}
      />

      {/* ✅ Thi lý thuyết */}
      <Route path="/theory/exam/:license" element={<QuizExam />} />

      <Route path="/result" element={<Result />} />

      {/* 🚨 404 */}
      <Route
        path="*"
        element={
          <p className="p-6 text-center text-red-600 font-bold">
            404 - Trang không tồn tại
          </p>
        }
      />
    </Routes>
  );
}

export default App;
