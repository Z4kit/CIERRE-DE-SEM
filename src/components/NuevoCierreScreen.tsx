import React, { useState } from 'react';

interface NuevoCierreScreenProps {
  onProcessComplete: () => void;
}

export const NuevoCierreScreen: React.FC<NuevoCierreScreenProps> = ({ onProcessComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedBank, setSelectedBank] = useState<'bbva' | 'banorte' | 'santander'>('bbva');
  const [weekName, setWeekName] = useState('SEM 38 (2024)');
  const [uploadedFiles, setUploadedFiles] = useState<{
    bankLayout: boolean;
    satZip: boolean;
    becariosCatalog: boolean;
  }>({
    bankLayout: true,
    satZip: true,
    becariosCatalog: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [processingLog, setProcessingLog] = useState<string[]>([]);

  const handleStartProcessing = () => {
    setStep(2);
    setIsProcessing(true);
    setProgressPercent(10);
    setProcessingLog(['Iniciando lectura de layout bancario B2B...']);

    setTimeout(() => {
      setProgressPercent(35);
      setProcessingLog((prev) => [
        ...prev,
        'Analizando 150 registros de becarios en layout...',
        'Calculando Hash SHA-256 del archivo bancario...',
      ]);
    }, 600);

    setTimeout(() => {
      setProgressPercent(70);
      setProcessingLog((prev) => [
        ...prev,
        'Desempaquetando repositorio CFDI 4.0 (151 archivos XML)...',
        'Validando sellos digitales ante PAC y listas negras 69-B del SAT...',
        'Cruzando montos de dispersión con subtotales e impuestos...',
      ]);
    }, 1200);

    setTimeout(() => {
      setProgressPercent(100);
      setIsProcessing(false);
      setProcessingLog((prev) => [
        ...prev,
        '¡Cruce completado con éxito!',
        '142 registros conciliados limpios (94.7%).',
        '1 inconsistencia detectada: Coincidencia múltiple de folios (SDN180412KJ9).',
        'Generando pre-cierre criptográfico SHA-256...',
      ]);
      setStep(3);
    }, 1900);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-[#211143] text-white p-6 rounded-2xl shadow-sm border border-[#3b236e] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f8d8ff] text-[24px]">cloud_upload</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold">
              Nuevo Cierre de Ciclo Fiscal
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#d0bdfa] mt-1">
            Cargue los archivos maestros para ejecutar el algoritmo de conciliación automatizada con firma criptográfica
          </p>
        </div>

        {/* Stepper indicator */}
        <div className="flex items-center gap-2 bg-[#351a66] p-1.5 rounded-xl border border-[#4e2e8a] self-start md:self-auto text-xs">
          <div className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 ${
            step === 1 ? 'bg-[#745181] text-white' : 'text-[#d0bdfa]'
          }`}>
            <span>1</span> <span className="hidden sm:inline">Carga</span>
          </div>
          <span className="text-[#66558b]">/</span>
          <div className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 ${
            step === 2 ? 'bg-[#745181] text-white' : 'text-[#d0bdfa]'
          }`}>
            <span>2</span> <span className="hidden sm:inline">SHA-256</span>
          </div>
          <span className="text-[#66558b]">/</span>
          <div className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 ${
            step === 3 ? 'bg-[#745181] text-white' : 'text-[#d0bdfa]'
          }`}>
            <span>3</span> <span className="hidden sm:inline">Resultados</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-2xl border border-[#e5eeff] p-6 shadow-xs flex flex-col gap-6">
          {/* Cycle & Bank Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0b1c30] uppercase tracking-wider mb-1.5">
                Ciclo Fiscal a Procesar
              </label>
              <input
                type="text"
                value={weekName}
                onChange={(e) => setWeekName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-sm text-[#0b1c30] font-semibold focus:outline-none focus:ring-2 focus:ring-[#745181]"
              />
              <span className="text-[11px] text-[#49454e] mt-1 block">
                Corresponde a la dispersión de la semana laboral en curso
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0b1c30] uppercase tracking-wider mb-1.5">
                Institución Bancaria Dispersora
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBank('bbva')}
                  className={`h-11 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedBank === 'bbva'
                      ? 'bg-[#211143] text-white border-[#211143] shadow-xs'
                      : 'bg-[#eff4ff] text-[#0b1c30] border-[#dce9ff] hover:bg-[#e5eeff]'
                  }`}
                >
                  BBVA B2B
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBank('banorte')}
                  className={`h-11 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedBank === 'banorte'
                      ? 'bg-[#211143] text-white border-[#211143] shadow-xs'
                      : 'bg-[#eff4ff] text-[#0b1c30] border-[#dce9ff] hover:bg-[#e5eeff]'
                  }`}
                >
                  Banorte SPEI
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBank('santander')}
                  className={`h-11 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedBank === 'santander'
                      ? 'bg-[#211143] text-white border-[#211143] shadow-xs'
                      : 'bg-[#eff4ff] text-[#0b1c30] border-[#dce9ff] hover:bg-[#e5eeff]'
                  }`}
                >
                  Santander
                </button>
              </div>
            </div>
          </div>

          {/* Drag & Drop File Zones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Layout Bancario */}
            <div className="border-2 border-dashed border-[#cbd5e1] hover:border-[#745181] rounded-xl p-5 flex flex-col items-center text-center justify-between bg-[#f8f9ff] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#211143] mb-3">
                <span className="material-symbols-outlined text-[26px]">account_balance_wallet</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b1c30]">Layout Dispersión Bancaria</h4>
                <p className="text-xs text-[#49454e] mt-1">Archivo Excel o CSV exportado del portal bancario</p>
              </div>
              <div className="mt-4 w-full">
                {uploadedFiles.bankLayout ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2 rounded-lg text-xs flex items-center justify-between">
                    <span className="font-mono truncate">layout_dispersion_sem37.csv</span>
                    <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  </div>
                ) : (
                  <button className="w-full py-2 bg-white border border-[#cbd5e1] rounded-lg text-xs font-semibold text-[#0b1c30] hover:bg-slate-50">
                    Seleccionar Archivo
                  </button>
                )}
              </div>
            </div>

            {/* Box 2: Repositorio SAT XML / ZIP */}
            <div className="border-2 border-dashed border-[#cbd5e1] hover:border-[#745181] rounded-xl p-5 flex flex-col items-center text-center justify-between bg-[#f8f9ff] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#f8d8ff] flex items-center justify-center text-[#745181] mb-3">
                <span className="material-symbols-outlined text-[26px]">folder_zip</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b1c30]">Paquete CFDI 4.0 (SAT)</h4>
                <p className="text-xs text-[#49454e] mt-1">Archivo .ZIP con XMLs timbrados y constancias PAC</p>
              </div>
              <div className="mt-4 w-full">
                {uploadedFiles.satZip ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2 rounded-lg text-xs flex items-center justify-between">
                    <span className="font-mono truncate">cfdi_timbrados_sem37.zip</span>
                    <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  </div>
                ) : (
                  <button className="w-full py-2 bg-white border border-[#cbd5e1] rounded-lg text-xs font-semibold text-[#0b1c30] hover:bg-slate-50">
                    Seleccionar Archivo
                  </button>
                )}
              </div>
            </div>

            {/* Box 3: Catálogo Becarios */}
            <div className="border-2 border-dashed border-[#cbd5e1] hover:border-[#745181] rounded-xl p-5 flex flex-col items-center text-center justify-between bg-[#f8f9ff] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#211143] mb-3">
                <span className="material-symbols-outlined text-[26px]">badge</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b1c30]">Catálogo Maestro Becarios</h4>
                <p className="text-xs text-[#49454e] mt-1">Matrículas, RFCs de empresas receptoras y convenios</p>
              </div>
              <div className="mt-4 w-full">
                {uploadedFiles.becariosCatalog ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2 rounded-lg text-xs flex items-center justify-between">
                    <span className="font-mono truncate">catalogo_becarios_2024.xlsx</span>
                    <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  </div>
                ) : (
                  <button className="w-full py-2 bg-white border border-[#cbd5e1] rounded-lg text-xs font-semibold text-[#0b1c30] hover:bg-slate-50">
                    Seleccionar Archivo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Engine Parameters Info Box */}
          <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#dce9ff] flex items-start gap-3">
            <span className="material-symbols-outlined text-[#745181] text-[20px] shrink-0 mt-0.5">
              security
            </span>
            <div className="text-xs text-[#0b1c30] leading-relaxed">
              <strong className="font-semibold">Reglas de Integridad Contable:</strong> El motor comparará centavo a centavo el importe neto transferido en la póliza bancaria contra el total del CFDI 4.0. Se validará que el UUID no haya sido timbrado en ciclos anteriores ni pertenezca a contribuyentes no localizados (EFOS) ante el SAT.
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#49454e]">
              3 de 3 archivos validados y listos para procesar
            </span>
            <button
              onClick={handleStartProcessing}
              className="px-6 py-3 rounded-xl bg-[#211143] hover:bg-[#391e70] text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              Ejecutar Conciliación y Cómputo SHA-256
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl border border-[#e5eeff] p-8 shadow-xs flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#eff4ff] text-[#745181] flex items-center justify-center mb-4 animate-spin">
            <span className="material-symbols-outlined text-[32px]">sync</span>
          </div>

          <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0b1c30]">
            Procesando Archivos &amp; Generando Árbol SHA-256
          </h3>
          <p className="text-xs text-[#49454e] max-w-md mt-1 mb-6">
            Comprobando firmas digitales ante la autoridad fiscal y contrastando montos de nómina
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-md bg-[#e5eeff] h-2.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-[#211143] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Live log */}
          <div className="w-full max-w-lg bg-[#0b1c30] text-emerald-400 p-4 rounded-xl text-left font-mono text-xs space-y-1.5 shadow-inner">
            {processingLog.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-slate-500">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-2xl border border-[#e5eeff] p-6 shadow-xs flex flex-col gap-6 animate-in fade-in">
          <div className="flex items-center gap-4 pb-4 border-b border-[#e5eeff]">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">task_alt</span>
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#0b1c30]">
                Pre-Cierre Generado con Éxito
              </h3>
              <p className="text-xs text-[#49454e]">
                Se procesaron 150 becarios en 9 razones sociales. 1 discrepancia requiere adjudicación contable manual.
              </p>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <span className="text-[11px] text-[#49454e] uppercase font-semibold">Total Dispersado</span>
              <div className="text-xl font-bold text-[#0b1c30] mt-1">$1,489,200.00 MXN</div>
              <span className="text-xs text-emerald-700 font-medium mt-1 block">150 becarios nómina</span>
            </div>
            <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <span className="text-[11px] text-[#49454e] uppercase font-semibold">CFDIs Conciliados</span>
              <div className="text-xl font-bold text-[#745181] mt-1">$1,439,900.00 MXN</div>
              <span className="text-xs text-[#745181] font-medium mt-1 block">96.7% sin conflicto</span>
            </div>
            <div className="p-4 rounded-xl bg-[#ffdad6]/40 border border-[#ffb4ab]">
              <span className="text-[11px] text-[#ba1a1a] uppercase font-semibold">Discrepancias Activas</span>
              <div className="text-xl font-bold text-[#ba1a1a] mt-1">$49,300.00 MXN</div>
              <span className="text-xs text-[#ba1a1a] font-medium mt-1 block">1 caso con 2 folios</span>
            </div>
          </div>

          {/* Cryptographic Pre-Seal */}
          <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#dce9ff] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#745181] text-[22px]">lock_clock</span>
              <div>
                <span className="text-xs font-bold text-[#0b1c30] block">
                  Hash de Pre-Cierre Calculado:
                </span>
                <span className="font-mono text-xs text-[#49454e] select-all">
                  SHA256: 8c3e80f968bd0a7479743c3a44b36070fa8ebf1a301ec9c7e0fef3ba0248a721
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
              Pendiente Resolución
            </span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold"
            >
              Cargar Otros Archivos
            </button>
            <button
              onClick={onProcessComplete}
              className="px-6 py-2.5 rounded-xl bg-[#211143] hover:bg-[#391e70] text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              Ir a la Matriz de Conciliación
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
