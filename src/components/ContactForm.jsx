import React, { useState } from "react";
import emailjs from "@emailjs/browser";

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
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition"
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
        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "B_ck",
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
              pattern="[0-9]{10}"
              required
            />
            <SelectField
              id="course"
              label="Khóa học"
              value={formData.course}
              onChange={handleChange}
              options={["A/A1", "B_ck", "B_tđ (Tự động)", "C"]}
            />
            <TextareaField
              id="note"
              label="Ghi chú"
              value={formData.note}
              onChange={handleChange}
              placeholder="Thời gian muốn học / Ghi chú khác"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold hover:opacity-90 active:scale-95 transition shadow w-full"
            >
              Gửi đăng ký
            </button>
          </form>
        </div>
        {/* Info */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h4 className="font-semibold">📍 Thông tin liên hệ</h4>
          <p className="text-sm mt-2">
            <strong>Địa chỉ:</strong> Tân Hà - Hàm Tân - Lâm Đồng
          </p>
          <p className="text-sm mt-1">
            <strong>Hotline:</strong> 0914.531.591
          </p>
          <p className="text-sm mt-1">
            <strong>Email:</strong> doananhtan@gmail.com
          </p>
          <div className="text-slate-500 text-sm mt-4 aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              className="w-full h-full rounded-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
