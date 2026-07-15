import { useState, FormEvent } from 'react';
import { PROVINCES } from '../data';
import { MapPin, Search, CheckCircle, Loader2, Info } from 'lucide-react';

interface CoverageCheckerProps {
  onCheckSuccess: (address: string) => void;
}

export default function CoverageChecker({ onCheckSuccess }: CoverageCheckerProps) {
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const selectedProvince = PROVINCES.find((p) => p.id === selectedProvinceId);
  const districts = selectedProvince ? selectedProvince.districts : [];

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProvinceId || !selectedDistrict || !ward.trim()) {
      return;
    }

    setIsLoading(true);
    setCheckResult(null);

    // Simulate real-time API lookup
    setTimeout(() => {
      setIsLoading(false);
      const fullAddress = `${ward.trim()}, ${selectedDistrict}, ${selectedProvince?.name}`;
      setCheckResult(fullAddress);
    }, 1200);
  };

  return (
    <section id="coverage" className="py-20 bg-gray-50 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Visual left rail */}
          <div className="md:col-span-4 bg-gradient-to-br from-gray-900 to-slate-800 text-white p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-viettel/10 pointer-events-none"></div>
            <div>
              <div className="bg-viettel-light text-viettel p-2 rounded-2xl w-fit mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold font-display leading-tight mb-2">Tra Cứu Bản Đồ Phủ Sóng</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Hạ tầng cáp quang Giga-GPON thế hệ mới của Viettel đã được nâng cấp đồng bộ trên 63 tỉnh thành. 
                Sử dụng công cụ này để kiểm tra xem tuyến đường của bạn đã sẵn sàng kéo dây chưa.
              </p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-4 text-left">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tỷ lệ phủ sóng quốc gia</p>
              <p className="text-2xl font-black text-yellow-300 font-display">99.8%</p>
            </div>
          </div>

          {/* Search form right rail */}
          <div className="md:col-span-8 p-6 md:p-10 text-left">
            <h4 className="text-lg font-extrabold text-gray-800 font-display mb-2">Điền thông tin địa chỉ cần khảo sát</h4>
            <p className="text-xs text-gray-500 mb-6">Nhân viên kỹ thuật sẽ dựa trên thông tin này để kiểm tra tủ cáp quang gần nhà bạn nhất.</p>

            <form onSubmit={handleCheck} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Province */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Tỉnh / Thành Phố *</label>
                  <select
                    value={selectedProvinceId}
                    onChange={(e) => {
                      setSelectedProvinceId(e.target.value);
                      setSelectedDistrict('');
                      setCheckResult(null);
                    }}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                  >
                    <option value="">-- Chọn Tỉnh / TP --</option>
                    {PROVINCES.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Quận / Huyện *</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setCheckResult(null);
                    }}
                    required
                    disabled={!selectedProvinceId}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">-- Chọn Quận / Huyện --</option>
                    {districts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ward / Address detail */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Số nhà, Tên đường, Phường/Xã *</label>
                <input
                  type="text"
                  placeholder="VD: Số 12 Ngõ 34 Phố Duy Tân, Phường Dịch Vọng Hậu..."
                  value={ward}
                  onChange={(e) => {
                    setWard(e.target.value);
                    setCheckResult(null);
                  }}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !selectedProvinceId || !selectedDistrict || !ward.trim()}
                className="w-full py-4 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white font-black rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md shadow-slate-900/10 active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    <span>Đang liên kết với trạm đo cáp...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4.5 h-4.5" />
                    <span>Kiểm tra vùng phủ sóng</span>
                  </>
                )}
              </button>
            </form>

            {/* Simulated Live Results panel */}
            {checkResult && (
              <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-start space-x-3 text-left">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-emerald-800 text-sm">Hạ tầng Cáp Quang 100% Khả Dụng!</h5>
                    <p className="text-xs text-emerald-700 mt-1">
                      Địa chỉ: <strong className="font-bold text-emerald-950">{checkResult}</strong> đã được đồng bộ hóa cáp quang Viettel Giga-FTTH. Sẵn sàng ký hợp đồng và triển khai đấu nối ngay.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onCheckSuccess(checkResult)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs whitespace-nowrap active:scale-95 transition-all"
                >
                  Đăng ký lắp đặt tại đây
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
