import React from "react";

function Card({ title, text }) {
  return (
    <div className="bg-white border border-transparent hover:border-red-300 rounded-xl p-5 shadow-md transition transform hover:-translate-y-2 hover:shadow-xl flex flex-col">
      <div className="text-lg font-semibold text-red-600">{title}</div>
      {text && <p className="text-sm text-slate-500 mt-2 flex-1">{text}</p>}
    </div>
  );
}

export default function WhyUs() {
  const items = [
    { title: "Giảng viên tận tâm", text: "Kinh nghiệm nhiều năm, tỉ lệ đậu cao." },
    { title: "Xe thực hành đủ loại-mới", text: "Xe số sàn, tự động, xe tốt." },
    { title: "Hỗ trợ thủ tục", text: "Giúp chuẩn bị hồ sơ & đăng ký thi." },
  ];

  return (
    <section id="why" className="mt-14 px-4">
      <h2 className="text-2xl font-bold mb-4">
        ✨ Vì sao chọn Thanh Long Đỏ?
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} title={item.title} text={item.text} />
        ))}
      </div>
    </section>
  );
}
