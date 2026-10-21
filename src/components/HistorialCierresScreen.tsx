import React from 'react';
import { HISTORICAL_CLOSURES } from '../data/mockData';

interface HistorialCierresScreenProps {
  onSelectWeek: (semana: string) => void;
  onOpenCryptoModal: () => void;
}

export const HistorialCierresScreen: React.FC<HistorialCierresScreenProps> = ({
  onSelectWeek,
  onOpenCryptoModal,
}) => {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-16">
      <div className="bg-white rounded-xl border border-[#e5eeff] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#745181] text-[24px]">history</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0b1c30]">
              Historial de Cierres Semanales Auditados
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#49454e] mt-1">
            Archivo fiscal inmutable con sellos de tiempo, constancias de dispersión bancaria y firmas SHA-256
          </p>
        </div>

        <button
          onClick={onOpenCryptoModal}
          className="px-4 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#211143] text-xs font-bold flex items-center gap-2 self-start md:self-auto border border-[#dce9ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          Auditar Árbol Criptográfico Completo
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {HISTORICAL_CLOSURES.map((item) => {
          const isCurrent = item.estado === 'en_proceso';

          return (
            <div
              key={item.semana}
              className={`bg-white rounded-xl border p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all hover:shadow-sm ${
                isCurrent ? 'border-[#745181] ring-1 ring-[#745181]/20' : 'border-[#e2e8f0]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isCurrent ? 'bg-[#f8d8ff] text-[#745181]' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[26px]">
                    {isCurrent ? 'hourglass_top' : 'lock'}
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#0b1c30]">
                      {item.semana}
                    </h3>
                    <span className="text-xs text-[#49454e]">({item.ciclo})</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        isCurrent
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isCurrent ? 'Pre-Cierre Abierto' : 'Bloqueado & Certificado'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#49454e]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">event</span>
                      {item.fechaCierre}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">badge</span>
                      {item.becariosTotal} Becarios
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">account_balance</span>
                      {item.bancoDispersor}
                    </span>
                  </div>

                  <div className="mt-2 bg-[#eff4ff] px-2.5 py-1 rounded-md text-[11px] font-mono text-[#0b1c30] flex items-center gap-1.5 truncate max-w-xl">
                    <span className="material-symbols-outlined text-[14px] text-[#745181]">fingerprint</span>
                    <span className="truncate select-all">{item.hashSha256}</span>
                  </div>
                </div>
              </div>

              {/* Financial Metrics & Actions */}
              <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#e5eeff]">
                <div className="flex flex-col text-left lg:text-right">
                  <span className="text-[11px] text-[#49454e] uppercase font-semibold">Total Dispersado</span>
                  <div className="text-xl font-bold font-mono text-[#0b1c30]">
                    ${item.totalDispersado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}{' '}
                    <span className="text-xs font-normal text-slate-500">MXN</span>
                  </div>
                  <span className="text-[11px] text-[#745181] font-medium">
                    Auditor: {item.auditor}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => onSelectWeek(item.semana)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#211143] hover:bg-[#391e70] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Ver Ciclo
                  </button>
                  <button
                    onClick={() => {
                      alert(`Descargando certificado criptográfico oficial de ${item.semana}...`);
                    }}
                    className="w-full sm:w-auto px-3 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#211143] text-xs font-semibold flex items-center justify-center gap-1 border border-[#dce9ff] cursor-pointer"
                    title="Descargar Acuse Oficial PDF"
                  >
                    <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                    Acuse PDF
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
