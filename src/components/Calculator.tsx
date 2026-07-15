import { useState } from 'react';
import { PACKAGES } from '../data';
import { Calculator as CalcIcon, Gift, ArrowRight, ShieldCheck, BadgePercent, Tv, Camera, Wifi, Sparkles } from 'lucide-react';

interface CalculatorProps {
  onRegisterCustom: (packageName: string, prepayment: string) => void;
}

export default function Calculator({ onRegisterCustom }: CalculatorProps) {
  const [selectedPkgId, setSelectedPkgId] = useState(PACKAGES[1].id); // Default to MESHVT1
  const [serviceType, setServiceType] = useState<'internet' | 'tv' | 'camera' | 'combo'>('combo');
  const [prepayment, setPrepayment] = useState('6m'); // Default to 6 months

  const currentPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[1];

  const getPriceForPackage = (pkg: any) => {
    if (pkg.category === 'business') return pkg.price;
    switch (serviceType) {
      case 'internet':
        return pkg.price;
      case 'tv':
        return pkg.priceTv || (pkg.price + 20000);
      case 'camera':
        return pkg.priceCamera || (pkg.price + 20000);
      case 'combo':
        return pkg.priceCombo || (pkg.price + 30000);
      default:
        return pkg.price;
    }
  };

  const currentPrice = getPriceForPackage(currentPkg);

  const getPromoDetails = () => {
    switch (prepayment) {
      case 'monthly':
        return {
          monthsToPay: 1,
          bonusMonths: 0,
          installFee: 300000,
          bonusDesc: 'Đóng cước theo tháng. Phí lắp đặt 300.000đ.',
          savings: 0,
        };
      case '6m':
        return {
          monthsToPay: 6,
          bonusMonths: 1,
          installFee: 0,
          bonusDesc: 'TẶNG 01 tháng cước miễn phí + Miễn phí lắp đặt 100%.',
          savings: 300000 + currentPrice * 1,
        };
      case '12m':
        return {
          monthsToPay: 12,
          bonusMonths: 2,
          installFee: 0,
          bonusDesc: 'TẶNG 02 tháng cước miễn phí + Miễn phí lắp đặt 100% (Khuyên dùng).',
          savings: 300000 + currentPrice * 2,
        };
      case '18m':
        return {
          monthsToPay: 18,
          bonusMonths: 3,
          installFee: 0,
          bonusDesc: 'TẶNG 03 tháng cước miễn phí + Miễn phí lắp đặt 100%.',
          savings: 300000 + currentPrice * 3,
        };
      default:
        return { monthsToPay: 6, bonusMonths: 1, installFee: 0, bonusDesc: '', savings: 0 };
    }
  };

  const promo = getPromoDetails();
  const totalPayment = currentPrice * promo.monthsToPay + promo.installFee;
  const totalMonths = promo.monthsToPay + promo.bonusMonths;
  const averageMonthlyCost = Math.round(totalPayment / totalMonths);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getServiceNameInVietnamese = () => {
    switch (serviceType) {
      case 'internet':
        return 'Chỉ Internet';
      case 'tv':
        return 'Internet + TV360';
      case 'camera':
        return 'Internet + Camera Cloud';
      case 'combo':
        return 'Combo Mua 1 Được 3';
      default:
        return 'Trọn Gói';
    }
  };

  return (
    <section id="calculator" className="py-20 bg-white px-4 md:px-6 scroll-mt-10">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1 bg-yellow-100 px-3.5 py-1 rounded-full text-xs font-bold text-amber-700 mb-4 border border-yellow-200">
            <CalcIcon className="w-4 h-4" />
            <span>Công cụ tính toán cước thông minh</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 font-display">
            Ước Tính Chi Phí &amp; Quà Tặng Đóng Trước
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Lựa chọn gói cước và hình thức thanh toán để tính toán số tiền thực tế, 
            số tiền tiết kiệm được cùng quà tặng đi kèm từ Viettel.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Choose Package */}
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-viettel text-white text-[10px] font-black">1</span>
                <span>Chọn Gói Cước Của Bạn:</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACKAGES.map((pkg) => {
                  const pkgPrice = getPriceForPackage(pkg);
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                        selectedPkgId === pkg.id
                          ? 'border-viettel bg-viettel-light/30 ring-2 ring-viettel/15'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <p className="font-bold text-gray-800 text-sm">{pkg.name}</p>
                      <div className="flex justify-between items-baseline mt-1.5">
                        <span className="text-viettel font-black text-base">{formatPrice(pkgPrice)}đ</span>
                        <span className="text-xs text-gray-400 font-bold">{pkg.speed}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Service Type (Only for personal plans) */}
            {currentPkg.category === 'personal' && (
              <div className="text-left">
                <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-viettel text-white text-[10px] font-black">2</span>
                  <span>Chọn Dịch Vụ Tích Hợp:</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setServiceType('internet')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center space-x-2.5 ${
                      serviceType === 'internet'
                        ? 'border-viettel bg-viettel-light/20 ring-2 ring-viettel/10'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Wifi className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Chỉ Internet</p>
                      <p className="text-[10px] text-gray-400 font-medium">Gói cước cơ bản</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setServiceType('tv')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center space-x-2.5 ${
                      serviceType === 'tv'
                        ? 'border-viettel bg-viettel-light/20 ring-2 ring-viettel/10'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Tv className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Internet + TV360</p>
                      <p className="text-[10px] text-gray-400 font-medium">Bóng đá &amp; Giải trí</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setServiceType('camera')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center space-x-2.5 ${
                      serviceType === 'camera'
                        ? 'border-viettel bg-viettel-light/20 ring-2 ring-viettel/10'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Camera className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Internet + Camera</p>
                      <p className="text-[10px] text-gray-400 font-medium">Giám sát AI Cloud</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setServiceType('combo')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center space-x-2.5 relative overflow-hidden ${
                      serviceType === 'combo'
                        ? 'border-[#ee0033] bg-red-50/50 ring-2 ring-[#ee0033]/10'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 text-viettel flex-shrink-0 fill-red-100" />
                    <div className="z-10">
                      <p className="text-xs font-bold text-gray-800 flex items-center gap-1">
                        <span>Combo Mua 1 Được 3</span>
                      </p>
                      <p className="text-[10px] text-viettel font-bold">Siêu tiết kiệm (+30k)</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Choose Payment Duration */}
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-viettel text-white text-[10px] font-black">
                  {currentPkg.category === 'personal' ? '3' : '2'}
                </span>
                <span>Chọn Thời Gian Đóng Trước:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: 'monthly', label: 'Hàng tháng', sub: 'Không ưu đãi' },
                  { value: '6m', label: '6 tháng', sub: 'Tặng 1 tháng' },
                  { value: '12m', label: '12 tháng', sub: 'Tặng 2 tháng' },
                  { value: '18m', label: '18 tháng', sub: 'Tặng 3 tháng' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPrepayment(opt.value)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      prepayment === opt.value
                        ? 'border-viettel bg-viettel text-white shadow-md font-bold'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <p className="text-xs font-black uppercase tracking-wider">{opt.label}</p>
                    <p className={`text-[10px] mt-0.5 font-bold ${prepayment === opt.value ? 'text-yellow-200' : 'text-gray-400'}`}>
                      {opt.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 to-slate-800 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-viettel/10 rounded-full blur-2xl"></div>

            <div className="text-left mb-6">
              <span className="text-[10px] bg-white/10 text-yellow-300 font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider border border-white/5">
                Tổng quan hóa đơn ước tính
              </span>
              <h3 className="text-lg font-black mt-3 font-display">Chi Tiết Quyền Lợi</h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">{promo.bonusDesc}</p>
            </div>

            {/* Price Calculations */}
            <div className="space-y-4 border-t border-b border-white/10 py-5 my-2">
              <div className="flex justify-between text-xs font-semibold text-gray-300">
                <span>Giá cước hàng tháng:</span>
                <span className="font-bold text-white">{formatPrice(currentPrice)}đ</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-gray-300">
                <span>Phí lắp đặt ban đầu:</span>
                <span className={promo.installFee === 0 ? 'text-emerald-400 font-bold' : ''}>
                  {promo.installFee === 0 ? 'Miễn phí' : `${formatPrice(promo.installFee)}đ`}
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-gray-300">
                <span>Số tháng sử dụng thực tế:</span>
                <span className="text-yellow-300 font-bold">
                  {promo.monthsToPay} + {promo.bonusMonths} = {totalMonths} tháng
                </span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-200 pt-1">
                <span className="flex items-center gap-1">
                  <Gift className="w-4 h-4 text-emerald-400" />
                  <span>Tổng tiết kiệm của bạn:</span>
                </span>
                <span className="text-emerald-400 text-sm font-black font-display">
                  {promo.savings === 0 ? '0đ' : `${formatPrice(promo.savings)}đ`}
                </span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="text-left my-4">
              <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Tổng tiền cần thanh toán:</p>
              <p className="text-3xl font-black text-yellow-300 tracking-tight font-display mt-1">
                {formatPrice(totalPayment)}đ
              </p>
              
              {/* Avg price indicator */}
              {prepayment !== 'monthly' && (
                <div className="mt-3 bg-white/5 border border-white/5 p-3 rounded-2xl flex items-center space-x-2">
                  <BadgePercent className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <p className="text-xs text-gray-300 leading-tight">
                    Tính ra chỉ khoảng <strong className="text-yellow-300 font-bold">{formatPrice(averageMonthlyCost)}đ</strong>/tháng cước sử dụng!
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => onRegisterCustom(`${currentPkg.name} (${currentPkg.category === 'personal' ? getServiceNameInVietnamese() : 'Doanh Nghiệp'})`, prepayment)}
              className="w-full mt-2 bg-viettel hover:bg-viettel-hover text-white font-black py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg shadow-red-600/20 active:scale-95"
            >
              <span>Đăng ký cước đã tính</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brand commitment badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-left">
          <div className="flex items-start space-x-3.5 bg-gray-50 border border-gray-100 rounded-2xl p-4">
            <ShieldCheck className="w-8 h-8 text-viettel flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-gray-800">Cam Kết Không Phát Sinh</h4>
              <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                Giá cước cố định trong suốt 24 tháng chu kỳ hợp đồng. Không tự ý đổi gói hay tăng giá.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3.5 bg-gray-50 border border-gray-100 rounded-2xl p-4">
            <Gift className="w-8 h-8 text-viettel flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-gray-800">Miễn Phí Thiết Bị Mới 100%</h4>
              <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                Modem WiFi 5Ghz/WiFi 6 chính hãng Viettel, được bảo hành và đổi mới miễn phí trong suốt dòng đời.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3.5 bg-gray-50 border border-gray-100 rounded-2xl p-4">
            <CalcIcon className="w-8 h-8 text-viettel flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-gray-800">Thủ Tục Đơn Giản &amp; Nhanh</h4>
              <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                Đăng ký online cực nhanh, ký hợp đồng điện tử tiện lợi, lắp đặt nhanh gọn trong ngày.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
