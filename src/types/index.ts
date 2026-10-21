export interface CandidateInvoice {
  folio: string;
  serie: string;
  tipo: string;
  isRecommended: boolean;
  statusBadge: string;
  badgeType: 'recommended' | 'duplicate' | 'normal';
  uuid: string;
  fechaHora: string;
  pacStatus: string;
  pacStatusType: 'valid' | 'conflict' | 'cancelled';
  concepto: string;
  subtotal: number;
  total: number;
  diagnosticTitle: string;
  diagnosticText: string;
  diagnosticType: 'success' | 'warning' | 'error';
}

export interface ReconciliationRecord {
  id: string;
  empresa: string;
  rfc: string;
  centroCostos: string;
  periodo: string;
  becariosCount: number;
  subtotal: number;
  iva: number;
  total: number;
  status: 'conciliado' | 'discrepancia' | 'dispersion_mensual' | 'sin_factura';
  hasMultipleFolios?: boolean;
  assignedFolio?: string;
  uuid?: string;
  auditNotes?: string;
  destinationSheet?: string;
  destinationRow?: number;
  candidates?: CandidateInvoice[];
}

export interface MetricSummary {
  totalDispersado: number;
  cfdisValidados: number;
  cfdisValidadosPercent: number;
  discrepanciasActivas: number;
  discrepanciasCount: number;
  becariosConciliados: number;
  becariosTotal: number;
  hashBloqueo: string;
  estadoPreCierre: string;
}

export interface HistoricalClosure {
  semana: string;
  ciclo: string;
  fechaCierre: string;
  totalDispersado: number;
  becariosTotal: number;
  cfdisTotal: number;
  hashSha256: string;
  auditor: string;
  estado: 'bloqueado' | 'en_proceso';
  bancoDispersor: string;
}
