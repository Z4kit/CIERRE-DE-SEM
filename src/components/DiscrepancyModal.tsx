import React, { useState } from 'react';
import { ReconciliationRecord } from '../types';

interface DiscrepancyModalProps {
  record: ReconciliationRecord;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (
    recordId: string,
    selectedFolio: string,
    discardAction: 'duplicado_descartado' | 'pendiente_facturacion',
    requestSatCancel: boolean
  ) => void;
}

export const DiscrepancyModal: React.FC<DiscrepancyModalProps> = ({
  record,
  isOpen,
  onClose,
  onResolve,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<'4892' | '4901'>('4892');
  const [discardAction, setDiscardAction] = useState<'duplicado_descartado' | 'pendiente_facturacion'>('duplicado_descartado');
  const [requestSatCancel, setRequestSatCancel] = useState(true);

  if (!isOpen) return null;

  const candidateA = record.candidates?.find((c) => c.folio === '4892');
  const candidateB = record.candidates?.find((c) => c.folio === '4901');

  const unselectedFolio = selectedCandidate === '4892' ? '4901' : '4892';

  const handleConfirm = () => {
    onResolve(record.id, selectedCandidate, discardAction, requestSatCancel);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 top-16 left-0 md:left-72 bg-[#211143]/70 backdrop-blur-sm z-50 flex items-start justify-center p-3 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      id="discrepancy-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* MODAL CARD CONTAINER */}
      <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(33,17,67,0.35)] w-full max-w-5xl my-2 md:my-4 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5eeff]">
        {/* 1. HEADER DEL MODAL */}
        <div className="bg-[#211143] text-white px-5 md:px-8 py-5 flex items-center justify-between border-b border-[#3b236e]/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#745181]/80 flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[26px] text-white">call_split</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-['Plus_Jakarta_Sans'] text-lg md:text-[20px] font-bold text-white tracking-tight">
                  Resolver Coincidencia Múltiple: Selección de Folio Fiscal Oficial
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] uppercase bg-[#f8d8ff] text-[#2c0d3a] font-bold tracking-wider">
                  Revisión Manual (2 Folios)
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#d0bdfa] mt-0.5">
                2 CFDIs idénticos en montos encontrados en el repositorio fiscal para SEM 37 · Requiere adjudicación contable
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-[#66558b]/30 text-[#d3e4fe] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
            title="Cerrar ventana"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="p-5 md:p-8 flex flex-col gap-6 bg-[#f8f9ff]/50">
          {/* 2. RESUMEN DEL REGISTRO MAESTRO EN ARCHIVO SEMANAL */}
          <div className="bg-[#eff4ff] rounded-xl p-4 md:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-[#dce9ff]">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#dce9ff] flex items-center justify-center text-[#211143] shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">corporate_fare</span>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[16px] text-[#0b1c30] font-bold tracking-tight">
                    {record.empresa}
                  </span>
                  <span className="text-[12px] px-2 py-0.5 rounded-md bg-[#e5eeff] text-[#0b1c30] font-mono font-semibold">
                    {record.rfc}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1 text-xs text-[#49454e]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">domain</span> Centro Costos: {record.centroCostos}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span> Periodo: {record.periodo}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#0b1c30] font-medium">
                    <span className="material-symbols-outlined text-[16px]">group</span> {record.becariosCount} Becarios Nómina
                  </span>
                </div>
              </div>
            </div>

            {/* Totals Strip */}
            <div className="flex items-center gap-4 md:gap-6 bg-white px-4 md:px-5 py-2.5 rounded-xl shadow-xs self-stretch lg:self-auto justify-between lg:justify-end border border-[#e5eeff]">
              <div className="flex flex-col text-right">
                <span className="text-[11px] text-[#49454e] uppercase font-semibold">Subtotal Esperado</span>
                <span className="text-[13px] font-semibold text-[#0b1c30] font-mono">
                  ${record.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
              <div className="h-8 w-px bg-[#e5eeff]"></div>
              <div className="flex flex-col text-right">
                <span className="text-[11px] text-[#49454e] uppercase font-semibold">IVA (16%)</span>
                <span className="text-[13px] font-semibold text-[#0b1c30] font-mono">
                  ${record.iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
              <div className="h-8 w-px bg-[#e5eeff]"></div>
              <div className="flex flex-col text-right">
                <span className="text-[11px] text-[#745181] font-bold uppercase">Total Esperado</span>
                <span className="text-[16px] text-[#000000] font-bold font-mono">
                  ${record.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
            </div>
          </div>

          {/* 3. COMPARADOR LADO A LADO DE FACTURAS CANDIDATAS */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <span className="text-[13px] text-[#0b1c30] font-bold tracking-wide uppercase">
                Facturas Candidatas Disponibles en Catálogo PAC / SAT
              </span>
              <span className="text-xs text-[#49454e]">
                Seleccione el CFDI válido a imputar a la dispersión de nómina
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* CANDIDATO A: Folio 4892 (Recomendado) */}
              <label
                className={`relative group cursor-pointer block rounded-xl border-2 transition-all duration-200 ${
                  selectedCandidate === '4892'
                    ? 'border-[#745181] bg-[#eff4ff] shadow-md ring-2 ring-[#745181]/20'
                    : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1] hover:bg-[#f8f9ff]'
                }`}
                htmlFor="candidate-folio-4892"
              >
                <input
                  type="radio"
                  id="candidate-folio-4892"
                  name="selected_candidate"
                  value="4892"
                  checked={selectedCandidate === '4892'}
                  onChange={() => setSelectedCandidate('4892')}
                  className="sr-only"
                />
                <div className="p-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Card Header & Badge */}
                    <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-[#e5eeff]">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            selectedCandidate === '4892'
                              ? 'bg-[#211143] text-white'
                              : 'bg-[#e5eeff] text-slate-400'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[18px] text-[#0b1c30] font-bold">Folio #4892</span>
                            <span className="text-[12px] px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-mono font-medium">
                              Serie A
                            </span>
                          </div>
                          <span className="text-[11px] text-[#49454e] font-medium">
                            Factura Ingreso (CFDI 4.0)
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] bg-[#745181] text-white font-bold tracking-wider uppercase flex items-center gap-1 shadow-xs shrink-0">
                        <span className="material-symbols-outlined text-[14px]">stars</span>
                        Candidato Recomendado
                      </span>
                    </div>

                    {/* UUID & Metadata */}
                    <div className="bg-white/90 rounded-lg p-3 mb-3 space-y-1.5 border border-[#e5eeff]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#49454e] uppercase font-semibold">UUID SAT</span>
                        <span className="font-mono text-[11px] text-[#0b1c30] select-all font-semibold truncate max-w-[200px]">
                          7e2f9810-b384-48f1-a1b9-39f1c79a11a2
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#49454e] uppercase font-semibold">Fecha y Hora</span>
                        <span className="text-xs text-[#0b1c30] font-medium">15/09/2024 · 10:14:22 hrs</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#49454e] uppercase font-semibold">Estado PAC</span>
                        <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span> ACTIVA / TIMBRADO VIGENTE
                        </span>
                      </div>
                    </div>

                    {/* Concepto */}
                    <div className="mb-4">
                      <span className="text-[11px] text-[#49454e] uppercase font-semibold">Concepto Declarado</span>
                      <p className="text-sm text-[#0b1c30] font-medium mt-0.5 leading-snug">
                        "Dispersión Becarios Convenio SEM 37 - Tecnologías de Información"
                      </p>
                    </div>

                    {/* Financial Metrics */}
                    <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-lg mb-4 border border-[#e5eeff]">
                      <div>
                        <span className="text-[11px] text-[#49454e]">Subtotal</span>
                        <div className="text-[13px] text-[#0b1c30] font-bold font-mono">$42,500.00 MXN</div>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#49454e]">Total c/IVA</span>
                        <div className="text-[13px] text-[#211143] font-bold font-mono">$49,300.00 MXN</div>
                      </div>
                    </div>
                  </div>

                  {/* Engine Diagnostic */}
                  <div className="bg-[#f8d8ff]/50 border border-[#e2b8ef] p-3 rounded-lg flex items-start gap-2 text-[#2c0d3a]">
                    <span className="material-symbols-outlined text-[18px] text-[#745181] shrink-0 mt-0.5">
                      verified_user
                    </span>
                    <div className="text-xs leading-relaxed">
                      <strong className="font-semibold">Diagnóstico del Motor SHA-256:</strong> Coincidencia temporal con orden de dispersión bancaria BBVA B2B (10:30 hrs). Conciliación 100% limpia sin observaciones fiscales previas.
                    </div>
                  </div>
                </div>
              </label>

              {/* CANDIDATO B: Folio 4901 (Reexpedición sospechosa / Conflicto) */}
              <label
                className={`relative group cursor-pointer block rounded-xl border-2 transition-all duration-200 ${
                  selectedCandidate === '4901'
                    ? 'border-[#ba1a1a] bg-[#ffdad6]/30 shadow-md ring-2 ring-[#ba1a1a]/20'
                    : 'border-[#e2e8f0] bg-white opacity-85 hover:opacity-100 hover:border-[#cbd5e1]'
                }`}
                htmlFor="candidate-folio-4901"
              >
                <input
                  type="radio"
                  id="candidate-folio-4901"
                  name="selected_candidate"
                  value="4901"
                  checked={selectedCandidate === '4901'}
                  onChange={() => setSelectedCandidate('4901')}
                  className="sr-only"
                />
                <div className="p-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Card Header & Badge */}
                    <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-[#e5eeff]">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            selectedCandidate === '4901'
                              ? 'bg-[#ba1a1a] text-white'
                              : 'bg-[#e5eeff] text-slate-400'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[18px] text-[#0b1c30] font-bold">Folio #4901</span>
                            <span className="text-[12px] px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-mono font-medium">
                              Serie A
                            </span>
                          </div>
                          <span className="text-[11px] text-[#49454e] font-medium">
                            Factura Ingreso (CFDI 4.0)
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] bg-[#ffdad6] text-[#93000a] font-bold tracking-wider uppercase flex items-center gap-1 shrink-0">
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        Posible Duplicidad
                      </span>
                    </div>

                    {/* UUID & Metadata */}
                    <div className="bg-white/90 rounded-lg p-3 mb-3 space-y-1.5 border border-[#e5eeff]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#49454e] uppercase font-semibold">UUID SAT</span>
                        <span className="font-mono text-[11px] text-[#0b1c30] select-all font-semibold truncate max-w-[200px]">
                          9c1482de-4f51-4028-98e6-e9102c4b893f
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#49454e] uppercase font-semibold">Fecha y Hora</span>
                        <span className="text-xs text-[#0b1c30] font-medium">15/09/2024 · 14:32:05 hrs (+4.3 hrs)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#49454e] uppercase font-semibold">Estado PAC</span>
                        <span className="flex items-center gap-1 text-[11px] text-[#ba1a1a] font-bold">
                          <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span> ACTIVA / SIN CANCELAR FOLIO 4892
                        </span>
                      </div>
                    </div>

                    {/* Concepto */}
                    <div className="mb-4">
                      <span className="text-[11px] text-[#49454e] uppercase font-semibold">Concepto Declarado</span>
                      <p className="text-sm text-[#0b1c30] font-medium mt-0.5 leading-snug line-clamp-2">
                        "Dispersión Becarios Convenio SEM 37 - Reexpedición por error de clave de producto"
                      </p>
                    </div>

                    {/* Financial Metrics */}
                    <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-lg mb-4 border border-[#e5eeff]">
                      <div>
                        <span className="text-[11px] text-[#49454e]">Subtotal</span>
                        <div className="text-[13px] text-[#0b1c30] font-bold font-mono">$42,500.00 MXN</div>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#49454e]">Total c/IVA</span>
                        <div className="text-[13px] text-[#211143] font-bold font-mono">$49,300.00 MXN</div>
                      </div>
                    </div>
                  </div>

                  {/* Engine Diagnostic */}
                  <div className="bg-[#ffdad6]/50 border border-[#ffb4ab] p-3 rounded-lg flex items-start gap-2 text-[#93000a]">
                    <span className="material-symbols-outlined text-[18px] text-[#ba1a1a] shrink-0 mt-0.5">
                      report_problem
                    </span>
                    <div className="text-xs leading-relaxed">
                      <strong className="font-semibold">Alerta de Riesgo Fiscal:</strong> Emisión posterior sin relación SAT tipo "04 - Sustitución de CFDI previos". Si se vinculan ambas facturas se incurrirá en doble comprobación y discrepancia ante auditoría SAT.
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* 4. ACCIONES Y REGLAS DE DESTINO PARA EL FOLIO NO SELECCIONADO */}
          <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-[#e5eeff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#745181] text-[20px]">rule_folder</span>
                <span className="text-[15px] text-[#0b1c30] font-bold">
                  Protocolo de Destino para Folio No Imputado (Folio {unselectedFolio})
                </span>
              </div>
              <span className="text-[11px] text-[#49454e] uppercase font-semibold">Control de Integridad Contable</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] transition-colors cursor-pointer">
                <input
                  type="radio"
                  name="discard_action"
                  checked={discardAction === 'duplicado_descartado'}
                  onChange={() => setDiscardAction('duplicado_descartado')}
                  className="mt-1 accent-[#211143] w-4 h-4 cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm text-[#0b1c30] font-semibold">
                    Marcar como "Duplicado Descartado en Auditoría"
                  </span>
                  <span className="text-xs text-[#49454e] mt-0.5 leading-relaxed">
                    Bloquea permanentemente este UUID para evitar su asignación accidental en semanas futuras. Queda registrado en el archivo SHA de auditoría.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] transition-colors cursor-pointer">
                <input
                  type="radio"
                  name="discard_action"
                  checked={discardAction === 'pendiente_facturacion'}
                  onChange={() => setDiscardAction('pendiente_facturacion')}
                  className="mt-1 accent-[#211143] w-4 h-4 cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm text-[#0b1c30] font-semibold">
                    Enviar a "B. PENDIENTE FACTURACIÓN SEM 37"
                  </span>
                  <span className="text-xs text-[#49454e] mt-0.5 leading-relaxed">
                    Mantiene el CFDI en la bandeja de comprobantes en revisión para investigar posible asignación a becarios de semestres anteriores.
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-1 flex items-start gap-2.5">
              <input
                id="request-sat-cancel"
                type="checkbox"
                checked={requestSatCancel}
                onChange={(e) => setRequestSatCancel(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#211143] rounded cursor-pointer shrink-0"
              />
              <label htmlFor="request-sat-cancel" className="text-xs text-[#0b1c30] font-medium cursor-pointer select-none leading-relaxed">
                Generar solicitud de cancelación formal del <strong className="text-[#ba1a1a] font-semibold">Folio {unselectedFolio}</strong> al departamento fiscal del emisor vía acuse SAT (Motivo 02 - Comprobante emitido con errores sin relación).
              </label>
            </div>
          </div>

          {/* 5. PREVISUALIZACIÓN DEL IMPACTO EN LA HOJA CIERRE DE SEMANA */}
          <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col gap-2 border border-[#dce9ff]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#0b1c30] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#745181]">table_chart</span>
                Previsualización de Escritura en Pestaña 'A. FACTURADO SEMANA 37'
              </span>
              <span className="text-xs font-mono text-[#49454e]">Fila Destino #143</span>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg border border-[#e5eeff] shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#e5eeff] text-[#49454e] uppercase text-[11px] font-semibold">
                  <tr>
                    <th className="px-4 py-2">Semana</th>
                    <th className="px-4 py-2">Razón Social</th>
                    <th className="px-4 py-2">RFC</th>
                    <th className="px-4 py-2 text-right">Subtotal</th>
                    <th className="px-4 py-2 text-right">IVA</th>
                    <th className="px-4 py-2 text-right">Total Facturado</th>
                    <th className="px-4 py-2 text-center">Folio Asignado</th>
                    <th className="px-4 py-2">Observaciones Auditoría</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5eeff]">
                  <tr className="bg-white">
                    <td className="px-4 py-2.5 font-medium">SEM 37</td>
                    <td className="px-4 py-2.5 font-semibold text-[#0b1c30]">{record.empresa}</td>
                    <td className="px-4 py-2.5 font-mono text-slate-700">{record.rfc}</td>
                    <td className="px-4 py-2.5 font-mono text-right">$42,500.00</td>
                    <td className="px-4 py-2.5 font-mono text-right">$6,800.00</td>
                    <td className="px-4 py-2.5 font-mono text-right text-[#000000] font-bold">$49,300.00</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                        selectedCandidate === '4892'
                          ? 'bg-[#f8d8ff] text-[#2c0d3a]'
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}>
                        #{selectedCandidate} (Serie A)
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-[#49454e] text-[11px] truncate max-w-xs">
                      {selectedCandidate === '4892'
                        ? `Conciliado: Folio 4892 ratificado. Folio 4901 ${discardAction === 'duplicado_descartado' ? 'descartado por duplicidad' : 'enviado a pendientes'}.`
                        : `Forzado: Folio 4901 imputado manualmente con anuencia fiscal. Folio 4892 liberado.`
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 6. FOOTER DE ACCIONES DEL MODAL */}
        <div className="bg-[#eff4ff] px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#dce9ff]">
          {/* Auditor Identity & Crypto Signature */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-8 h-8 rounded-full bg-[#211143] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm text-[#0b1c30] font-semibold">
                Lic. Elena Morales · Finanzas &amp; Tesorería
              </span>
              <span className="text-[11px] font-mono text-[#49454e]">
                Firma Digital SHA256: 4f8b91a0e8d32b51...c03
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] text-sm font-semibold transition-colors cursor-pointer"
              type="button"
            >
              Cancelar y Mantener en Discrepancias
            </button>
            <button
              onClick={handleConfirm}
              className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                selectedCandidate === '4892'
                  ? 'bg-[#211143] hover:bg-[#391e70]'
                  : 'bg-[#ba1a1a] hover:bg-[#93000a]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {selectedCandidate === '4892' ? 'assignment_turned_in' : 'warning'}
              </span>
              {selectedCandidate === '4892'
                ? 'Asignar Folio 4892 y Conciliar Operación'
                : 'Forzar Asignación Folio 4901 (Requiere Justificación)'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
