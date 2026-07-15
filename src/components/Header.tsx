import { useState, useEffect } from 'react';
import { Phone, Menu, X, Wifi, Tv, Gift } from 'lucide-react';

interface HeaderProps {
  onRegisterClick: (packageName: string) => void;
}

export default function Header({ onRegisterClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Trang chủ', href: '#' },
    { label: 'Gói cước Internet', href: '#packages' },
    { label: 'Tính giá cước', href: '#calculator' },
    { label: 'Kiểm tra vùng phủ', href: '#coverage' },
    { label: 'Khuyến mãi', href: '#promotions' },
    { label: 'Hỏi đáp', href: '#faqs' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-white md:bg-white/95 backdrop-blur-md shadow-md py-3'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="bg-viettel text-white px-4 py-2 rounded-xl font-black text-xl italic tracking-wider shadow-md shadow-red-500/10 group-hover:scale-105 transition-transform">
            Viettel
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-gray-800 text-sm tracking-widest font-display leading-none">
              SERVICES PORTAL
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-normal mt-0.5">
              Đối tác ủy quyền chính thức
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-7 font-semibold text-gray-600 text-sm">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-viettel transition-colors duration-200 relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-viettel hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Menu Button */}
        <div className="flex items-center space-x-3">
          <a
            href="tel:18008119"
            className="hidden sm:flex items-center space-x-2 bg-viettel text-white px-5 py-2.5 rounded-full font-bold hover:bg-viettel-hover transition-all duration-200 shadow-md shadow-red-600/15"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span className="font-display tracking-tight text-sm">1800 8119</span>
          </a>

          <button
            onClick={() => onRegisterClick('Tư vấn chung')}
            className="bg-gray-100 text-gray-800 hover:bg-viettel hover:text-white px-4 py-2.5 rounded-full font-bold text-sm transition-all duration-200"
          >
            Đăng ký ngay
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-viettel focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-black/50 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsMenuOpen(false)}>
          {/* Mobile Menu Panel */}
          <div
            className="absolute top-0 right-0 w-72 bg-white h-[calc(100vh-60px)] shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-100">
                <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Danh mục dịch vụ</p>
              </div>
              <nav className="flex flex-col space-y-3 font-bold text-gray-700 text-base">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 hover:text-viettel transition-colors flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-viettel transition-colors"></span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-3 border-t border-gray-100 pt-6">
              <a
                href="tel:18008119"
                className="flex items-center justify-center space-x-2 bg-viettel text-white w-full py-3 rounded-xl font-bold shadow-md hover:bg-viettel-hover transition-colors"
              >
                <Phone className="w-4 h-4 animate-pulse" />
                <span>Hotline 24/7: 1800 8119</span>
              </a>
              <p className="text-center text-[11px] text-gray-400 font-medium">
                Miễn phí cuộc gọi từ mọi nhà mạng
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
