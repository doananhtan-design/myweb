import { Routes, Route } from "react-router-dom";
import DrivingSchoolLanding from "./pages/DrivingSchoolLanding";
import Practice from "./pages/Practice";
import TheoryPractice from "./pages/TheoryPractice";
import QuizExam from "./pages/QuizExam";
import Simulation from "./pages/Simulation";
import Result from "./pages/Result";
import FixedExamSelect from "./pages/FixedExamSelect"; // ✅ thêm

function App() {
  return (
    <Routes>
      <Route path="/" element={<DrivingSchoolLanding />} />
      
      <Route path="/practice">
        <Route index element={<Practice />} />
        <Route path="theory" element={<TheoryPractice />} />
        <Route path="simulation" element={<Simulation />} />
      </Route>

      {/* ✅ Route mới cho danh sách đề cố định */}
      <Route path="/theory/fixed-exam" element={<FixedExamSelect />} />

      <Route path="/theory/exam/:license" element={<QuizExam />} />
      <Route path="/result" element={<Result />} />

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
