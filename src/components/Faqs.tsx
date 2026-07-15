import { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function Faqs() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // Default open first

  return (
    <section id="faqs" className="py-20 bg-white px-4 md:px-6 scroll-mt-10">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1 bg-viettel-light px-3.5 py-1 rounded-full text-xs font-bold text-viettel mb-4 border border-red-100">
            <HelpCircle className="w-4 h-4" />
            <span>Hỏi đáp &amp; Tư vấn hỗ trợ khách hàng</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 font-display">
            Các Câu Hỏi Thường Gặp (FAQs)
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Tổng hợp các thắc mắc phổ biến nhất của khách hàng khi đăng ký lắp đặt Internet cáp quang và Home WiFi Viettel.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-viettel bg-viettel-light/5 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full p-5 flex justify-between items-center text-left font-bold text-gray-800 text-sm md:text-base transition-colors"
                >
                  <span className="pr-4 leading-normal">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-viettel flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100/60 animate-fadeIn text-left">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Urgent support box */}
        <div className="mt-12 bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center md:text-left md:flex md:items-center md:justify-between max-w-3xl mx-auto gap-6">
          <div className="mb-4 md:mb-0">
            <h4 className="font-bold text-gray-800 text-base">Vẫn còn thắc mắc khác?</h4>
            <p className="text-xs text-gray-500 mt-1 leading-normal">
              Liên hệ trực tiếp tổng đài miễn phí Viettel Telecom để được nhân viên hỗ trợ trực tiếp 24/7.
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <a
              href="tel:18008119"
              className="bg-viettel hover:bg-viettel-hover text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              Tổng Đài: 1800 8119
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
