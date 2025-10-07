import React, { useState } from "react";

// Vibrant React + Tailwind landing for "Trung Tâm DNLX Thanh Long Đỏ"
// Fix: syntax error ở Courses, responsive cho iframe, thêm hover effects

function LogoSVG() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-lg"
    >
      <rect width="64" height="64" rx="12" fill="url(#g)" />
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#EF4444" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <g transform="translate(10,10) scale(0.8)" fill="#fff">
        <path d="M8 2c3 0 6 1.5 8 4 2-2.5 5-4 8-4 1.7 0 3 1.3 3 3 0 3-3 5-6 7-1.5.9-2.5 1.8-3 3-.5-1.2-1.5-2.1-3-3-3-1.6-6-4-6-7 0-1.7 1.3-3 3-3z" />
        <text x="2" y="26" fontSize="10" fontWeight="700">
          TLĐ
        </text>
      </g>
    </svg>
  );
}

function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 w-full">
      <div className="flex gap-3 items-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-lg ring-1 ring-red-300 shadow-md">
          <LogoSVG />
        </div>
        <div>
          <div className="font-bold text-lg">Trung Tâm DNLX Thanh Long Đỏ</div>
          <div className="text-xs text-slate-400">Đào tạo B, C1 & A/A1</div>
        </div>
      </div>
      <nav className="flex gap-4 mt-3 sm:mt-0">
        <a href="#courses" className="hover:text-red-500 transition">
          Khóa học
        </a>
        <a href="#schedule" className="hover:text-red-500 transition">
          Lịch & Giá
        </a>
        <a href="#contact" className="hover:text-red-500 transition">
          Liên hệ
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="grid gap-6 md:grid-cols-2 items-center py-12 rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg,#ff6b6b 0%,#ffb86b 40%,#10b981 100%)",
      }}
    >
      <div className="p-6 md:p-12 text-white">
        <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur">
          Đào tạo chuyên nghiệp
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-4 leading-tight">
          Trung Tâm DNLX Thanh Long Đỏ — Học dễ · Thi Nhanh
        </h1>
        <p className="mt-4 max-w-xl text-white/90">
          Khóa học thực hành & lý thuyết đầy đủ. Lịch các ngày và cuối tuần
          linh hoạt, giảng viên có kinh nghiệm — tỉ lệ đậu cao.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 active:scale-95 transform transition rounded-lg text-white shadow-lg ring-1 ring-red-300"
          >
            Đăng ký ngay
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          </a>
          <a
            href="#courses"
            className="px-4 py-2 bg-white/90 rounded-lg text-red-600 font-semibold hover:scale-105 transform transition"
          >
            Xem khóa học →
          </a>
        </div>
        <div className="mt-4 text-sm text-white/80">
          Ưu đãi: Giảm 10% cho 50 học viên đăng ký đầu tiên.
        </div>
      </div>

      <div className="p-6 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl p-4 shadow-2xl transform hover:-translate-y-2 transition">
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=60"
            alt="lap practice"
            className="rounded-md w-full h-48 object-cover"
          />
          <div className="mt-3">
            <div className="font-semibold">Thực hành trên đường</div>
            <div className="text-sm text-slate-500">
              Xe số sàn & tự động đời mới
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Courses() {
  const items = [
    {
      title: "B — Số sàn",
      desc: "Học lái ô tô hạng B số sàn. Thực hành tối thiểu 20 giờ.",
      price: "13.500.000₫",
    },
    {
      title: "B — Tự động",
      desc: "Dành cho người lái số tự động, phù hợp người mới, nhẹ nhàng, thi dễ.",
      price: "13.500.000₫",
    },
    {
      title: "C1 — Xe tải",
      desc: "Đào tạo tài xế hạng C1 với thời gian thực hành nhiều hơn.",
      price: "Liên hệ",
    },
  ];

  return (
    <section id="courses" className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Khóa học phổ biến</h2>
        <div className="text-slate-500 text-sm">Từ cơ bản đến nâng cao</div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((c) => (
          <div
            key={c.title}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition"
          >
            <div className="text-lg font-semibold text-red-600">{c.title}</div>
            <p className="text-sm text-slate-500 mt-2">{c.desc}</p>
            <div className="mt-4 font-bold">{c.price}</div>
            <div className="mt-4">
              <a
                className="inline-block px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                href="#contact"
              >
                Đăng ký
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lịch & Giá</h2>
        <div className="text-slate-500 text-sm">Linh hoạt: Thời gian & cuối tuần</div>
      </div>
      <div className="flex flex-wrap gap-5">
        <InfoCard title="Thời Gian" text="Các ngày trong tuần" />
        <InfoCard title="Cuối tuần" text="Sáng & chiều Thứ 7, CN" />
        <InfoCard title="Hỗ trợ thi" text="Tư vấn hồ sơ & đặt lịch thi" />
      </div>
    </section>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="flex-1 min-w-[220px] bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h4 className="font-semibold text-red-600">{title}</h4>
      <p className="text-sm text-slate-500 mt-1">{text}</p>
    </div>
  );
}

function WhyUs() {
  return (
    <section id="why" className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Vì sao chọn Thanh Long Đỏ?</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <WhyCard title="Giảng viên tận tâm" text="Kinh nghiệm nhiều năm, tỉ lệ đậu cao." />
        <WhyCard title="Xe thực hành đủ loại" text="Xe số sàn, tự động, xe tốt." />
        <WhyCard title="Hỗ trợ thủ tục" text="Giúp chuẩn bị hồ sơ & đăng ký thi." />
      </div>
    </section>
  );
}

function WhyCard({ title, text }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <strong className="text-red-600">{title}</strong>
      <p className="text-sm text-slate-500 mt-1">{text}</p>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "B2",
    note: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Vui lòng điền họ tên và số điện thoại.");
      return;
    }
    const subject = `Đăng ký khóa học - ${formData.course} (${formData.name})`;
    const body = `Họ tên: ${formData.name}\nĐiện thoại: ${formData.phone}\nKhóa: ${formData.course}\nGhi chú: ${formData.note}`;
    window.location.href = `mailto:youremail@example.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Đăng ký / Liên hệ</h2>
        <div className="text-slate-500 text-sm">Điền form hoặc gọi trực tiếp</div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="name"
              label="Họ & tên"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              required
            />
            <InputField
              id="phone"
              label="Điện thoại"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="09xxxxxxxx"
              required
            />
            <SelectField
              id="course"
              label="Khóa học"
              value={formData.course}
              onChange={handleChange}
              options={["B2", "B1 (Tự động)", "C"]}
            />
            <TextareaField
              id="note"
              label="Ghi chú"
              value={formData.note}
              onChange={handleChange}
              placeholder="Thời gian muốn học / Ghi chú khác"
            />
            <div className="flex gap-3 items-center">
              <button
                type="submit"
                className="px-5 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow"
              >
                Gửi đăng ký
              </button>
              <div className="text-sm text-slate-500">
                Hoặc gọi hotline:{" "}
                <strong className="text-red-600">0914.531.591</strong>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h4 className="font-semibold">Thông tin liên hệ</h4>
          <p className="text-sm mt-2">
            <strong>Địa chỉ:</strong> Tân Hà - Hàm Tân- Lâm Đồng
          </p>
          <p className="text-sm mt-1">
            <strong>Hotline:</strong> 0914.531.591
          </p>
          <p className="text-sm mt-1">
            <strong>Email:</strong> doananhtan@gmail.com
          </p>
          <div className="text-slate-500 text-sm mt-4 aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62714.63579435342!2d107.6472484486328!3d10.760300900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175cbb173aaaaab%3A0xa601a1e418412558!2zVHJ1bmcgdMOibSBE4bqheSBuZ2jhu4EgTMOhaSB4ZSBUaGFuaCBMb25nIMSQ4buP!5e0!3m2!1svi!2s!4v1758014069934!5m2!1svi!2s"
              className="w-full h-full rounded-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({ id, label, type = "text", value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-red-300"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function SelectField({ id, label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-red-300"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({ id, label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        id={id}
        rows="5"
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-red-300"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 text-sm text-slate-500 py-6 border-t">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          © {new Date().getFullYear()} Trung Tâm DNLX Thanh Long Đỏ. All rights
          reserved.
        </div>
        <div>Giấy phép · Chính sách bảo mật</div>
      </div>
    </footer>
  );
}

export default function DrivingSchoolLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-slate-900 px-4 py-8 sm:py-12 scroll-smooth">
      <div className="max-w-5xl mx-auto p-4">
        <Header />
        <Hero />
        <Courses />
        <Schedule />
        <WhyUs />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}
