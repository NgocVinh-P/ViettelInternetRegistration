import { useState, useEffect } from 'react';
import { FileText, Clock, Settings, Trash2, Edit, ChevronDown, ChevronUp, Check, ShieldCheck } from 'lucide-react';
import { RegistrationLead } from '../types';

interface LeadHistoryProps {
  lastUpdated: number;
  onSelectLead: (lead: RegistrationLead) => void;
}

export default function LeadHistory({ lastUpdated, onSelectLead }: LeadHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [leads, setLeads] = useState<RegistrationLead[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  const loadLeads = () => {
    const existing = localStorage.getItem('viettel_registration_leads');
    if (existing) {
      setLeads(JSON.parse(existing));
    } else {
      setLeads([]);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [lastUpdated]);

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn hủy yêu cầu đăng ký lắp đặt này không?')) {
      const updated = leads.filter((lead) => lead.id !== id);
      localStorage.setItem('viettel_registration_leads', JSON.stringify(updated));
      setLeads(updated);
    }
  };

  const handleStartEdit = (lead: RegistrationLead) => {
    setEditingId(lead.id);
    setEditNotes(lead.notes || '');
  };

  const handleSaveEdit = (id: string) => {
    const updated = leads.map((lead) => {
      if (lead.id === id) {
        return { ...lead, notes: editNotes.trim() };
      }
      return lead;
    });
    localStorage.setItem('viettel_registration_leads', JSON.stringify(updated));
    setLeads(updated);
    setEditingId(null);
  };

  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });
  };

  const getPrepaymentLabel = (key: string) => {
    switch (key) {
      case 'monthly':
        return 'Hàng tháng';
      case '6m':
        return 'Đóng trước 6 tháng';
      case '12m':
        return 'Đóng trước 12 tháng';
      case '18m':
        return 'Đóng trước 18 tháng';
      default:
        return '6 tháng';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Đang chờ gọi lại</span>
          </span>
        );
      default:
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            Đã tiếp nhận
          </span>
        );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-lg w-[calc(100vw-32px)]">
      {/* Drawer Card */}
      <div className="bg-white border border-gray-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col transition-all duration-300">
        {/* Toggle Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-slate-900 text-white p-4 flex items-center justify-between w-full hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center space-x-2 text-left">
            <div className="bg-viettel p-1.5 rounded-lg text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">Tra cứu phiếu yêu cầu của bạn</p>
              <p className="text-[10px] text-gray-400 font-medium">
                {leads.length > 0 ? `Đang có ${leads.length} yêu cầu đăng ký` : 'Chưa có yêu cầu nào được gửi'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {leads.length > 0 && (
              <span className="bg-viettel text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {leads.length}
              </span>
            )}
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        {/* List Content Panel */}
        {isOpen && (
          <div className="max-h-80 overflow-y-auto p-4 space-y-4 text-left border-t border-gray-100 bg-slate-50">
            {leads.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm font-bold text-gray-500">Chưa có phiếu đăng ký nào từ trình duyệt này.</p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Hãy thử chọn một gói cước bất kỳ ở trên và gửi yêu cầu, thông tin đơn sẽ xuất hiện tại đây ngay lập tức!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Danh sách phiếu yêu cầu</span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Lưu trữ cục bộ bảo mật</span>
                  </span>
                </div>
                {leads.map((lead) => (
                  <div key={lead.id} className="bg-white border border-gray-200/60 p-4 rounded-2xl shadow-sm space-y-3 relative">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-viettel uppercase">
                            {lead.id}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold">
                            {formatDate(lead.createdAt)}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-gray-800 mt-1">{lead.name}</h4>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">SĐT: {lead.phone}</p>
                      </div>
                      <div>
                        {getStatusBadge(lead.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-dashed border-gray-200 text-xs font-semibold">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Gói cước</p>
                        <p className="text-gray-800 font-bold mt-0.5">{lead.packageName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Phương thức</p>
                        <p className="text-gray-800 font-bold mt-0.5">{getPrepaymentLabel(lead.prepayment)}</p>
                      </div>
                    </div>

                    {/* Address Detail */}
                    <div className="text-xs leading-normal">
                      <span className="text-gray-400 font-semibold">Địa chỉ: </span>
                      <span className="text-gray-600 font-medium">{lead.address}</span>
                    </div>

                    {/* Notes & Actions */}
                    <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                      {editingId === lead.id ? (
                        <div className="space-y-2">
                          <label className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Cập nhật yêu cầu thêm</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="Yêu cầu lắp đặt giờ nào, ghi chú khác..."
                              className="flex-grow text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                            <button
                              onClick={() => handleSaveEdit(lead.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl text-xs font-bold flex items-center justify-center"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center text-xs">
                          <div className="text-left flex-grow">
                            {lead.notes ? (
                              <p className="text-gray-500 leading-normal italic text-xs">
                                <strong>Ghi chú:</strong> {lead.notes}
                              </p>
                            ) : (
                              <p className="text-gray-400 italic text-[11px]">Chưa có ghi chú đặc thù</p>
                            )}
                          </div>
                          <div className="flex space-x-2.5 ml-2">
                            <button
                              onClick={() => handleStartEdit(lead)}
                              className="text-slate-500 hover:text-viettel p-1"
                              title="Chỉnh sửa ghi chú"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="text-slate-400 hover:text-red-600 p-1"
                              title="Hủy đăng ký"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
