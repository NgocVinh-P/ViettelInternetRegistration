import { useState, useEffect, FormEvent } from 'react';
import { PACKAGES } from '../data';
import { X, Check, Loader2, Award, ShieldAlert, FileText, Send } from 'lucide-react';
import { RegistrationLead } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlan: string;
  preselectedPrepayment?: string;
  onSuccess: (lead: RegistrationLead) => void;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  preselectedPlan,
  preselectedPrepayment = '6m',
  onSuccess,
}: RegistrationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPackageName, setSelectedPackageName] = useState('');
  const [prepayment, setPrepayment] = useState('6m');
  const [notes, setNotes] = useState('');

  // Validations
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<RegistrationLead | null>(null);

  // Sync state with preselected inputs
  useEffect(() => {
    if (isOpen) {
      setSubmitSuccess(null);
      setName('');
      setPhone('');
      setAddress('');
      setNotes('');
      setErrors({});

      if (preselectedPlan) {
        // Find matching package
        const found = PACKAGES.find((p) => p.name.toLowerCase() === preselectedPlan.toLowerCase() || p.id.toLowerCase() === preselectedPlan.toLowerCase());
        if (found) {
          setSelectedPackageName(found.name);
        } else {
          setSelectedPackageName(PACKAGES[1].name); // Default to STAR 1
        }
      } else {
        setSelectedPackageName(PACKAGES[1].name);
      }

      setPrepayment(preselectedPrepayment);
    }
  }, [isOpen, preselectedPlan, preselectedPrepayment]);

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find((p) => p.name === selectedPackageName) || PACKAGES[1];

  const validate = () => {
    const errs: Record<string, string> = {};
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/;

    if (!name.trim()) {
      errs.name = 'Vui lòng điền họ và tên';
    } else if (name.trim().length < 3) {
      errs.name = 'Họ và tên phải có ít nhất 3 ký tự';
    }

    if (!phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại';
    } else if (!phoneRegex.test(phone.trim())) {
      errs.phone = 'Số điện thoại không đúng định dạng Việt Nam (VD: 0987654321)';
    }

    if (!address.trim()) {
      errs.address = 'Vui lòng điền địa chỉ chi tiết để khảo sát cáp';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      setIsSubmitting(false);
      const trackingId = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
      const newLead: RegistrationLead = {
        id: trackingId,
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        packageId: currentPkg.id,
        packageName: currentPkg.name,
        packagePrice: currentPkg.price,
        prepayment,
        status: 'pending',
        createdAt: new Date().toISOString(),
        notes: notes.trim(),
      };

      // Push to LocalStorage
      const existing = localStorage.getItem('viettel_registration_leads');
      const leads = existing ? JSON.parse(existing) : [];
      leads.unshift(newLead);
      localStorage.setItem('viettel_registration_leads', JSON.stringify(leads));

      setSubmitSuccess(newLead);
      onSuccess(newLead);
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getPrepaymentLabel = (key: string) => {
    switch (key) {
      case 'monthly':
        return 'Hàng tháng (Cước đóng từng tháng)';
      case '6m':
        return 'Đóng trước 6 tháng (Tặng 1 tháng)';
      case '12m':
        return 'Đóng trước 12 tháng (Tặng 2 tháng)';
      case '18m':
        return 'Đóng trước 18 tháng (Tặng 3 tháng)';
      default:
        return 'Đóng trước 6 tháng';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-w-xl w-full relative border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-viettel to-[#cc002c] text-white p-5 flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-xl font-extrabold font-display">Đăng Ký Lắp Đặt Cáp Quang</h3>
            <p className="text-xs text-white/80 font-medium">Bàn giao &amp; Kéo mạng trong vòng 24 giờ</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 flex-grow">
          {!submitSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Gói cước đã chọn</p>
                  <p className="font-extrabold text-gray-800 text-base">{currentPkg.name}</p>
                </div>
                <div className="text-right sm:text-right self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-200">
                  <p className="text-viettel font-black text-lg">{formatPrice(currentPkg.price)}đ<span className="text-[10px] text-gray-400 font-bold">/tháng</span></p>
                  <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5">
                    Tốc độ: {currentPkg.speed}
                  </p>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Họ và tên khách hàng *</label>
                <input
                  type="text"
                  placeholder="VD: Nguyễn Văn A"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium transition-all ${
                    errors.name ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Số điện thoại liên hệ *</label>
                <input
                  type="tel"
                  placeholder="VD: 0987xxxxxx"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium transition-all ${
                    errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs font-semibold mt-1">{errors.phone}</p>}
              </div>

              {/* Interactive package select dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Thay đổi gói cước</label>
                  <select
                    value={selectedPackageName}
                    onChange={(e) => setSelectedPackageName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                  >
                    {PACKAGES.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.speed})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Hình thức thanh toán</label>
                  <select
                    value={prepayment}
                    onChange={(e) => setPrepayment(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                  >
                    <option value="monthly">Đóng cước hàng tháng</option>
                    <option value="6m">Đóng 6 tháng (Tặng 1 tháng)</option>
                    <option value="12m">Đóng 12 tháng (Tặng 2 tháng)</option>
                    <option value="18m">Đóng 18 tháng (Tặng 3 tháng)</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Địa chỉ lắp đặt chi tiết *</label>
                <textarea
                  placeholder="VD: Số 12, Ngõ 34, Phường Xuân Thủy, Quận Cầu Giấy, Hà Nội"
                  rows={2}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors({ ...errors, address: '' });
                  }}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium transition-all resize-none ${
                    errors.address ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'
                  }`}
                ></textarea>
                {errors.address && <p className="text-red-500 text-xs font-semibold mt-1">{errors.address}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Ghi chú thêm (Nếu có)</label>
                <input
                  type="text"
                  placeholder="VD: Lắp đặt sau giờ hành chính, cần kéo dây hướng ban công..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                />
              </div>

              {/* Security Badge */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-500 leading-normal font-medium">
                  <strong>Cam kết bảo mật:</strong> Thông tin của bạn được truyền đi mã hóa và lưu trữ tại Hệ thống Viettel Services Portal để khảo sát hạ tầng, tuyệt đối không rò rỉ cho bên thứ ba.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-4 bg-viettel hover:bg-viettel-hover text-white font-black rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg shadow-red-600/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    <span>Đang khởi tạo hồ sơ...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4.5 h-4.5" />
                    <span>Gửi yêu cầu lắp đặt</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success State Receipt */
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-black text-gray-800 font-display">Gửi Yêu Cầu Thành Công!</h4>
              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                Cảm ơn bạn! Hệ thống Viettel Portal đã nhận được phiếu yêu cầu khảo sát đường truyền của bạn.
              </p>

              {/* Receipt card */}
              <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-6 text-left max-w-md mx-auto space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
                  <div className="flex items-center space-x-1.5 text-gray-400 font-bold text-xs uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-viettel" />
                    <span>Mã Đơn Đăng Ký</span>
                  </div>
                  <span className="font-mono text-sm font-black text-viettel bg-red-50 border border-red-100 px-3 py-1 rounded-lg">
                    {submitSuccess.id}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs font-semibold text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Khách hàng:</span>
                    <span className="text-gray-800 font-bold">{submitSuccess.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Số điện thoại:</span>
                    <span className="text-gray-800 font-bold font-mono">{submitSuccess.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gói đăng ký:</span>
                    <span className="text-gray-800 font-bold">{submitSuccess.packageName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hình thức:</span>
                    <span className="text-gray-800 font-bold">{getPrepaymentLabel(submitSuccess.prepayment)}</span>
                  </div>
                  <div className="flex flex-col border-t border-gray-200/60 pt-3 mt-3">
                    <span className="text-gray-400 mb-1">Địa chỉ lắp đặt:</span>
                    <span className="text-gray-800 font-bold text-xs leading-relaxed">{submitSuccess.address}</span>
                  </div>
                </div>
              </div>

              {/* Callback reminder */}
              <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-4 max-w-md mx-auto text-left flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-700 font-bold text-sm flex-shrink-0">
                  ⚡ 15p
                </div>
                <div>
                  <h5 className="font-bold text-amber-900 text-sm">Thời gian liên hệ ước tính</h5>
                  <p className="text-xs text-amber-800 mt-1 leading-normal font-medium">
                    Nhân viên kinh doanh Viettel tại khu vực sẽ gọi điện trực tiếp để tư vấn lắp đặt và hẹn thời gian thi công trong vòng 15-30 phút tới. Quý khách vui lòng giữ máy.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3 max-w-md mx-auto">
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 rounded-2xl text-xs font-black uppercase tracking-wider transition-colors active:scale-95"
                >
                  Đóng cửa sổ
                </button>
                <a
                  href="tel:18008119"
                  className="flex-1 py-3.5 bg-viettel hover:bg-viettel-hover text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Gọi Hotline Hỗ Trợ</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
