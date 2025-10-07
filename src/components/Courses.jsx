import React from "react";

function Card({ title, text, price, action }) {
  return (
    <div className="bg-white border border-transparent hover:border-red-300 rounded-xl p-5 shadow-md transition transform hover:-translate-y-2 hover:shadow-xl flex flex-col">
      <div className="text-lg font-semibold text-red-600">{title}</div>
      {text && <p className="text-sm text-slate-500 mt-2 flex-1">{text}</p>}
      {price && <div className="mt-4 font-bold text-slate-800">{price}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default function Courses() {
  const items = [
    {
      title: "B — Số sàn",
      text: "Học lái ô tô hạng B số sàn. Thực hành tối thiểu 20 giờ.",
      price: "13.500.000₫",
    },
    {
      title: "B — Tự động",
      text: "Dành cho người lái số tự động, phù hợp người mới, nhẹ nhàng, thi dễ.",
      price: "13.500.000₫",
    },
    {
      title: "C1 — Xe tải",
      text: "Đào tạo tài xế hạng C1 với thời gian thực hành nhiều hơn.",
      price: "Liên hệ",
    },
    {
      title: "A1 — Xe Máy",
      text: "Đào tạo Xe máy - Học sinh - sinh viên.",
      price: "Liên hệ",
    },
  ];

  return (
    <section id="courses" className="mt-14 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🚗 Khóa học khai giảng hàng tháng</h2>
        <div className="text-slate-500 text-sm">Từ cơ bản đến nâng cao</div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((c) => (
          <Card
            key={c.title}
            title={c.title}
            text={c.text}
            price={c.price}
            action={
              <a
                className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white hover:opacity-90 active:scale-95 transition"
                href="#contact"
              >
                Đăng ký
              </a>
            }
          />
        ))}
      </div>
    </section>
  );
}
