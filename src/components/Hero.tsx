import { useState, FormEvent } from 'react';
import { Zap, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

interface HeroProps {
  onFastCallback: (phone: string) => void;
  onViewPlans: () => void;
}

export default function Hero({ onFastCallback, onViewPlans }: HeroProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [speedVal, setSpeedVal] = useState(300); // Interactive slider

  const handleQuickSubmit = (e: FormEvent) => {
    e.preventDefault();
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/;
    if (!phone) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }
    if (!phoneRegex.test(phone.trim())) {
      setError('Số điện thoại không đúng định dạng (VD: 0987654321)');
      return;
    }
    setError('');
    onFastCallback(phone.trim());
    setPhone('');
  };

  // Speed time estimates
  const calculateDownloadTime = (megabytes: number) => {
    const megabits = megabytes * 8;
    const seconds = megabits / speedVal;
    if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
    if (seconds > 60) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.round(seconds % 60);
      return `${mins}p ${secs}s`;
    }
    return `${seconds.toFixed(1)} giây`;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#ee0033] to-[#b90028] text-white pt-16 pb-20 md:py-24 px-4 md:px-6 flex-shrink-0">
      {/* Background visual graphics */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-red-900 to-black pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-400 rounded-full blur-[120px] opacity-25 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left column: Call to Action */}
        <div className="w-full lg:w-1/2 flex flex-col text-left">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide w-fit mb-6 border border-white/20">
            <Zap className="w-4.5 h-4.5 text-yellow-300 animate-pulse fill-yellow-300" />
            <span>Kỷ Nguyên WiFi 6 - Phủ Sóng 100% Căn Hộ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 font-display">
            Lắp Mạng Viettel <br />
            <span className="text-yellow-300 relative">
              Cáp Quang Siêu Tốc
              <span className="absolute bottom-1 left-0 w-full h-[4px] bg-yellow-300/60 rounded-full"></span>
            </span>
          </h1>

          <p className="text-base sm:text-lg mb-8 text-white/90 font-medium leading-relaxed max-w-xl">
            Băng thông cáp quang FTTH siêu mượt lên tới <strong className="text-yellow-300">1 Gbps</strong>. 
            Trang bị miễn phí Modem Dual-Band WiFi thế hệ mới hoặc Router Mesh cực mạnh. 
            Đăng ký liền tay, bàn giao ngay trong 24h!
          </p>

          {/* Quick Registration Form */}
          <div className="bg-white text-gray-800 p-5 rounded-2xl shadow-2xl border border-white/10 max-w-md w-full mb-8">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
              Đăng ký tư vấn nhanh (Gọi lại miễn phí sau 15 phút)
            </h3>
            <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại của bạn..."
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-viettel hover:bg-viettel-hover text-white font-bold py-3 px-5 rounded-xl text-sm transition-all shadow-md shadow-red-500/10 flex items-center justify-center space-x-1 whitespace-nowrap active:scale-95"
              >
                <span>Nhận Tư Vấn</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {error && <p className="text-red-500 text-xs font-semibold mt-2">{error}</p>}
            <p className="text-[11px] text-gray-400 mt-2 font-medium">
              Bảo mật tuyệt đối thông tin khách hàng theo tiêu chuẩn Viettel Telecom.
            </p>
          </div>

          {/* Hero badges */}
          <div className="grid grid-cols-3 gap-3 max-w-md">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-white/95">
              <ShieldCheck className="w-5 h-5 text-yellow-300 flex-shrink-0" />
              <span>Free Modem WiFi 6</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-white/95">
              <Cpu className="w-5 h-5 text-yellow-300 flex-shrink-0" />
              <span>Miễn Phí 100% Lắp Đặt</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-white/95">
              <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0" />
              <span>Lắp đặt nhanh &lt; 24h</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Visual Speed Simulator */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col text-left">
                <span className="text-xs text-white/70 uppercase font-bold tracking-wider">Trình mô phỏng cước</span>
                <span className="text-lg font-bold font-display">Tốc độ cáp quang Viettel</span>
              </div>
              <div className="bg-yellow-300 text-red-900 px-3 py-1 rounded-full text-xs font-bold font-display flex items-center gap-1 shadow-md">
                <Zap className="w-3.5 h-3.5 fill-red-900 text-red-900" />
                <span>Siêu Nhanh</span>
              </div>
            </div>

            {/* Simulated Speed Gauge */}
            <div className="relative flex flex-col items-center mb-6">
              <div className="w-40 h-40 rounded-full border-8 border-white/10 flex flex-col items-center justify-center relative bg-gradient-to-tr from-white/5 to-white/15">
                {/* Glowing indicator line */}
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-yellow-300 transition-all duration-300"
                  style={{ transform: `rotate(${(speedVal / 1000) * 270 - 135}deg)` }}
                ></div>
                <span className="text-4xl font-black text-yellow-300 tracking-tighter font-display leading-none">
                  {speedVal}
                </span>
                <span className="text-xs font-bold text-white/70 mt-1 uppercase tracking-wider">Mbps</span>
              </div>

              {/* Slider Controller */}
              <div className="w-full mt-6 text-left">
                <div className="flex justify-between text-xs text-white/70 font-bold mb-1.5">
                  <span>NETVT01 (300 Mbps)</span>
                  <span>MESHVT3 (1000 Mbps)</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="1000"
                  step="50"
                  value={speedVal}
                  onChange={(e) => setSpeedVal(Number(e.target.value))}
                  className="w-full accent-yellow-300 bg-white/20 h-2 rounded-lg cursor-pointer outline-none"
                />
              </div>
            </div>

            {/* Performance estimates table */}
            <div className="bg-black/25 rounded-2xl p-4 text-left space-y-3">
              <h4 className="text-xs font-bold text-yellow-300 uppercase tracking-widest border-b border-white/10 pb-2 flex items-center justify-between">
                <span>Ước lượng thời gian tải xuống</span>
                <span className="text-[10px] text-white/60 lowercase italic font-normal">Công thức FTTH tiêu chuẩn</span>
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <p className="text-white/60 mb-0.5">Một Album Nhạc (100 MB)</p>
                  <p className="text-yellow-300 text-sm font-black font-display">
                    {calculateDownloadTime(100)}
                  </p>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <p className="text-white/60 mb-0.5">Video Full HD 4K (2 GB)</p>
                  <p className="text-yellow-300 text-sm font-black font-display">
                    {calculateDownloadTime(2000)}
                  </p>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <p className="text-white/60 mb-0.5">Tệp đồ họa lớn (10 GB)</p>
                  <p className="text-yellow-300 text-sm font-black font-display">
                    {calculateDownloadTime(10000)}
                  </p>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <p className="text-white/60 mb-0.5">Game PC bom tấn (60 GB)</p>
                  <p className="text-yellow-300 text-sm font-black font-display">
                    {calculateDownloadTime(60000)}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onViewPlans}
              className="w-full mt-6 bg-white hover:bg-gray-100 text-viettel font-black py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-black/10 active:scale-[0.98]"
            >
              Xem Chi Tiết &amp; So Sánh Các Gói Cước
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
