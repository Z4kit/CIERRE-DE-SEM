import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ConciliacionScreen } from './components/ConciliacionScreen';
import { DiscrepancyModal } from './components/DiscrepancyModal';
import { NuevoCierreScreen } from './components/NuevoCierreScreen';
import { VistaPreviaExcelScreen } from './components/VistaPreviaExcelScreen';
import { HistorialCierresScreen } from './components/HistorialCierresScreen';
import { CryptoAuditModal } from './components/CryptoAuditModal';
import { CierreConfirmModal } from './components/CierreConfirmModal';
import { INITIAL_METRICS, INITIAL_RECORDS } from './data/mockData';
import { ReconciliationRecord, MetricSummary } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('conciliacion');
  const [selectedCycle, setSelectedCycle] = useState<string>('SEM 37 (2024)');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Core application data state
  const [records, setRecords] = useState<ReconciliationRecord[]>(INITIAL_RECORDS);
  const [metrics, setMetrics] = useState<MetricSummary>(INITIAL_METRICS);

  // Modals
  // In the user's reference mockup (Image_1_f23da489.png), the modal is open over the dashboard
  const [isDiscrepancyModalOpen, setIsDiscrepancyModalOpen] = useState<boolean>(true);
  const [selectedDiscrepancyRecord, setSelectedDiscrepancyRecord] = useState<ReconciliationRecord | null>(
    INITIAL_RECORDS.find((r) => r.status === 'discrepancia') || null
  );
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState<boolean>(false);
  const [isCierreConfirmModalOpen, setIsCierreConfirmModalOpen] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>({
    text: 'Cierre SEM 37 en curso · 1 caso de duplicidad fiscal detectado para resolución manual',
    type: 'info',
  });

  const handleOpenDiscrepancyModal = (record: ReconciliationRecord) => {
    setSelectedDiscrepancyRecord(record);
    setIsDiscrepancyModalOpen(true);
  };

  const handleResolveDiscrepancy = (
    recordId: string,
    selectedFolio: string,
    discardAction: 'duplicado_descartado' | 'pendiente_facturacion',
    requestSatCancel: boolean
  ) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id === recordId) {
          return {
            ...r,
            status: 'conciliado',
            assignedFolio: `${selectedFolio} (Serie A)`,
            auditNotes: `Conciliado: Folio ${selectedFolio} ratificado. Folio ${
              selectedFolio === '4892' ? '4901' : '4892'
            } ${
              discardAction === 'duplicado_descartado'
                ? 'marcado como duplicado descartado en auditoría'
                : 'enviado a comprobantes en revisión'
            }.${requestSatCancel ? ' Solicitud de cancelación SAT generada (Motivo 02).' : ''}`,
          };
        }
        return r;
      })
    );

    // Update global metrics
    setMetrics((prev) => ({
      ...prev,
      cfdisValidados: prev.totalDispersado,
      cfdisValidadosPercent: 100,
      discrepanciasActivas: 0,
      discrepanciasCount: 0,
      becariosConciliados: prev.becariosTotal,
      estadoPreCierre: 'Listo para Bloqueo Final',
      hashBloqueo: 'SHA256: 4f8b91a0...9fa2 (Certificado)',
    }));

    setToastMessage({
      text: `¡Conciliación exitosa! Folio ${selectedFolio} ratificado para ${selectedDiscrepancyRecord?.empresa}. Discrepancia resuelta al 100%.`,
      type: 'success',
    });
  };

  const handleConfirmCierreSuccess = () => {
    setMetrics((prev) => ({
      ...prev,
      estadoPreCierre: 'Bloqueado & Certificado',
      hashBloqueo: 'SHA256: 8c3e80f9...a721 (SELLADO)',
    }));
    setToastMessage({
      text: 'Ciclo Fiscal SEM 37 cerrado y sellado con firma e.Firma SAT.',
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-['Inter'] antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 md:right-8 z-50 max-w-md bg-white border border-[#e5eeff] rounded-xl shadow-xl p-3.5 flex items-start gap-3 animate-in slide-in-from-top-2 duration-200">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              toastMessage.type === 'success'
                ? 'bg-emerald-100 text-emerald-700'
                : toastMessage.type === 'warning'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-[#eff4ff] text-[#211143]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {toastMessage.type === 'success'
                ? 'check_circle'
                : toastMessage.type === 'warning'
                ? 'warning'
                : 'info'}
            </span>
          </div>
          <div className="flex-1 text-xs">
            <span className="font-semibold text-[#0b1c30] block">
              {toastMessage.type === 'success'
                ? 'Acción Registrada en Auditoría'
                : 'Estado del Cierre'}
            </span>
            <span className="text-[#49454e] leading-snug">{toastMessage.text}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-slate-700 p-0.5"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Sovereign Deep Purple Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        discrepancyCount={metrics.discrepanciasCount}
        selectedCycle={selectedCycle}
        onCycleChange={setSelectedCycle}
        onOpenCryptoModal={() => setIsCryptoModalOpen(true)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="md:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenCryptoModal={() => setIsCryptoModalOpen(true)}
        />

        {/* View Content */}
        <main className="w-full pt-20 px-4 md:px-8 py-6 flex-1 relative">
          {currentTab === 'conciliacion' && (
            <div className={`transition-all duration-300 ${isDiscrepancyModalOpen ? 'filter blur-[1.5px] opacity-40 pointer-events-none select-none' : ''}`}>
              <ConciliacionScreen
                records={records}
                metrics={metrics}
                searchTerm={searchTerm}
                onOpenDiscrepancyModal={handleOpenDiscrepancyModal}
                onConfirmCierre={() => setIsCierreConfirmModalOpen(true)}
              />
            </div>
          )}

          {currentTab === 'nuevo-cierre' && (
            <NuevoCierreScreen
              onProcessComplete={() => {
                setCurrentTab('conciliacion');
                setToastMessage({
                  text: 'Archivos cargados correctamente. Matriz lista para revisión.',
                  type: 'info',
                });
              }}
            />
          )}

          {currentTab === 'vista-previa-excel' && (
            <VistaPreviaExcelScreen records={records} />
          )}

          {currentTab === 'historial-cierres' && (
            <HistorialCierresScreen
              onSelectWeek={(semana) => {
                setSelectedCycle(semana);
                setCurrentTab('conciliacion');
              }}
              onOpenCryptoModal={() => setIsCryptoModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Discrepancy Resolution Modal (from reference HTML & PNG) */}
      {selectedDiscrepancyRecord && (
        <DiscrepancyModal
          isOpen={isDiscrepancyModalOpen && currentTab === 'conciliacion'}
          record={selectedDiscrepancyRecord}
          onClose={() => setIsDiscrepancyModalOpen(false)}
          onResolve={handleResolveDiscrepancy}
        />
      )}

      {/* Cryptographic Merkle / SHA-256 Audit Modal */}
      <CryptoAuditModal
        isOpen={isCryptoModalOpen}
        onClose={() => setIsCryptoModalOpen(false)}
        currentHash={metrics.hashBloqueo}
      />

      {/* Fiscal Closure Lock Confirmation Modal */}
      <CierreConfirmModal
        isOpen={isCierreConfirmModalOpen}
        onClose={() => setIsCierreConfirmModalOpen(false)}
        metrics={metrics}
        onConfirmSuccess={handleConfirmCierreSuccess}
      />
    </div>
  );
}
