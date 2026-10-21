import React, { useState } from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onToggleMobileMenu: () => void;
  onOpenCryptoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onToggleMobileMenu,
  onOpenCryptoModal,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 md:px-8">
      {/* Left: Hamburger (mobile) & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0b1c30] flex items-center justify-center shrink-0 hover:bg-[#dce9ff] transition-colors"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#7a757f] text-[18px]">
            search
          </span>
          <input
            className="w-full h-10 pl-9 pr-8 rounded-xl bg-[#eff4ff] text-sm text-[#0b1c30] placeholder:text-[#7a757f] focus:outline-none focus:ring-2 focus:ring-[#745181] focus:bg-white transition-all border border-transparent focus:border-[#745181]"
            placeholder="Buscar matrícula, becario o RFC..."
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7a757f] hover:text-[#0b1c30] p-1"
            >
              <span className="material-symbols-outlined text-[16px]">cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Right: Engine badge & Auditor profile */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Verification Engine Pill */}
        <button
          onClick={onOpenCryptoModal}
          className="hidden sm:flex items-center gap-2 bg-[#eff4ff] hover:bg-[#e5eeff] px-3.5 py-1.5 rounded-full border border-[#dce9ff] transition-colors cursor-pointer group"
          title="Ver detalles del motor criptográfico"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#745181] group-hover:scale-110 transition-transform"></span>
          <span className="text-[12px] text-[#49454e] font-medium tracking-wide">
            Motor SHA-256 Verificado
          </span>
        </button>

        {/* Auditor Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-[#eff4ff] transition-colors cursor-pointer"
          >
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-[14px] text-[#0b1c30] font-semibold leading-tight">
                Lic. Elena Morales
              </span>
              <span className="text-[11px] text-[#49454e]">Finanzas &amp; Tesorería</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#000000] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[19px]">person</span>
            </div>
          </button>

          {/* Profile Popover */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#e5eeff] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 pb-3 border-b border-[#e5eeff]">
                <div className="w-10 h-10 rounded-full bg-[#211143] text-white flex items-center justify-center font-bold">
                  EM
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0b1c30]">Lic. Elena Morales</div>
                  <div className="text-xs text-[#745181] font-medium">Auditora Fiscal Titular</div>
                  <div className="text-[11px] text-[#49454e]">oficina@capitalbecarios.org</div>
                </div>
              </div>

              <div className="py-2 space-y-1 text-xs">
                <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30]">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
                    e.Firma SAT
                  </span>
                  <span className="text-emerald-700 font-bold">Vigente 2027</span>
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30]">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#745181]">key</span>
                    PAC MasFactura
                  </span>
                  <span className="text-slate-600 font-mono">Conectado</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#e5eeff] flex flex-col gap-1 text-xs">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onOpenCryptoModal();
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#eff4ff] text-[#0b1c30] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                  Auditoría Criptográfica
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#eff4ff] text-[#0b1c30] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">settings</span>
                  Parámetros de Tolerancia SAT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
