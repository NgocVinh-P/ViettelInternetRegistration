import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PackageList from './components/PackageList';
import Calculator from './components/Calculator';
import CoverageChecker from './components/CoverageChecker';
import RegistrationModal from './components/RegistrationModal';
import LeadHistory from './components/LeadHistory';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import { RegistrationLead } from './types';
import { Sparkles, Megaphone, CheckCircle } from 'lucide-react';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Tư vấn chung');
  const [selectedPrepayment, setSelectedPrepayment] = useState('6m');
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Callback when a fast registration lead is made from the Hero callback input
  const handleFastCallback = (phone: string) => {
    const trackingId = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newLead: RegistrationLead = {
      id: trackingId,
      name: 'Khách hàng nhanh',
      phone,
      address: 'Khảo sát qua điện thoại',
      packageId: 'tu_van_nhanh',
      packageName: 'Yêu cầu tư vấn nhanh',
      packagePrice: 0,
      prepayment: 'monthly',
      status: 'pending',
      createdAt: new Date().toISOString(),
      notes: 'Khách hàng yêu cầu gọi lại gấp sau 15 phút',
    };

    const existing = localStorage.getItem('viettel_registration_leads');
    const leads = existing ? JSON.parse(existing) : [];
    leads.unshift(newLead);
    localStorage.setItem('viettel_registration_leads', JSON.stringify(leads));

    setLastUpdated(Date.now());
    showToast(`Đã ghi nhận yêu cầu gọi lại thành công! Mã số phiếu: ${trackingId}`);
  };

  // Handle plan selection from the Packages Grid
  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setSelectedPrepayment('6m'); // default
    setModalOpen(true);
  };

  // Handle custom calculated plan from Calculator
  const handleRegisterCustom = (planName: string, prepay: string) => {
    setSelectedPlan(planName);
    setSelectedPrepayment(prepay);
    setModalOpen(true);
  };

  // Handle address from Coverage Checker
  const handleCoverageRegister = (fullAddress: string) => {
    setSelectedPlan('Gói STAR 1'); // Recommending standard popular star1 package
    setSelectedPrepayment('6m');
    setModalOpen(true);
    // Auto-fill address detail can be handled by setting a temp address state if desired.
    // For simplicity, we trigger the modal and can notify the user that their address is pre-loaded.
    showToast('Hạ tầng có sẵn! Vui lòng điền thông tin liên lạc để hoàn tất hồ sơ lắp đặt.');
  };

  return (
    <div className="bg-gray-50 font-sans text-gray-800 antialiased min-h-screen">
      {/* Top Promotional Banner */}
      <div className="bg-yellow-400 text-slate-900 py-2.5 px-4 text-center font-bold text-xs flex items-center justify-center gap-2 relative z-50">
        <Megaphone className="w-4 h-4 text-red-700 animate-bounce flex-shrink-0" />
        <span>
          Khuyến mãi lắp mạng 2026: Miễn phí thiết bị Modem WiFi 6 thế hệ mới + Tặng thêm tới 03 tháng cước sử dụng!
        </span>
        <span className="hidden md:inline bg-red-600 text-white text-[9px] uppercase px-1.5 py-0.5 rounded-md font-black tracking-wider ml-1">
          Hạn chót: Hôm Nay
        </span>
      </div>

      {/* Header component */}
      <Header onRegisterClick={handleSelectPlan} />

      {/* Main Sections */}
      <main>
        {/* Hero Banner with Callback form */}
        <Hero
          onFastCallback={handleFastCallback}
          onViewPlans={() => {
            const el = document.getElementById('packages');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Brand Values Highlights Bar */}
        <div className="bg-slate-900 py-6 text-white border-t border-b border-slate-800 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-black text-yellow-300 font-display">63</p>
              <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">
                Tỉnh thành phủ sóng
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-yellow-300 font-display">15 Phút</p>
              <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">
                Liên hệ xác nhận ngay
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-yellow-300 font-display">WiFi 6 Mesh</p>
              <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">
                Công nghệ sóng kép vượt trội
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-yellow-300 font-display">24 Giờ</p>
              <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">
                Cam kết kéo dây lắp đặt
              </p>
            </div>
          </div>
        </div>

        {/* Packages Section */}
        <PackageList onSelectPackage={handleSelectPlan} />

        {/* Prepayment Promotions Section */}
        <section id="promotions" className="bg-gradient-to-br from-viettel to-[#cc002c] text-white py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center space-x-1 bg-white/10 px-3.5 py-1 rounded-full text-xs font-bold mb-4 border border-white/15">
              <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Chương Trình Ưu Đãi Độc Quyền</span>
            </div>
            <h2 className="text-3xl font-black font-display tracking-tight mb-4">
              Ưu Đãi Đặc Biệt Khi Đăng Ký Trả Trước
            </h2>
            <p className="text-white/80 max-w-xl mx-auto text-sm mb-12">
              Lựa chọn hình thức thanh toán đóng trước cước để tối ưu chi phí và nhận tối đa số tháng tặng thêm từ Viettel Telecom.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:border-white/25 hover:bg-white/15 transition-all text-left">
                <div className="flex justify-between items-start">
                  <span className="bg-yellow-300 text-red-900 text-xs font-black px-2.5 py-1 rounded-full font-display">
                    TIẾT KIỆM
                  </span>
                  <span className="text-2xl font-black font-display text-yellow-300">6 Tháng</span>
                </div>
                <h4 className="font-extrabold text-base mt-4">Tặng 01 Tháng Cước</h4>
                <p className="text-xs text-white/80 mt-2 leading-relaxed font-medium">
                  Miễn phí 100% công lắp đặt ban đầu, kéo cáp ngầm/nổi miễn phí. Tặng kèm Modem WiFi thế hệ mới.
                </p>
              </div>

              {/* Option 2 */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-300 text-left relative transform md:scale-105 shadow-xl shadow-red-900/20">
                <div className="absolute top-0 right-4 -translate-y-1/2 bg-yellow-300 text-red-900 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                  KHUYÊN DÙNG
                </div>
                <div className="flex justify-between items-start">
                  <span className="bg-yellow-300 text-red-900 text-xs font-black px-2.5 py-1 rounded-full font-display">
                    DÀNH CHO GIA ĐÌNH
                  </span>
                  <span className="text-2xl font-black font-display text-yellow-300">12 Tháng</span>
                </div>
                <h4 className="font-extrabold text-base mt-4">Tặng 02 Tháng Cước</h4>
                <p className="text-xs text-white/90 mt-2 leading-relaxed font-medium">
                  Miễn phí hoàn toàn lắp đặt 100%. Tặng thêm 02 tháng cước sử dụng miễn phí liên tục. Tối ưu chi phí bình quân hàng tháng.
                </p>
              </div>

              {/* Option 3 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:border-white/25 hover:bg-white/15 transition-all text-left">
                <div className="flex justify-between items-start">
                  <span className="bg-yellow-300 text-red-900 text-xs font-black px-2.5 py-1 rounded-full font-display">
                    ƯU ĐÃI MAX
                  </span>
                  <span className="text-2xl font-black font-display text-yellow-300">18 Tháng</span>
                </div>
                <h4 className="font-extrabold text-base mt-4">Tặng 03 Tháng Cước</h4>
                <p className="text-xs text-white/80 mt-2 leading-relaxed font-medium">
                  Miễn phí 100% công thiết kế luồn dây cáp. Tặng trọn vẹn 3 tháng sử dụng. Thích hợp cho doanh nghiệp ký hợp đồng dài hạn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Price Calculator */}
        <Calculator onRegisterCustom={handleRegisterCustom} />

        {/* Interactive Coverage Checker */}
        <CoverageChecker onCheckSuccess={handleCoverageRegister} />

        {/* Frequently Asked Questions */}
        <Faqs />
      </main>

      {/* Footer block */}
      <Footer />

      {/* Floating Registration History (Persisted Lead Management) */}
      <LeadHistory lastUpdated={lastUpdated} onSelectLead={(lead) => {
        setSelectedPlan(lead.packageName);
        setSelectedPrepayment(lead.prepayment);
        setModalOpen(true);
      }} />

      {/* Registration Lead Capture Modal */}
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedPlan={selectedPlan}
        preselectedPrepayment={selectedPrepayment}
        onSuccess={() => {
          setLastUpdated(Date.now());
          showToast('Cảm ơn bạn! Thông tin đăng ký đã được lưu trữ cục bộ thành công.');
        }}
      />

      {/* Floating Action Notifications / Toast alerts */}
      {toastMessage && (
        <div className="fixed bottom-24 right-4 z-50 bg-slate-900/95 backdrop-blur border border-slate-800 text-white p-4 rounded-2xl shadow-2xl flex items-center space-x-3 max-w-sm animate-fadeIn">
          <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <p className="text-xs font-bold leading-normal text-left">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
