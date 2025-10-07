import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderCenter from "../components/HeaderCenter";
import jsPDF from "jspdf";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="p-6">❌ Không có dữ liệu kết quả</p>;

  const { answers, total, license, passing, name } = state;

  const tongDung = answers.filter(a => a.selected === a.correct).length;
  const tongSai = total - tongDung;
  const lietSai = answers.some(a => a.isLiet);
  const ketQua = !lietSai && tongDung >= passing ? "ĐẠT" : "RỚT";

  const [showDetail, setShowDetail] = useState(null);

  // ✅ Xuất PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("KẾT QUẢ THI", 20, 20);

    doc.setFontSize(12);
    doc.text(`👤 Học viên: ${name || "Chưa nhập"}`, 20, 40);
    doc.text(`🚗 Hạng: ${license}`, 20, 50);
    doc.text(`Tổng số câu: ${total}`, 20, 60);
    doc.text(`Số câu đúng: ${tongDung}`, 20, 70);
    doc.text(`Số câu sai: ${tongSai}`, 20, 80);
    if (lietSai) doc.text("⚠ Có sai câu điểm liệt", 20, 90);
    doc.text(`Kết quả: ${ketQua}`, 20, 100);

    doc.save("ketqua.pdf");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <HeaderCenter size="w-20 h-20" />
      <h1 className="text-2xl font-bold text-center mb-6">KẾT QUẢ THI</h1>

      {/* Thông tin chung */}
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-4 mb-6">
        <p>
          👤 Học viên: <b>{name || "Chưa nhập"}</b>
        </p>
        <p>
          🚗 Hạng: <b>{license}</b>
        </p>
        <p>Tổng số câu: {total}</p>
        <p>
          Số câu đúng:{" "}
          <span className="text-green-600 font-bold">{tongDung}</span>
        </p>
        <p>
          Số câu sai:{" "}
          <span className="text-red-600 font-bold">{tongSai}</span>
        </p>
        <p>
          Kết quả:
          <span
            className={`font-bold ${
              ketQua === "ĐẠT" ? "text-green-600" : "text-red-600"
            }`}
          >
            {" "}
            {ketQua}
          </span>
          {lietSai && (
            <span className="text-red-500 ml-2">(Sai câu điểm liệt)</span>
          )}
        </p>
      </div>

      {/* Xem lại câu sai */}
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-4 mb-6">
        <h2 className="font-semibold mb-3">Xem lại câu sai</h2>
        {tongSai === 0 ? (
          <p className="text-green-600">🎉 Bạn không sai câu nào!</p>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            {answers
              .map((a, idx) => ({ ...a, idx }))
              .filter(a => a.selected !== a.correct)
              .map(a => (
                <button
                  key={a.id}
                  onClick={() => setShowDetail(a)}
                  className="w-10 h-10 rounded-full font-bold text-sm bg-red-500 text-white hover:bg-red-600"
                >
                  {a.idx + 1}
                </button>
              ))}
          </div>
        )}
        {tongSai > 0 && (
          <p className="mt-2 text-sm text-gray-500">❌ Đỏ: câu sai</p>
        )}
      </div>

      {/* Modal chi tiết */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => setShowDetail(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h3 className="font-bold mb-3">
              Chi tiết câu {showDetail.idx + 1}
            </h3>
            <p className="mb-3">{showDetail.question}</p>
            <div className="space-y-1">
              {showDetail.answers.map(ans => (
                <div
                  key={ans.key}
                  className={`p-2 border rounded 
                    ${
                      ans.key === showDetail.correct
                        ? "bg-green-100 border-green-500"
                        : ""
                    }
                    ${
                      ans.key === showDetail.selected &&
                      ans.key !== showDetail.correct
                        ? "bg-red-100 border-red-500"
                        : ""
                    }`}
                >
                  {ans.key}. {ans.text}
                  {ans.key === showDetail.selected &&
                    ans.key !== showDetail.correct && (
                      <span className="ml-2 text-red-600 font-bold">
                        👉 Bạn chọn
                      </span>
                    )}
                  {ans.key === showDetail.correct && (
                    <span className="ml-2 text-green-600 font-bold">
                      ✅ Đáp án đúng
                    </span>
                  )}
                </div>
              ))}
            </div>
            {showDetail.suggestion && (
              <p className="mt-3 text-sm text-gray-600 italic">
                💡 Gợi ý: {showDetail.suggestion}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Nút điều hướng */}
      <div className="max-w-3xl mx-auto mt-6 flex gap-4">
        <button
          onClick={() => navigate("/practice/theory")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Quay lại
        </button>
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          📄 Xuất PDF
        </button>
      </div>
    </div>
  );
}
