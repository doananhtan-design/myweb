import React, { useState } from "react";
import emailjs from "@emailjs/browser";

// Header
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-4">
        <div className="flex gap-3 items-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg ring-1 ring-red-300 shadow-md overflow-hidden bg-white">
            <img
              src="/logo.PNG"
              alt="Logo Thanh Long Đỏ"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-extrabold text-2xl text-red-700 drop-shadow-sm">
              Vp_Tuyển Sinh 08_Trung Tâm DNLX Thanh Long Đỏ
            </div>
            <div className="text-3xl text-red-600 font-bold">Đào tạo B, C1 & A/A1</div>
          </div>
        </div>
        <nav className="flex gap-5 mt-3 sm:mt-0 text-sm font-medium">
          <a href="#courses" className="hover:text-red-600 transition">Khóa học</a>
          <a href="#schedule" className="hover:text-red-600 transition">Lịch & Giá</a>
          <a href="#contact" className="hover:text-red-600 transition">Liên hệ</a>
        </nav>
      </div>
    </header>
  );
}

// Hero
function Hero() {
  return (
    <section
      className="grid gap-6 md:grid-cols-2 items-center py-14 px-4 rounded-xl overflow-hidden shadow-lg"
      style={{
        background: "linear-gradient(90deg,#ef4444 0%,#f97316 40%,#10b981 100%)",
      }}
    >
      <div className="p-6 md:p-12 text-white animate-fadeIn">
        <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur">
          Đào tạo chuyên nghiệp
        </span>
        <h1 className="text-6xl md:text-4xl font-extrabold mt-4 leading-tight drop-shadow">
          Học dễ · Thi nhanh 
        </h1>
        <p className="mt-4 max-w-xl text-white/90">
          Khóa học thực hành & lý thuyết đầy đủ. Lịch học linh hoạt, giảng viên
          kinh nghiệm — tỉ lệ đậu cao.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 active:scale-95 transform transition rounded-lg text-white font-semibold shadow-lg"
          >
            Đăng ký ngay
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          </a>
          <a
            href="#courses"
            className="px-5 py-2 bg-white/90 rounded-lg text-red-600 font-semibold hover:scale-105 active:scale-95 transform transition shadow"
          >
            Xem khóa học →
          </a>
        </div>
        <div className="mt-4 text-sm text-white/80">
          🎉 Ưu đãi: Giảm 10% cho 50 học viên đầu tiên
        </div>
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl p-4 shadow-2xl transform hover:-translate-y-2 transition">
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=60"
            alt="Học viên thực hành lái xe"
            className="rounded-lg w-full h-52 object-cover hover:scale-105 transition"
          />
          <div className="mt-3">
            <div className="font-semibold">Thực hành trên đường</div>
            <div className="text-sm text-slate-500">Xe số sàn & tự động đời mới</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Card
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

// Courses
function Courses() {
  const items = [
    { title: "B — Số sàn", text: "Học lái ô tô hạng B số sàn. Thực hành tối thiểu 20 giờ.", price: "13.500.000₫" },
    { title: "B — Tự động", text: "Dành cho người lái số tự động, phù hợp người mới, nhẹ nhàng, thi dễ.", price: "13.500.000₫" },
    { title: "C1 — Xe tải", text: "Đào tạo tài xế hạng C1 với thời gian thực hành nhiều hơn.", price: "Liên hệ" },
    { title: "A1 — Xe Máy", text: "Đào tạo Xe máy - Học sinh - sinh viên.", price: "Liên hệ" },
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

// Schedule
function Schedule() {
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

// WhyUs
function WhyUs() {
  const items = [
    { title: "Giảng viên tận tâm", text: "Kinh nghiệm nhiều năm, tỉ lệ đậu cao." },
    { title: "Xe thực hành đủ loại-mới", text: "Xe số sàn, tự động, xe tốt." },
    { title: "Hỗ trợ thủ tục", text: "Giúp chuẩn bị hồ sơ & đăng ký thi." },
  ];

  return (
    <section id="why" className="mt-14 px-4">
      <h2 className="text-2xl font-bold mb-4">✨ Vì sao chọn Thanh Long Đỏ?</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} title={item.title} text={item.text} />
        ))}
      </div>
    </section>
  );
}

// Contact
function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", course: "B_ck", note: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Vui lòng điền họ tên và số điện thoại.");
      return;
    }
    emailjs
      .send("service_byk9y2a", "template_zqw09na", formData, "3Bv6RJ1kmGkePSfRb")
      .then(() => {
        alert("✅ Đăng ký thành công! Chúng tôi sẽ liên hệ lại sớm.");
        setFormData({ name: "", phone: "", course: "B_ck", note: "" });
      })
      .catch(() => alert("❌ Có lỗi xảy ra, vui lòng thử lại sau."));
  };

  return (
    <section id="contact" className="mt-14 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📩 Đăng ký / Liên hệ</h2>
        <div className="text-slate-500 text-sm">Điền form hoặc gọi hotline</div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Form */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField id="name" label="Họ & tên" value={formData.name} onChange={handleChange} placeholder="Nguyễn Văn A" required />
            <InputField id="phone" label="Điện thoại" type="tel" value={formData.phone} onChange={handleChange} placeholder="09xxxxxxxx" pattern="[0-9]{10}" required />
            <SelectField id="course" label="Khóa học" value={formData.course} onChange={handleChange} options={["A/A1","B_ck", "B_tđ (Tự động)", "C"]} />
            <TextareaField id="note" label="Ghi chú" value={formData.note} onChange={handleChange} placeholder="Thời gian muốn học / Ghi chú khác" />
            <button type="submit" className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold hover:opacity-90 active:scale-95 transition shadow w-full">
              Gửi đăng ký
            </button>
          </form>
        </div>
        {/* Info */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h4 className="font-semibold">📍 Thông tin liên hệ</h4>
          <p className="text-sm mt-2"><strong>Địa chỉ:</strong> Tân Hà - Hàm Tân - Lâm Đồng</p>
          <p className="text-sm mt-1"><strong>Hotline:</strong> 0914.531.591</p>
          <p className="text-sm mt-1"><strong>Email:</strong> doananhtan@gmail.com</p>
          <div className="text-slate-500 text-sm mt-4 aspect-video">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18..." className="w-full h-full rounded-lg" style={{ border: 0 }} allowFullScreen loading="lazy" title="Google Map"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

// Input Components
function InputField({ id, label, type = "text", value, onChange, placeholder, required, pattern }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition"
        placeholder={placeholder}
        required={required}
        pattern={pattern}
      />
    </div>
  );
}
function SelectField({ id, label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select id={id} value={value} onChange={onChange} className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition">
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
function TextareaField({ id, label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <textarea id={id} rows="5" value={value} onChange={onChange} className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition" placeholder={placeholder}></textarea>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="mt-14 text-sm text-slate-500 py-6 border-t">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 px-4">
        <div>© {new Date().getFullYear()} Vp_08 Tân Hà -Trung Tâm DNLX Thanh Long Đỏ. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#!" className="hover:text-red-600">Giấy phép</a>
          <a href="#!" className="hover:text-red-600">Chính sách</a>
        </div>
      </div>
    </footer>
  );
}

// Export
export default function DrivingSchoolLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-slate-900 scroll-smooth">
      <Header />
      <main className="max-w-5xl mx-auto">
        <Hero />
        <Courses />
        <Schedule />
        <WhyUs />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
