import { InternetPackage, FaqItem, TestimonialItem } from './types';

export const PACKAGES: InternetPackage[] = [
  // Cá nhân & Hộ gia đình
  {
    id: 'netvt01',
    name: 'Gói NETVT01',
    price: 195000,
    priceTv: 215000,
    priceCamera: 215000,
    priceCombo: 225000,
    speed: '300 Mbps',
    wifiType: '01 Modem WiFi 6',
    desc: 'Băng thông 300 Mbps cực cao, tối ưu tuyệt đối về chi phí cho cá nhân và gia đình nhỏ.',
    features: [
      'Băng thông download/upload: 300 Mbps',
      'Trang bị 01 Modem WiFi 6 thế hệ mới nhất',
      'Kèm Camera AI + TV360 sắc nét (tùy chọn gói combo)',
      'Hỗ trợ truy cập mạng siêu mượt mà, không gián đoạn'
    ],
    category: 'personal'
  },
  {
    id: 'meshvt1',
    name: 'Gói MESHVT1',
    price: 210000,
    priceTv: 230000,
    priceCamera: 230000,
    priceCombo: 240000,
    speed: '300 Mbps',
    wifiType: '01 Modem WiFi 6 + 01 Home WiFi (Mesh)',
    desc: 'Lựa chọn phổ biến nhất! Mạng lưới Mesh WiFi phủ sóng ổn định toàn diện mọi góc phòng.',
    features: [
      'Băng thông download/upload: 300 Mbps',
      '01 Modem WiFi 6 + 01 Home WiFi Mesh thông minh',
      'Triệt tiêu hoàn toàn vùng sóng yếu hay chập chờn',
      'Tặng tài khoản TV360 hoặc Camera Cloud lưu trữ (khi chọn combo)'
    ],
    isPopular: true,
    category: 'personal'
  },
  {
    id: 'netvt2',
    name: 'Gói NETVT2',
    price: 240000,
    priceTv: 260000,
    priceCamera: 260000,
    priceCombo: 270000,
    speed: '500 Mbps - 1 Gbps',
    wifiType: '01 Modem WiFi 6',
    desc: 'Băng thông khủng tối thiểu 500 Mbps, tối đa 1 Gbps cho gia đình đông thiết bị, Livestream mượt mà.',
    features: [
      'Băng thông download/upload: Tối thiểu 500 Mbps, tối đa 1 Gbps',
      '01 Modem WiFi 6 cao cấp, truyền tải siêu tốc',
      'Độ trễ cực thấp, phù hợp chơi game online ping thấp, xem video 4K/8K',
      'Kèm Camera AI sắc nét + TV360 Bundesliga độc quyền (khi chọn combo)'
    ],
    category: 'personal'
  },
  {
    id: 'meshvt2',
    name: 'Gói MESHVT2',
    price: 245000,
    priceTv: 265000,
    priceCamera: 265000,
    priceCombo: 275000,
    speed: '500 Mbps - 1 Gbps',
    wifiType: '01 Modem WiFi 6 + 02 Home WiFi (Mesh)',
    desc: 'Mesh WiFi siêu băng thông kết hợp 2 node Mesh phụ, phù hợp nhà 2-3 tầng, biệt thự.',
    features: [
      'Băng thông download/upload: Tối thiểu 500 Mbps, tối đa 1 Gbps',
      '01 Modem WiFi 6 + 02 thiết bị Home WiFi Mesh mở rộng',
      'Độ phủ sóng siêu rộng, chịu tải tốt hơn 40 thiết bị cùng lúc',
      'Nâng cấp lên trọn bộ combo TV360 & Camera AI cực kỳ dễ dàng'
    ],
    category: 'personal'
  },
  {
    id: 'meshvt3',
    name: 'Gói MESHVT3',
    price: 299000,
    priceTv: 319000,
    priceCamera: 319000,
    priceCombo: 329000,
    speed: '500 Mbps - 1 Gbps',
    wifiType: '01 Modem WiFi 6 + 03 Home WiFi (Mesh)',
    desc: 'Đỉnh cao phủ sóng với 3 thiết bị Home WiFi Mesh, sự lựa chọn tối cao cho biệt thự rộng, SmartHome.',
    features: [
      'Băng thông download/upload: Tối thiểu 500 Mbps, cực đại 1 Gbps',
      '01 Modem WiFi 6 + 03 thiết bị Home WiFi Mesh thế hệ mới nhất',
      'Sức chứa khổng lồ lên tới 60+ kết nối không dây đồng thời',
      'Lý tưởng cho hệ sinh thái nhà thông minh IoT, camera giám sát liên tục'
    ],
    category: 'personal'
  },

  // Doanh nghiệp & Quán Game
  {
    id: 'f90n',
    name: 'Gói F90N (Doanh nghiệp)',
    price: 440000,
    speed: '90 Mbps',
    wifiType: 'Modem Chuyên Dụng + 01 IP Tĩnh',
    desc: 'Phù hợp văn phòng nhỏ, hộ kinh doanh cá thể yêu cầu có IP tĩnh ổn định đường truyền.',
    features: [
      'Băng thông trong nước: 90 Mbps',
      'Cam kết băng thông quốc tế tối thiểu: 2.0 Mbps',
      'Miễn phí 01 IP Tĩnh (Static IP) suốt thời gian sử dụng',
      'Chăm sóc kỹ thuật ưu tiên trong vòng 2 giờ'
    ],
    category: 'business'
  },
  {
    id: 'f150n',
    name: 'Gói F150N (Doanh nghiệp)',
    price: 880000,
    speed: '150 Mbps',
    wifiType: 'Vigor Router Chịu Tải + 01 IP Tĩnh',
    desc: 'Dành cho văn phòng quy mô vừa (dưới 35 nhân sự), giao dịch quốc tế thường xuyên.',
    features: [
      'Băng thông trong nước: 150 Mbps',
      'Cam kết băng thông quốc tế tối thiểu: 4.0 Mbps',
      'Miễn phí 01 IP Tĩnh (Static IP) ổn định kết nối VPN',
      'Thiết bị đầu cuối chuyên dụng chịu tải cao'
    ],
    category: 'business',
    isPopular: true
  },
  {
    id: 'f300n',
    name: 'Gói F300N (Doanh nghiệp)',
    price: 3000000,
    speed: '300 Mbps',
    wifiType: 'DrayTek Vigor + Block 4 IP Tĩnh',
    desc: 'Giải pháp mạng chuyên nghiệp cho doanh nghiệp lớn, trường học hoặc chuỗi cửa hàng.',
    features: [
      'Băng thông trong nước: 300 Mbps',
      'Cam kết băng thông quốc tế tối thiểu: 8.0 Mbps',
      'Cung cấp Block 4 IP Tĩnh miễn phí',
      'Hỗ trợ cân bằng tải nhiều đường truyền, bảo mật tối ưu'
    ],
    category: 'business'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'Lắp đặt mạng Viettel có mất phí hòa mạng ban đầu không?',
    answer: 'Có phí hòa mạng ban đầu là 300.000đ theo quy định mới của Bộ TT&TT áp dụng cho tất cả các nhà mạng. Tuy nhiên, nếu quý khách lựa chọn phương án đóng trước cước từ 6 tháng hoặc 12 tháng, quý khách sẽ được MIỄN PHÍ lắp đặt 100%, đồng thời được TẶNG thêm 1 đến 2 tháng cước sử dụng hoàn toàn miễn phí.'
  },
  {
    question: 'Công nghệ Mesh WiFi (Home WiFi) trong các gói STAR hoạt động thế nào?',
    answer: 'Home WiFi Viettel là bộ thiết bị khuếch tán tín hiệu WiFi dạng mạng lưới (Mesh). Khác với bộ kích sóng thông thường, các thiết bị Mesh kết hợp với Modem chính tạo thành một mạng WiFi duy nhất có cùng tên (SSID) và mật khẩu. Khi bạn di chuyển giữa các phòng hay tầng lầu, điện thoại sẽ tự động kết nối tới thiết bị có sóng khỏe nhất mà không bị ngắt kết nối hay giật lag.'
  },
  {
    question: 'Thời gian hoàn tất lắp đặt mạng là bao lâu từ khi gửi yêu cầu?',
    answer: 'Thời gian khảo sát và lắp đặt thông thường diễn ra trong vòng 12 đến 24 giờ. Sau khi quý khách đăng ký thông tin qua cổng dịch vụ, nhân viên Viettel tại khu vực sẽ liên hệ ngay trong vòng 15-30 phút để xác nhận lịch hẹn và đến tận nhà làm thủ tục lắp đặt nhanh chóng.'
  },
  {
    question: 'Tôi cần chuẩn bị giấy tờ gì để làm thủ tục đăng ký?',
    answer: 'Thủ tục vô cùng đơn giản. Với cá nhân/hộ gia đình, quý khách chỉ cần chuẩn bị ảnh chụp Căn cước công dân (CCCD) của người đứng tên hợp đồng. Với doanh nghiệp, quý khách cần ảnh chụp Giấy phép đăng ký kinh doanh và CCCD của người đại diện pháp luật.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Nguyễn Minh Tuấn',
    location: 'Cầu Giấy, Hà Nội',
    avatar: '👨‍💼',
    rating: 5,
    comment: 'Tôi đăng ký gói STAR 1 cho căn chung cư 3 phòng ngủ. Lúc trước phòng ngủ trong cùng sóng rất yếu, từ ngày có Home WiFi của Viettel thì sóng căng đét cả nhà, làm việc online hay gọi video đều cực kỳ mượt mà. Đội kỹ thuật lắp đặt rất nhiệt tình và sạch sẽ.',
    packageUsed: 'Gói STAR 1'
  },
  {
    name: 'Phạm Thị Mai Anh',
    location: 'Quận 7, TP. Hồ Chí Minh',
    avatar: '👩‍💻',
    rating: 5,
    comment: 'Lắp đặt siêu nhanh! Mình vừa gửi đăng ký trên web tầm 15 phút sau đã có bạn gọi điện thoại hẹn giờ qua lắp. Mình chọn đóng trước 6 tháng được tặng thêm 1 tháng, tính ra chi phí mỗi tháng cực kỳ rẻ so với chất lượng mạng nhận được.',
    packageUsed: 'Gói SUN 1'
  },
  {
    name: 'Trần Quốc Bảo',
    location: 'Hải Châu, Đà Nẵng',
    avatar: '🎮',
    rating: 5,
    comment: 'Quán cafe của mình xài gói F150N. Khách vào đông tầm 30-40 người truy cập cùng lúc để làm việc và lướt web vẫn rất mượt mà nhờ thiết bị Router chịu tải chuyên dụng. Chế độ hỗ trợ kỹ thuật cho doanh nghiệp của Viettel rất nhanh chóng.',
    packageUsed: 'Gói F150N (Doanh nghiệp)'
  }
];

// Dữ liệu giả lập cho công cụ tra cứu vùng phủ sóng
export const PROVINCES = [
  { id: 'hn', name: 'Hà Nội', districts: ['Cầu Giấy', 'Đống Đa', 'Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Thanh Xuân', 'Nam Từ Liêm', 'Bắc Từ Liêm', 'Hà Đông', 'Long Biên'] },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', districts: ['Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 7', 'Quận 10', 'Bình Thạnh', 'Phú Nhuận', 'Gò Vấp', 'Thủ Đức'] },
  { id: 'dn', name: 'Đà Nẵng', districts: ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu', 'Cẩm Lệ'] },
  { id: 'hp', name: 'Hải Phòng', districts: ['Hồng Bàng', 'Ngô Quyền', 'Lê Chân', 'Hải An', 'Kiến An', 'Đồ Sơn'] },
  { id: 'ct', name: 'Cần Thơ', districts: ['Ninh Kiều', 'Bình Thủy', 'Cái Răng', 'Ô Môn', 'Thốt Nốt'] }
];
