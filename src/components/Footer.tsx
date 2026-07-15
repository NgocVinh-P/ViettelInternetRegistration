import { Award, ShieldCheck, Mail, MapPin, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-16 px-4 md:px-6 border-t border-slate-800">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
        {/* Col 1: Brand details */}
        <div className="space-y-4">
          <div className="bg-white text-viettel inline-block px-4 py-2 rounded-xl font-black text-xl italic tracking-wider shadow-md">
            Viettel
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Tập đoàn Công nghiệp - Viễn thông Quân đội. Viettel tự hào là nhà cung cấp dịch vụ viễn thông 
            và Internet cáp quang băng thông rộng hàng đầu tại Việt Nam.
          </p>
          <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-xl border border-white/5 w-fit">
            <Award className="w-5 h-5 text-yellow-300 flex-shrink-0" />
            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">Đối tác ủy quyền chính thức</span>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h4 className="font-extrabold text-white text-sm uppercase tracking-widest border-b border-white/10 pb-3 mb-4">
            Dịch Vụ Cung Cấp
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold text-gray-400">
            <li>
              <a href="#packages" className="hover:text-white transition-colors">
                Cáp quang Hộ gia đình (SUN, STAR)
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-white transition-colors">
                Cáp quang Doanh nghiệp lớn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Truyền hình số TV360 độ nét cao
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Sim số đẹp &amp; Gói cước di động
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Giải pháp số doanh nghiệp (Hóa đơn, Chữ ký số)
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Support */}
        <div>
          <h4 className="font-extrabold text-white text-sm uppercase tracking-widest border-b border-white/10 pb-3 mb-4">
            Hỗ Trợ Khách Hàng
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold text-gray-400">
            <li>
              <a href="#faqs" className="hover:text-white transition-colors">
                Hỏi đáp thường gặp
              </a>
            </li>
            <li>
              <a href="tel:18008119" className="hover:text-white transition-colors">
                Báo hỏng dịch vụ (1800 8119 nhánh 2)
              </a>
            </li>
            <li>
              <a href="#coverage" className="hover:text-white transition-colors">
                Bản đồ tra cứu vùng phủ sóng
              </a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-white transition-colors">
                Ước tính cước phí sử dụng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Chính sách bảo mật thông tin
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Hotlines */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-white text-sm uppercase tracking-widest border-b border-white/10 pb-3 mb-4">
            Tổng Đài Đăng Ký
          </h4>
          <div className="space-y-2">
            <a
              href="tel:18008119"
              className="flex items-center space-x-2.5 bg-viettel text-white p-3 rounded-2xl font-black text-lg shadow-md hover:bg-viettel-hover transition-all w-fit"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span className="font-display">1800 8119</span>
            </a>
            <p className="text-[10px] text-gray-400 font-medium leading-normal">
              Miễn phí cước cuộc gọi 24/7 từ mọi thuê bao Viettel, Vinaphone, Mobifone, Vietnamobile...
            </p>
          </div>

          <div className="pt-2 text-xs font-semibold text-gray-400 space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-viettel flex-shrink-0" />
              <span>Trụ sở chính: Lô D26 Khu đô thị mới Cầu Giấy, Hà Nội</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-viettel flex-shrink-0" />
              <span>cskh@viettel.com.vn</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-gray-500 font-medium max-w-5xl mx-auto space-y-2">
        <p>© 2026 Bản quyền thuộc về Đối tác ủy quyền phát triển dịch vụ Viettel Telecom.</p>
        <p className="leading-relaxed">
          Sản phẩm website được thiết kế nhằm mục đích giới thiệu dịch vụ và đăng ký trực tuyến tiện ích cho khách hàng. 
          Logo, thương hiệu Viettel thuộc sở hữu bản quyền của Tập đoàn Công nghiệp - Viễn thông Quân đội.
        </p>
      </div>
    </footer>
  );
}
