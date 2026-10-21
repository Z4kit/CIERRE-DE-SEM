import React, { useState } from 'react';
import { ReconciliationRecord, MetricSummary } from '../types';

interface ConciliacionScreenProps {
  records: ReconciliationRecord[];
  metrics: MetricSummary;
  searchTerm: string;
  onOpenDiscrepancyModal: (record: ReconciliationRecord) => void;
  onConfirmCierre: () => void;
}

export const ConciliacionScreen: React.FC<ConciliacionScreenProps> = ({
  records,
  metrics,
  searchTerm,
  onOpenDiscrepancyModal,
  onConfirmCierre,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'discrepancia' | 'conciliado' | 'sin_factura' | 'dispersion_mensual'>('all');
  const [selectedCostCenter, setSelectedCostCenter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<ReconciliationRecord | null>(null);

  // Extract unique cost centers
  const costCenters = Array.from(new Set(records.map((r) => r.centroCostos)));

  // Filter records
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.rfc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.centroCostos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.assignedFolio && r.assignedFolio.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.uuid && r.uuid.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ? true : r.status === statusFilter;

    const matchesCostCenter =
      selectedCostCenter === 'all' ? true : r.centroCostos === selectedCostCenter;

    return matchesSearch && matchesStatus && matchesCostCenter;
  });

  const getStatusBadge = (status: ReconciliationRecord['status']) => {
    switch (status) {
      case 'conciliado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Conciliado
          </span>
        );
      case 'discrepancia':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#78350F] border border-[#FDE68A] animate-pulse">
            <span className="material-symbols-outlined text-[14px] text-[#B45309]">warning</span>
            Discrepancia (2 Folios)
          </span>
        );
      case 'dispersion_mensual':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
            <span className="material-symbols-outlined text-[14px]">update</span>
            Dispersión Mensual
          </span>
        );
      case 'sin_factura':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]">
            <span className="material-symbols-outlined text-[14px]">cancel</span>
            Sin Factura
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* 1. Header Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Dispersado */}
        <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between text-[#49454e] mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Dispersado SEM 37</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#211143]">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
          </div>
          <div className="font-['Inter'] text-2xl md:text-[26px] font-bold text-[#0b1c30] tracking-tight">
            ${metrics.totalDispersado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}{' '}
            <span className="text-xs font-normal text-[#49454e]">MXN</span>
          </div>
          <div className="text-xs text-[#49454e] mt-2 flex items-center justify-between">
            <span>{metrics.becariosConciliados} de {metrics.becariosTotal} becarios</span>
            <span className="font-semibold text-emerald-700">94.7%</span>
          </div>
          <div className="w-full bg-[#e5eeff] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-[#211143] h-full rounded-full transition-all duration-500"
              style={{ width: `${(metrics.becariosConciliados / metrics.becariosTotal) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Card 2: CFDIs Validados SAT */}
        <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between text-[#49454e] mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">CFDIs Validados SAT</span>
            <div className="w-8 h-8 rounded-lg bg-[#f8d8ff] flex items-center justify-center text-[#745181]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>
          <div className="font-['Inter'] text-2xl md:text-[26px] font-bold text-[#745181] tracking-tight">
            ${metrics.cfdisValidados.toLocaleString('es-MX', { minimumFractionDigits: 2 })}{' '}
            <span className="text-xs font-normal text-[#49454e]">MXN</span>
          </div>
          <div className="text-xs text-[#49454e] mt-2 flex items-center justify-between">
            <span>Validación PAC en línea</span>
            <span className="font-semibold text-[#745181]">{metrics.cfdisValidadosPercent}% completado</span>
          </div>
          <div className="w-full bg-[#e5eeff] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-[#745181] h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.cfdisValidadosPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Card 3: Discrepancias Activas */}
        <div className={`p-5 rounded-xl border shadow-xs flex flex-col justify-between transition-all ${
          metrics.discrepanciasActivas > 0
            ? 'bg-[#fff8f7] border-[#ffdad6]'
            : 'bg-[#f0fdf4] border-[#bbf7d0]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] uppercase tracking-wider font-bold ${
              metrics.discrepanciasActivas > 0 ? 'text-[#ba1a1a]' : 'text-emerald-800'
            }`}>
              {metrics.discrepanciasActivas > 0 ? 'Discrepancias Activas' : 'Sin Discrepancias'}
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              metrics.discrepanciasActivas > 0 ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <span className="material-symbols-outlined text-[18px]">
                {metrics.discrepanciasActivas > 0 ? 'warning' : 'check_circle'}
              </span>
            </div>
          </div>
          <div className={`font-['Inter'] text-2xl md:text-[26px] font-bold tracking-tight ${
            metrics.discrepanciasActivas > 0 ? 'text-[#ba1a1a]' : 'text-emerald-700'
          }`}>
            ${metrics.discrepanciasActivas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}{' '}
            <span className="text-xs font-normal opacity-80">MXN</span>
          </div>
          <div className={`text-xs mt-2 font-medium flex items-center justify-between ${
            metrics.discrepanciasActivas > 0 ? 'text-[#ba1a1a]' : 'text-emerald-700'
          }`}>
            <span>
              {metrics.discrepanciasActivas > 0
                ? `${metrics.discrepanciasCount} caso (2 folios duplicados)`
                : 'Todas las facturas conciliadas'}
            </span>
            {metrics.discrepanciasActivas > 0 && (
              <span className="underline font-bold cursor-pointer" onClick={() => {
                const disc = records.find(r => r.status === 'discrepancia');
                if (disc) onOpenDiscrepancyModal(disc);
              }}>
                Resolver
              </span>
            )}
          </div>
          <div className="w-full bg-black/5 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                metrics.discrepanciasActivas > 0 ? 'bg-[#ba1a1a]' : 'bg-emerald-600'
              }`}
              style={{ width: metrics.discrepanciasActivas > 0 ? '100%' : '0%' }}
            ></div>
          </div>
        </div>

        {/* Card 4: Hash de Bloqueo */}
        <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between text-[#49454e] mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Hash de Bloqueo</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#211143]">
              <span className="material-symbols-outlined text-[18px]">lock_clock</span>
            </div>
          </div>
          <div className="font-mono text-sm md:text-[15px] font-bold text-[#0b1c30] truncate select-all py-1">
            {metrics.hashBloqueo}
          </div>
          <div className="text-xs text-[#49454e] mt-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                metrics.discrepanciasActivas === 0 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
              Estado: {metrics.discrepanciasActivas === 0 ? 'Listo para Bloqueo Final' : metrics.estadoPreCierre}
            </span>
            <span className="text-[11px] font-mono text-[#745181]">v4.02</span>
          </div>
        </div>
      </div>

      {/* 2. Matriz de Conciliación Semanal (Data Table & Card Controller) */}
      <div className="bg-white rounded-xl border border-[#e5eeff] shadow-xs p-4 md:p-6">
        {/* Table Title & Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#e5eeff]">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#745181] text-[22px]">table_chart</span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-lg md:text-xl font-bold text-[#0b1c30]">
                Matriz de Conciliación Semanal
              </h3>
            </div>
            <p className="text-xs md:text-sm text-[#49454e] mt-0.5">
              Cruce entre dispersión bancaria y comprobantes fiscales vigentes emitidos ante el SAT
            </p>
          </div>

          {/* Filter Pills and View Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Pills */}
            <div className="flex items-center bg-[#eff4ff] p-1 rounded-xl border border-[#dce9ff] text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white text-[#0b1c30] font-bold shadow-xs'
                    : 'text-[#49454e] hover:text-[#0b1c30]'
                }`}
              >
                Todos ({records.length})
              </button>
              <button
                onClick={() => setStatusFilter('discrepancia')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1 cursor-pointer ${
                  statusFilter === 'discrepancia'
                    ? 'bg-[#ba1a1a] text-white font-bold shadow-xs'
                    : 'text-[#ba1a1a] hover:bg-[#ffdad6]/40'
                }`}
              >
                <span>Discrepancias</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">
                  {records.filter(r => r.status === 'discrepancia').length}
                </span>
              </button>
              <button
                onClick={() => setStatusFilter('conciliado')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  statusFilter === 'conciliado'
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                Conciliados ({records.filter(r => r.status === 'conciliado').length})
              </button>
              <button
                onClick={() => setStatusFilter('sin_factura')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  statusFilter === 'sin_factura'
                    ? 'bg-slate-700 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Sin Factura ({records.filter(r => r.status === 'sin_factura').length})
              </button>
            </div>

            {/* Cost Center Dropdown */}
            <select
              value={selectedCostCenter}
              onChange={(e) => setSelectedCostCenter(e.target.value)}
              className="text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl px-3 py-2 text-[#0b1c30] focus:outline-none focus:ring-1 focus:ring-[#745181] cursor-pointer"
            >
              <option value="all">Todos los Centros de Costo</option>
              {costCenters.map((cc) => (
                <option key={cc} value={cc}>
                  {cc}
                </option>
              ))}
            </select>

            {/* Toggle Table / Cards */}
            <div className="flex items-center bg-[#eff4ff] p-1 rounded-xl border border-[#dce9ff]">
              <button
                onClick={() => setViewMode('table')}
                title="Vista Tabla Contable"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-[#211143] shadow-xs' : 'text-[#7a757f]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">table_rows</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                title="Vista Tarjetas Móvil"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-white text-[#211143] shadow-xs' : 'text-[#7a757f]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto mt-4 -mx-4 md:mx-0">
            <table className="w-full text-left text-xs min-w-[900px]">
              <thead className="bg-[#eff4ff] text-[#49454e] uppercase text-[11px] font-semibold border-y border-[#dce9ff]">
                <tr>
                  <th className="px-4 py-3 sticky left-0 bg-[#eff4ff] z-10">Razón Social / Beneficiario</th>
                  <th className="px-3 py-3">RFC</th>
                  <th className="px-3 py-3">Centro Costos</th>
                  <th className="px-2 py-3 text-center">Becarios</th>
                  <th className="px-3 py-3 text-right">Subtotal</th>
                  <th className="px-3 py-3 text-right">IVA (16%)</th>
                  <th className="px-3 py-3 text-right">Total Dispersión</th>
                  <th className="px-3 py-3 text-center">Folio Fiscal / CFDI</th>
                  <th className="px-3 py-3 text-center">Estado Auditoría</th>
                  <th className="px-3 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5eeff]">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-[#49454e]">
                      <span className="material-symbols-outlined text-4xl text-slate-300 block mb-2">search_off</span>
                      No se encontraron registros bajo los filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((rec) => {
                    const isDiscrepancy = rec.status === 'discrepancia';

                    return (
                      <tr
                        key={rec.id}
                        className={`transition-colors ${
                          isDiscrepancy
                            ? 'bg-[#fff8f7] hover:bg-[#ffdad6]/20'
                            : 'hover:bg-[#f8f9ff]'
                        }`}
                      >
                        {/* Company Name */}
                        <td className="px-4 py-3.5 sticky left-0 bg-white/95 backdrop-blur-xs z-10 border-r border-[#e5eeff]/50">
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm text-[#0b1c30]">
                              {rec.empresa}
                            </span>
                            <span className="text-[11px] text-[#49454e] flex items-center gap-1 mt-0.5">
                              <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                              {rec.periodo}
                            </span>
                          </div>
                        </td>

                        {/* RFC */}
                        <td className="px-3 py-3.5 font-mono text-[11px] font-semibold text-slate-700">
                          {rec.rfc}
                        </td>

                        {/* Centro Costos */}
                        <td className="px-3 py-3.5 text-[#49454e]">
                          {rec.centroCostos}
                        </td>

                        {/* Becarios count */}
                        <td className="px-2 py-3.5 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#211143] font-semibold text-[11px]">
                            {rec.becariosCount}
                          </span>
                        </td>

                        {/* Subtotal */}
                        <td className="px-3 py-3.5 font-mono text-right text-slate-700">
                          ${rec.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </td>

                        {/* IVA */}
                        <td className="px-3 py-3.5 font-mono text-right text-slate-700">
                          ${rec.iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </td>

                        {/* Total */}
                        <td className="px-3 py-3.5 font-mono text-right font-bold text-[#0b1c30]">
                          ${rec.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </td>

                        {/* Assigned Folio or Candidate count */}
                        <td className="px-3 py-3.5 text-center">
                          {isDiscrepancy ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-[#ffdad6] text-[#93000a]">
                              <span className="material-symbols-outlined text-[13px]">content_copy</span>
                              2 Folios en pugna
                            </span>
                          ) : rec.assignedFolio ? (
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#0b1c30] font-semibold">
                              #{rec.assignedFolio}
                            </span>
                          ) : (
                            <span className="text-[#7a757f] italic text-[11px]">Pendiente</span>
                          )}
                        </td>

                        {/* Status badge */}
                        <td className="px-3 py-3.5 text-center">
                          {getStatusBadge(rec.status)}
                        </td>

                        {/* Action CTA */}
                        <td className="px-3 py-3.5 text-right">
                          {isDiscrepancy ? (
                            <button
                              onClick={() => onOpenDiscrepancyModal(rec)}
                              className="px-3 py-1.5 rounded-xl bg-[#211143] hover:bg-[#391e70] text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all ml-auto cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[15px]">call_split</span>
                              Resolver
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedRecordForDetail(rec)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#211143] text-[11px] font-semibold transition-colors cursor-pointer"
                            >
                              Ver Detalle
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Mobile Card View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {filteredRecords.map((rec) => {
              const isDiscrepancy = rec.status === 'discrepancia';

              return (
                <div
                  key={rec.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isDiscrepancy
                      ? 'border-[#ffdad6] bg-[#fff8f7] shadow-sm'
                      : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-sm text-[#0b1c30] leading-snug">
                        {rec.empresa}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-[11px] text-[#49454e] font-semibold">
                          {rec.rfc}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-[#49454e]">{rec.centroCostos}</span>
                      </div>
                    </div>
                    <div>{getStatusBadge(rec.status)}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] p-2.5 rounded-lg my-3 text-center">
                    <div>
                      <span className="text-[10px] text-[#49454e] uppercase block">Becarios</span>
                      <span className="font-bold text-xs text-[#0b1c30]">{rec.becariosCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#49454e] uppercase block">Subtotal</span>
                      <span className="font-mono text-xs text-[#0b1c30]">
                        ${rec.subtotal.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#745181] uppercase font-bold block">Total</span>
                      <span className="font-mono text-xs font-bold text-[#211143]">
                        ${rec.total.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  {rec.auditNotes && (
                    <p className="text-[11px] text-[#49454e] line-clamp-2 mb-3 bg-white/70 p-2 rounded-md border border-[#e5eeff]">
                      {rec.auditNotes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-[#e5eeff]">
                    <span className="text-[11px] font-mono text-slate-500">
                      {rec.assignedFolio ? `Folio #${rec.assignedFolio}` : 'Pendiente Asignación'}
                    </span>
                    {isDiscrepancy ? (
                      <button
                        onClick={() => onOpenDiscrepancyModal(rec)}
                        className="px-3 py-1.5 rounded-xl bg-[#211143] hover:bg-[#391e70] text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">call_split</span>
                        Resolver Coincidencia
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedRecordForDetail(rec)}
                        className="px-3 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#211143] text-xs font-medium cursor-pointer"
                      >
                        Auditar CFDI
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Record Detail Modal */}
      {selectedRecordForDetail && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedRecordForDetail(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-[#e5eeff]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-[#e5eeff]">
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">
                  {selectedRecordForDetail.empresa}
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {selectedRecordForDetail.rfc} · {selectedRecordForDetail.centroCostos}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecordForDetail(null)}
                className="text-[#7a757f] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Estado de Conciliación:</span>
                <div>{getStatusBadge(selectedRecordForDetail.status)}</div>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Folio CFDI Imputado:</span>
                <span className="font-mono font-bold text-[#0b1c30]">
                  {selectedRecordForDetail.assignedFolio || 'Sin folio'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">UUID SAT Timbrado:</span>
                <span className="font-mono text-slate-700 select-all">
                  {selectedRecordForDetail.uuid || 'Pendiente de recepción'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Número de Becarios:</span>
                <span className="font-semibold text-[#0b1c30]">
                  {selectedRecordForDetail.becariosCount} asignados
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monto Subtotal:</span>
                <span className="font-mono font-semibold">
                  ${selectedRecordForDetail.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">IVA (16%):</span>
                <span className="font-mono font-semibold">
                  ${selectedRecordForDetail.iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 bg-[#eff4ff] p-2 rounded-lg">
                <span className="text-[#211143] font-bold">Total Dispersión:</span>
                <span className="font-mono font-bold text-[#211143] text-sm">
                  ${selectedRecordForDetail.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 block mb-1">Observaciones de Auditoría:</span>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                  {selectedRecordForDetail.auditNotes || 'Sin observaciones registradas.'}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#e5eeff] flex justify-end">
              <button
                onClick={() => setSelectedRecordForDetail(null)}
                className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Sticky Reconciliation Ledger Dock (from design system) */}
      <div className="fixed bottom-0 left-0 md:left-72 right-0 bg-[#211143] text-white border-t border-[#3b236e] shadow-[0_-4px_16px_rgba(30,13,64,0.25)] z-30 px-4 md:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
          {/* Left: Matched summary */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-[#745181]/70 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-white">rule</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {metrics.becariosConciliados} / {metrics.becariosTotal} Becarios Conciliados
                </span>
                <span className="text-[11px] font-mono px-2 py-0.2 rounded-full bg-[#745181] text-white">
                  {((metrics.becariosConciliados / metrics.becariosTotal) * 100).toFixed(1)}%
                </span>
              </div>
              <span className="text-xs text-[#d0bdfa]">
                CFDIs cruzados con pólizas BBVA B2B &amp; Banorte SPEI
              </span>
            </div>
          </div>

          {/* Center: Discrepancy indicator */}
          <div className="hidden lg:flex items-center gap-2 bg-[#351a66] px-3.5 py-1.5 rounded-xl border border-[#4e2e8a]">
            <span className="material-symbols-outlined text-[16px] text-[#f8d8ff]">
              {metrics.discrepanciasActivas > 0 ? 'pending_actions' : 'task_alt'}
            </span>
            <span className="text-xs text-white">
              {metrics.discrepanciasActivas > 0 ? (
                <>
                  Discrepancia pendiente:{' '}
                  <strong className="text-[#f8d8ff] font-mono font-bold">
                    ${metrics.discrepanciasActivas.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                  </strong>
                </>
              ) : (
                <span className="text-emerald-300 font-semibold">
                  Conciliación SEM 37 lista para cierre oficial
                </span>
              )}
            </span>
          </div>

          {/* Right: Close fiscal week execution button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onConfirmCierre}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                metrics.discrepanciasActivas === 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-[#745181] hover:bg-[#886296] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {metrics.discrepanciasActivas === 0 ? 'lock' : 'verified_user'}
              </span>
              <span>
                {metrics.discrepanciasActivas === 0
                  ? 'Bloquear Ciclo Fiscal SEM 37'
                  : 'Validar y Confirmar Cierre Semanal'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
