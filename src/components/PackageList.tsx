import { useState } from 'react';
import { PACKAGES } from '../data';
import { InternetPackage } from '../types';
import { Check, Info, Award, Shield, Wifi, Zap, Tv, Camera, Sparkles } from 'lucide-react';

interface PackageListProps {
  onSelectPackage: (packageName: string) => void;
}

export default function PackageList({ onSelectPackage }: PackageListProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>('personal');
  const [serviceType, setServiceType] = useState<'internet' | 'tv' | 'camera' | 'combo'>('combo');

  const filteredPackages = PACKAGES.filter((p) => p.category === activeTab);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getPriceForPackage = (pkg: InternetPackage) => {
    if (pkg.category === 'business') return pkg.price;
    switch (serviceType) {
      case 'internet':
        return pkg.price;
      case 'tv':
        return pkg.priceTv || pkg.price + 20000;
      case 'camera':
        return pkg.priceCamera || pkg.price + 20000;
      case 'combo':
        return pkg.priceCombo || pkg.price + 30000;
      default:
        return pkg.price;
    }
  };

  const getServiceNameInVietnamese = () => {
    switch (serviceType) {
      case 'internet':
        return 'Chỉ Internet';
      case 'tv':
        return 'Internet + Truyền hình TV360';
      case 'camera':
        return 'Internet + Camera Cloud';
      case 'combo':
        return 'Combo Mua 1 Được 3 (Internet + TV + Camera)';
      default:
        return 'Trọn Gói';
    }
  };

  return (
    <section id="packages" className="py-20 bg-gray-50 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1 bg-viettel-light px-3.5 py-1 rounded-full text-xs font-bold text-viettel mb-4 border border-red-100">
            <Award className="w-4 h-4" />
            <span>Cáp Quang Công Nghệ Mới Nhất 2026</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 font-display">
            Bảng Giá Gói Cước Internet Cáp Quang FTTH
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Hạ tầng mạng cáp quang Viettel phủ sóng toàn quốc, cam kết đường truyền ổn định, 
            miễn phí lắp đặt ban đầu khi đóng trước cước, hỗ trợ kỹ thuật nhanh chóng 24/7.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
          {/* Main Category Tabs */}
          <div className="bg-gray-200/75 p-1.5 rounded-2xl flex space-x-1 shadow-inner border border-gray-100 max-w-md w-full">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'personal'
                  ? 'bg-white text-viettel shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Wifi className="w-4 h-4" />
              <span>Cá nhân &amp; Gia đình</span>
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'business'
                  ? 'bg-white text-viettel shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Doanh nghiệp &amp; Quán Net</span>
            </button>
          </div>

          {/* Sub-Tabs for Personal Tier selection */}
          {activeTab === 'personal' && (
            <div className="w-full max-w-4xl bg-white p-2 rounded-2xl border border-gray-200/80 shadow-sm flex flex-wrap md:flex-nowrap gap-1">
              <button
                onClick={() => setServiceType('internet')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  serviceType === 'internet'
                    ? 'bg-gray-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Wifi className="w-4 h-4" />
                <span>Chỉ Internet</span>
              </button>
              <button
                onClick={() => setServiceType('tv')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  serviceType === 'tv'
                    ? 'bg-gray-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Tv className="w-4 h-4" />
                <span>Internet + TV360 (+20k)</span>
              </button>
              <button
                onClick={() => setServiceType('camera')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  serviceType === 'camera'
                    ? 'bg-gray-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Internet + Camera (+20k)</span>
              </button>
              <button
                onClick={() => setServiceType('combo')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  serviceType === 'combo'
                    ? 'bg-[#ee0033] text-white shadow-md shadow-red-500/10'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Sparkles className="w-4 h-4 animate-pulse text-amber-300 fill-amber-300" />
                <span>Combo Mua 1 Được 3 (+30k)</span>
              </button>
            </div>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-center items-stretch">
          {filteredPackages.map((pkg) => {
            const currentPrice = getPriceForPackage(pkg);
            return (
              <div
                key={pkg.id}
                className={`bg-white border rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative ${
                  pkg.isPopular
                    ? 'border-2 border-viettel shadow-lg shadow-red-500/5 lg:scale-[1.02] z-10 overflow-visible'
                    : 'border-gray-200 overflow-hidden'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ee0033] text-white px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase shadow-md whitespace-nowrap z-30">
                    Phổ biến nhất
                  </div>
                )}

                {/* Package Meta Info */}
                <div className="text-left mb-4">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Mã Gói: {pkg.id.toUpperCase()}
                  </span>
                  <h3 className="text-lg md:text-xl font-black text-gray-800 font-display mb-1 flex items-center gap-1.5">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-gray-500 min-h-[36px] line-clamp-2 leading-relaxed">
                    {pkg.desc}
                  </p>

                  {/* Speed Details Indicator */}
                  <div className="mt-3.5 bg-gray-50 p-2.5 rounded-2xl flex items-center space-x-2.5 border border-gray-100">
                    <div className="bg-viettel-light p-1.5 rounded-lg text-viettel">
                      <Zap className="w-4 h-4 fill-viettel" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Băng thông</p>
                      <p className="text-sm font-extrabold text-gray-800 font-display">{pkg.speed}</p>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-left mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-viettel text-2xl md:text-3xl font-black font-display tracking-tight">
                      {formatPrice(currentPrice)}đ
                    </span>
                    <span className="text-gray-400 text-xs font-bold">/tháng</span>
                  </div>
                  <p className="text-[9px] text-gray-400 font-medium mt-0.5">
                    ({activeTab === 'personal' ? getServiceNameInVietnamese() : 'Đã gồm 10% VAT'})
                  </p>
                </div>

                {/* Key Features List */}
                <div className="border-t border-gray-100 pt-4 mb-6 flex-grow">
                  <p className="text-[10px] font-extrabold text-gray-700 uppercase tracking-widest mb-2.5 flex items-center gap-1">
                    <Info className="w-3 h-3 text-viettel" />
                    <span>Quyền lợi gói</span>
                  </p>
                  <ul className="space-y-2.5 text-left">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs font-medium text-gray-600 leading-tight">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    <li className="flex items-start text-xs font-semibold text-gray-700 bg-gray-50 p-2 rounded-xl border border-dashed border-gray-200">
                      <Check className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Phát WiFi: {pkg.wifiType}</span>
                    </li>
                  </ul>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => onSelectPackage(`${pkg.name} (${activeTab === 'personal' ? getServiceNameInVietnamese() : 'Doanh Nghiệp'})`)}
                  className={`w-full py-3 rounded-2xl font-black text-xs tracking-wide uppercase transition-all duration-300 ${
                    pkg.isPopular
                      ? 'bg-viettel text-white hover:bg-viettel-hover shadow-lg shadow-red-500/15 hover:shadow-xl'
                      : 'bg-white border-2 border-viettel text-viettel hover:bg-viettel hover:text-white'
                  }`}
                >
                  Đăng ký lắp đặt
                </button>
              </div>
            );
          })}
        </div>

        {/* Notes/Disclaimers */}
        <div className="mt-12 bg-white rounded-3xl p-6 max-w-4xl mx-auto text-left shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-viettel"></span>
              <span>Lưu ý về giá cước khu vực</span>
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Giá cước trên áp dụng cho ngoại thành Hà Nội, TP.HCM &amp; 61 tỉnh thành khác. 
              Khu vực Nội thành Hà Nội &amp; TP.HCM có thể chênh lệch khoảng 20.000đ - 30.000đ/tháng do chính sách hạ tầng đặc thù. 
              Vui lòng đăng ký tư vấn để được báo giá chính xác nhất.
            </p>
          </div>
          <button
            onClick={() => onSelectPackage('Tư vấn khảo sát')}
            className="text-xs font-bold text-viettel hover:text-viettel-hover border-b-2 border-dashed border-viettel hover:border-viettel-hover whitespace-nowrap self-start md:self-center transition-all pb-0.5"
          >
            Liên hệ nhân viên khảo sát
          </button>
        </div>
      </div>
    </section>
  );
}
