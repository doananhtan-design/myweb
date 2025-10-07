import React from "react";

function Card({ title, text }) {
  return (
    <div className="bg-white border border-transparent hover:border-red-300 rounded-xl p-5 shadow-md transition transform hover:-translate-y-2 hover:shadow-xl flex flex-col">
      <div className="text-lg font-semibold text-red-600">{title}</div>
      {text && <p className="text-sm text-slate-500 mt-2 flex-1">{text}</p>}
    </div>
  );
}

export default function Schedule() {
  const items = [
    { title: "Thời Gian", text: "Các ngày trong tuần" },
    { title: "Cuối tuần", text: "Sáng & chiều Thứ 7, CN" },
    { title: "Hỗ trợ thi", text: "Tư vấn hồ sơ & đặt lịch thi" },
  ];

  return (
    <section id="schedule" className="mt-14 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📅 Lịch học & Hỗ trợ</h2>
        <div className="text-slate-500 text-sm">Linh hoạt theo nhu cầu</div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} title={item.title} text={item.text} />
        ))}
      </div>
    </section>
  );
}
