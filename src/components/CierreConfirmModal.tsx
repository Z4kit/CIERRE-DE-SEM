import React, { useState } from 'react';
import { MetricSummary } from '../types';

interface CierreConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: MetricSummary;
  onConfirmSuccess: () => void;
}

export const CierreConfirmModal: React.FC<CierreConfirmModalProps> = ({
  isOpen,
  onClose,
  metrics,
  onConfirmSuccess,
}) => {
  const [eFirmaPassword, setEFirmaPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  if (!isOpen) return null;

  const handleExecuteLock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsLocked(true);
      onConfirmSuccess();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-[#e5eeff] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {!isLocked ? (
          <form onSubmit={handleExecuteLock} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#e5eeff]">
              <div className="w-10 h-10 rounded-xl bg-[#211143] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">lock</span>
              </div>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#0b1c30]">
                  Confirmación de Cierre y Bloqueo Fiscal SEM 37
                </h3>
                <p className="text-xs text-[#49454e]">
                  Se generará el sello inmutable SHA-256 impidiendo modificaciones posteriores
                </p>
              </div>
            </div>

            {/* Metrics summary */}
            <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#dce9ff] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Total a Cerrar:</span>
                <span className="font-mono font-bold text-sm text-[#0b1c30]">
                  ${metrics.totalDispersado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">CFDIs Validados SAT:</span>
                <span className="font-mono font-semibold text-[#745181]">
                  ${metrics.cfdisValidados.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Becarios Conciliados:</span>
                <span className="font-bold text-emerald-700">
                  {metrics.becariosConciliados} de {metrics.becariosTotal}
                </span>
              </div>
              {metrics.discrepanciasActivas > 0 && (
                <div className="bg-[#ffdad6] text-[#93000a] p-2 rounded-lg font-semibold flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span>
                    Atención: Hay ${metrics.discrepanciasActivas.toLocaleString('es-MX', { minimumFractionDigits: 2 })} en discrepancias activas pendientes.
                  </span>
                </div>
              )}
            </div>

            {/* Auditor Signature Input */}
            <div>
              <label className="block text-xs font-bold text-[#0b1c30] uppercase tracking-wider mb-1">
                Contraseña de Clave Privada (e.Firma SAT)
              </label>
              <input
                type="password"
                required
                value={eFirmaPassword}
                onChange={(e) => setEFirmaPassword(e.target.value)}
                placeholder="Ingrese clave para certificar el cierre..."
                className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#745181]"
              />
              <span className="text-[11px] text-[#49454e] mt-1 block">
                Firmante: Lic. Elena Morales · RFC: MOPE850412KJ1
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end gap-3 border-t border-[#e5eeff]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-[#211143] hover:bg-[#391e70] text-white text-xs font-bold flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                    Sellando Criptográficamente...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                    Firmar y Bloquear Cierre
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0b1c30]">
              Ciclo Fiscal SEM 37 Bloqueado y Certificado
            </h3>
            <p className="text-xs text-[#49454e] max-w-sm mt-1 mb-4">
              La póliza semanal ha sido sellada con éxito. Los libros contables han quedado protegidos contra modificaciones.
            </p>

            <div className="w-full bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] text-left font-mono text-xs mb-4">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Acuse Fiscal e.Firma:</span>
              <span className="text-emerald-800 break-all select-all font-semibold">
                SHA256: 8c3e80f968bd0a7479743c3a44b36070fa8ebf1a301ec9c7e0fef3ba0248a721
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#211143] hover:bg-[#391e70] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Entendido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
