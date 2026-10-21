import React, { useState } from 'react';
import { ReconciliationRecord } from '../types';

interface VistaPreviaExcelScreenProps {
  records: ReconciliationRecord[];
}

export const VistaPreviaExcelScreen: React.FC<VistaPreviaExcelScreenProps> = ({ records }) => {
  const [activeSheet, setActiveSheet] = useState<'facturado' | 'pendiente' | 'resumen' | 'audit_log'>('facturado');
  const [selectedCell, setSelectedCell] = useState<string>('F143');

  // Generate downloadable CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (activeSheet === 'facturado') {
      csvContent += 'Semana,Razon Social,RFC,Centro Costos,Becarios,Subtotal,IVA,Total Facturado,Folio Asignado,UUID SAT,Estado\n';
      records.forEach((r, idx) => {
        csvContent += `"${r.periodo}","${r.empresa}","${r.rfc}","${r.centroCostos}",${r.becariosCount},${r.subtotal},${r.iva},${r.total},"${r.assignedFolio || 'PENDIENTE'}","${r.uuid || ''}","${r.status}"\n`;
      });
    } else if (activeSheet === 'pendiente') {
      csvContent += 'Semana,Razon Social,RFC,Subtotal Esperado,IVA,Total,Motivo Pendiente\n';
      records.filter(r => r.status === 'sin_factura').forEach(r => {
        csvContent += `"${r.periodo}","${r.empresa}","${r.rfc}",${r.subtotal},${r.iva},${r.total},"${r.auditNotes || 'Sin comprobante'}"\n`;
      });
    } else {
      csvContent += 'Banco,Cuenta Cargo,Total Dispersado,Comision SPEI,Estatus\n';
      csvContent += '"BBVA Bancomer","01291400291039",1489200.00,0.00,"APLICADO EXITOSO"\n';
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Cierre_Semanal_SEM37_${activeSheet}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Top Excel Ribbon Toolbar */}
      <div className="bg-white rounded-xl border border-[#e5eeff] p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            <span className="material-symbols-outlined text-[24px]">table_view</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                Cierre_Fiscal_SEM_37_Capital_Becarios.xlsx
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-100 text-emerald-800 font-bold">
                ENLACE DIRECTO
              </span>
            </div>
            <p className="text-xs text-[#49454e]">
              Libro de trabajo contable sincronizado con validaciones del SAT y dispersión bancaria
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Exportar Hoja Activa (.CSV)
          </button>
        </div>
      </div>

      {/* Formula Bar */}
      <div className="bg-[#eff4ff] rounded-xl border border-[#dce9ff] p-2 flex items-center gap-3 text-xs">
        <div className="bg-white px-3 py-1 rounded-lg border border-[#dce9ff] font-mono font-bold text-[#0b1c30] w-20 text-center">
          {selectedCell}
        </div>
        <div className="font-mono text-slate-400 font-bold select-none">fx</div>
        <div className="bg-white px-3 py-1 rounded-lg border border-[#dce9ff] font-mono text-[#0b1c30] flex-1 truncate">
          {selectedCell === 'F143'
            ? '=SUMA(D143:E143) // Total Facturado SDN180412KJ9 = $49,300.00 MXN'
            : '=SUBTOTALES(9, G2:G150) // Total Conciliado Oficial'}
        </div>
      </div>

      {/* Excel Spreadsheet Container */}
      <div className="bg-white rounded-xl border border-[#e5eeff] shadow-xs overflow-hidden flex flex-col">
        {/* Table Content */}
        <div className="overflow-x-auto max-h-[580px] overflow-y-auto">
          {activeSheet === 'facturado' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#eff4ff] text-[#49454e] font-mono uppercase text-[11px] sticky top-0 z-20 border-b border-[#dce9ff]">
                <tr>
                  <th className="w-12 px-2 py-2 text-center bg-[#e5eeff] border-r border-[#dce9ff]">#</th>
                  <th className="px-3 py-2 border-r border-[#dce9ff]">A: Semana</th>
                  <th className="px-4 py-2 border-r border-[#dce9ff]">B: Razón Social</th>
                  <th className="px-3 py-2 border-r border-[#dce9ff]">C: RFC</th>
                  <th className="px-3 py-2 border-r border-[#dce9ff] text-right">D: Subtotal</th>
                  <th className="px-3 py-2 border-r border-[#dce9ff] text-right">E: IVA (16%)</th>
                  <th className="px-3 py-2 border-r border-[#dce9ff] text-right">F: Total Facturado</th>
                  <th className="px-3 py-2 border-r border-[#dce9ff] text-center">G: Folio Asignado</th>
                  <th className="px-4 py-2 border-r border-[#dce9ff]">H: UUID SAT</th>
                  <th className="px-4 py-2">I: Observaciones Auditoría</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {records.map((r, idx) => {
                  const rowNumber = 142 + idx;
                  const isTargetRow = rowNumber === 143;

                  return (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedCell(`F${rowNumber}`)}
                      className={`cursor-pointer transition-colors ${
                        isTargetRow
                          ? 'bg-[#f8d8ff]/30 hover:bg-[#f8d8ff]/40 font-semibold'
                          : idx % 2 === 0
                          ? 'bg-white hover:bg-slate-50'
                          : 'bg-[#f8f9ff] hover:bg-slate-50'
                      }`}
                    >
                      <td className="px-2 py-2 text-center bg-[#f8f9ff] text-slate-500 border-r border-[#e5eeff] select-none font-bold">
                        {rowNumber}
                      </td>
                      <td className="px-3 py-2 border-r border-[#e5eeff] text-slate-700">SEM 37</td>
                      <td className="px-4 py-2 border-r border-[#e5eeff] font-['Inter'] font-semibold text-[#0b1c30]">
                        {r.empresa}
                        {isTargetRow && (
                          <span className="ml-2 px-1.5 py-0.2 rounded text-[10px] bg-[#745181] text-white">
                            FILA DESTINO MODAL
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 border-r border-[#e5eeff] text-slate-700">{r.rfc}</td>
                      <td className="px-3 py-2 border-r border-[#e5eeff] text-right">
                        ${r.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-2 border-r border-[#e5eeff] text-right">
                        ${r.iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-2 border-r border-[#e5eeff] text-right font-bold text-[#0b1c30]">
                        ${r.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-2 border-r border-[#e5eeff] text-center font-bold">
                        {r.status === 'discrepancia' ? (
                          <span className="px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-[11px]">
                            #4892 (PENDIENTE RATIFICACIÓN)
                          </span>
                        ) : r.assignedFolio ? (
                          <span className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#211143]">
                            #{r.assignedFolio}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">--</span>
                        )}
                      </td>
                      <td className="px-4 py-2 border-r border-[#e5eeff] text-[11px] text-slate-600 truncate max-w-[180px]">
                        {r.uuid || (r.status === 'discrepancia' ? '7e2f9810-b384-48f1-a1b9-39f1c79a11a2' : 'N/A')}
                      </td>
                      <td className="px-4 py-2 font-['Inter'] text-slate-600 text-[11px] truncate max-w-xs">
                        {r.auditNotes || 'Conciliado con póliza de nómina.'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {activeSheet === 'pendiente' && (
            <div className="p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-amber-500 mb-2">pending_actions</span>
              <h4 className="font-bold text-sm text-[#0b1c30]">Hoja: 'B. PENDIENTE FACTURACIÓN SEM 37'</h4>
              <p className="text-xs text-[#49454e] max-w-md mx-auto mt-1 mb-4">
                Comprobantes fiscales en investigación o pendientes de reexpedición por parte de proveedores
              </p>
              <div className="max-w-2xl mx-auto bg-[#eff4ff] rounded-xl p-4 text-xs font-mono text-left">
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="font-bold">FUNDACIÓN BIO-MÉDICA DEL PACÍFICO (FBP170425PZ3)</span>
                  <span className="text-amber-800 font-bold">$64,960.00 MXN</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Motivo: Falta timbre fiscal CFDI 4.0 con clave retención becarios.
                </div>
              </div>
            </div>
          )}

          {activeSheet === 'resumen' && (
            <div className="p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-blue-600 mb-2">account_balance</span>
              <h4 className="font-bold text-sm text-[#0b1c30]">Hoja: 'C. RESUMEN DISPERSIÓN BANCOS'</h4>
              <p className="text-xs text-[#49454e] max-w-md mx-auto mt-1 mb-4">
                Póliza consolidada de dispersión B2B liquidada en cámaras de compensación SPEI
              </p>
              <div className="max-w-md mx-auto bg-[#eff4ff] rounded-xl p-4 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span>Monto Total Dispersado:</span>
                  <span className="font-bold font-mono">$1,489,200.00 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span>Comisiones Bancarias:</span>
                  <span className="font-mono">$0.00 (Convenio Institucional)</span>
                </div>
                <div className="flex justify-between">
                  <span>Banco Pagador:</span>
                  <span className="font-semibold">BBVA Bancomer B2B</span>
                </div>
                <div className="flex justify-between">
                  <span>Clave Rastreo SPEI:</span>
                  <span className="font-mono text-slate-600">884102941029412</span>
                </div>
              </div>
            </div>
          )}

          {activeSheet === 'audit_log' && (
            <div className="p-6">
              <div className="bg-[#0b1c30] text-emerald-400 p-5 rounded-xl font-mono text-xs space-y-2 shadow-inner">
                <div className="text-white font-bold pb-2 border-b border-slate-700">
                  REGISTRO INMUTABLE DE FIRMAS Y SELLOS CRIPTOGRÁFICOS
                </div>
                <div>[2024-09-15 10:14:22] CFDI Folio #4892 recibido PAC MasFactura · Sello: OK</div>
                <div>[2024-09-15 14:32:05] CFDI Folio #4901 recibido PAC MasFactura · Alerta de posible duplicidad</div>
                <div>[2024-09-15 18:30:10] Pre-Cierre calculado · SHA256: 8c3e80f968bd0a7479743c3a44b36070fa8ebf1a301ec9c7e0fef3ba0248a721</div>
                <div>[2024-09-15 18:31:00] Auditoría asignada a Lic. Elena Morales · Certificado SAT: Vigente</div>
              </div>
            </div>
          )}
        </div>

        {/* Excel Tab Bar at Bottom */}
        <div className="bg-[#e5eeff] px-4 py-2 border-t border-[#dce9ff] flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveSheet('facturado')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeSheet === 'facturado'
                  ? 'bg-white text-emerald-800 shadow-xs border-t-2 border-emerald-600'
                  : 'text-[#49454e] hover:bg-white/60'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">table_rows</span>
              A. FACTURADO SEMANA 37
            </button>
            <button
              onClick={() => setActiveSheet('pendiente')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeSheet === 'pendiente'
                  ? 'bg-white text-emerald-800 shadow-xs border-t-2 border-emerald-600'
                  : 'text-[#49454e] hover:bg-white/60'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">pending</span>
              B. PENDIENTE FACTURACIÓN
            </button>
            <button
              onClick={() => setActiveSheet('resumen')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeSheet === 'resumen'
                  ? 'bg-white text-emerald-800 shadow-xs border-t-2 border-emerald-600'
                  : 'text-[#49454e] hover:bg-white/60'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">summarize</span>
              C. RESUMEN DISPERSIÓN BANCOS
            </button>
            <button
              onClick={() => setActiveSheet('audit_log')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeSheet === 'audit_log'
                  ? 'bg-white text-emerald-800 shadow-xs border-t-2 border-emerald-600'
                  : 'text-[#49454e] hover:bg-white/60'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">history_edu</span>
              D. LOG AUDITORÍA SHA-256
            </button>
          </div>

          <span className="text-[11px] text-[#49454e] font-mono hidden sm:inline">
            150 Registros · HASH OK
          </span>
        </div>
      </div>
    </div>
  );
};
