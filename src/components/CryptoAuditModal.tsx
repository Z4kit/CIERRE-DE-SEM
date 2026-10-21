import React from 'react';

interface CryptoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHash: string;
}

export const CryptoAuditModal: React.FC<CryptoAuditModalProps> = ({
  isOpen,
  onClose,
  currentHash,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-[#e5eeff] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5eeff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#211143] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">lock</span>
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#0b1c30]">
                Cifrado Financiero &amp; Árbol Criptográfico SHA-256
              </h3>
              <p className="text-xs text-[#49454e]">
                Verificación inmutable para auditorías de la CNBV y el SAT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-4">
          <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#dce9ff]">
            <span className="text-[11px] text-[#49454e] uppercase font-bold tracking-wider block mb-1">
              Hash Raíz del Cierre Semanal (Root Merkle SHA-256):
            </span>
            <div className="font-mono text-xs text-[#211143] font-bold bg-white p-2.5 rounded-lg border border-[#dce9ff] select-all break-all">
              8c3e80f968bd0a7479743c3a44b36070fa8ebf1a301ec9c7e0fef3ba0248a721
            </div>
            <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold mt-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Estado: Firma íntegra sin alteraciones
              </span>
              <span>Algoritmo: FIPS PUB 180-4 SHA-256</span>
            </div>
          </div>

          {/* Sub-hashes tree */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-[#0b1c30] block">Componentes del Bloque de Cierre:</span>

            <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] space-y-1">
              <div className="flex justify-between font-semibold text-[#0b1c30]">
                <span>1. Layout Nómina Bancaria (BBVA B2B):</span>
                <span className="text-emerald-600 font-bold">150 Registros OK</span>
              </div>
              <div className="font-mono text-[11px] text-slate-600 break-all select-all">
                SHA: 9fa2b740e53a291cb092a188f4e29b110a394bc881920ac399de81
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] space-y-1">
              <div className="flex justify-between font-semibold text-[#0b1c30]">
                <span>2. Repositorio CFDIs Timbrados SAT (151 XMLs):</span>
                <span className="text-emerald-600 font-bold">Certificado PAC Vigente</span>
              </div>
              <div className="font-mono text-[11px] text-slate-600 break-all select-all">
                SHA: 4e9102bc8819ad37261909a4b882901eeff10382711099831a98
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] space-y-1">
              <div className="flex justify-between font-semibold text-[#0b1c30]">
                <span>3. Firma Electrónica Titular (e.Firma Elena Morales):</span>
                <span className="text-emerald-600 font-bold">Autenticado SHA-256</span>
              </div>
              <div className="font-mono text-[11px] text-slate-600 break-all select-all">
                SHA: 4f8b91a0e8d32b5123901a8ef1102948bb371092100847291c03
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#e5eeff] flex justify-between items-center text-xs">
          <span className="text-slate-500">
            Auditado el: 15/09/2024 · 18:30:10 UTC-6
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#211143] text-white font-bold hover:bg-[#391e70] transition-colors cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
