import React from 'react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  discrepancyCount: number;
  selectedCycle: string;
  onCycleChange: (cycle: string) => void;
  onOpenCryptoModal: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  discrepancyCount,
  selectedCycle,
  onCycleChange,
  onOpenCryptoModal,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const [isCycleDropdownOpen, setIsCycleDropdownOpen] = React.useState(false);
  const cycles = ['SEM 37 (2024)', 'SEM 36 (2024)', 'SEM 35 (2024)', 'SEM 34 (2024)'];

  const navItems = [
    {
      id: 'nuevo-cierre',
      label: 'Nuevo Cierre',
      icon: 'cloud_upload',
      badge: 'Carga',
      badgeColor: 'bg-[#66558b]/40 text-[#d3e4fe]',
    },
    {
      id: 'conciliacion',
      label: 'Conciliación Facturas',
      icon: 'fact_check',
      badge: discrepancyCount > 0 ? String(discrepancyCount) : '✓',
      badgeColor: discrepancyCount > 0 ? 'bg-[#ba1a1a] text-white font-bold' : 'bg-emerald-600 text-white font-bold',
    },
    {
      id: 'vista-previa-excel',
      label: 'Vista Previa Excel',
      icon: 'table_view',
    },
    {
      id: 'historial-cierres',
      label: 'Historial de Cierres',
      icon: 'history',
    },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#211143] text-[#ffffff] z-50 flex flex-col justify-between shadow-[0_4px_24px_rgba(33,17,67,0.35)] transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo & Brand Header */}
          <div className="p-6 flex items-center justify-between border-b border-[#3b236e]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#745181] flex items-center justify-center shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-white text-[22px]">account_balance</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-[18px] text-white tracking-tight font-bold">
                  Capital Becarios
                </span>
                <span className="text-[12px] text-[#d0bdfa] uppercase tracking-wider font-semibold">
                  CIERRE DE SEMANA
                </span>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="md:hidden text-[#d0bdfa] hover:text-white p-1 rounded-lg"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Ciclo Fiscal Selector */}
          <div className="px-6 py-4 relative">
            <div
              onClick={() => setIsCycleDropdownOpen(!isCycleDropdownOpen)}
              className="bg-[#66558b]/20 hover:bg-[#66558b]/30 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-colors border border-[#66558b]/30"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f8d8ff] text-[18px]">event_note</span>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#d3e4fe] uppercase font-semibold">Ciclo Fiscal</span>
                  <span className="text-[15px] text-white font-bold">{selectedCycle}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#d3e4fe] text-[20px] transition-transform duration-200">
                {isCycleDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </div>

            {/* Dropdown menu */}
            {isCycleDropdownOpen && (
              <div className="absolute left-6 right-6 top-full mt-1 bg-[#1a0c36] border border-[#66558b]/40 rounded-xl shadow-xl z-20 overflow-hidden py-1">
                {cycles.map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => {
                      onCycleChange(cycle);
                      setIsCycleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-[#745181]/40 transition-colors ${
                      selectedCycle === cycle ? 'text-white font-bold bg-[#745181]/25' : 'text-[#d0bdfa]'
                    }`}
                  >
                    <span>{cycle}</span>
                    {selectedCycle === cycle && (
                      <span className="material-symbols-outlined text-[16px] text-[#f8d8ff]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col px-3.5 gap-1.5 mt-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#745181] text-white font-bold shadow-sm'
                      : 'text-[#d0bdfa] hover:bg-[#66558b]/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span className="text-[14px]">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-[#66558b]/30 text-[#d3e4fe]'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Crypto Status Badge */}
        <div className="p-4">
          <div
            onClick={onOpenCryptoModal}
            className="bg-[#66558b]/15 hover:bg-[#66558b]/25 rounded-xl p-3 flex flex-col gap-1 border border-[#66558b]/20 cursor-pointer transition-all group"
            title="Verificar árbol criptográfico y sellos SHA-256"
          >
            <div className="flex items-center justify-between text-[#f8d8ff]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span className="text-[11px] uppercase font-bold tracking-wider">Cifrado Financiero</span>
              </div>
              <span className="material-symbols-outlined text-[14px] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                arrow_forward
              </span>
            </div>
            <span className="text-[12px] font-mono text-[#d3e4fe] truncate select-all">
              SHA: 9fa2b740...de81
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Cadena inmutable verificada</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
