import React from 'react';
import { FinancialInstrument, UserRole } from '../types/fdr';
import { CheckCircle2, AlertOctagon, Clock, ShieldCheck, FileCheck, ArrowRight, QrCode, Lock } from 'lucide-react';

interface MultiCellClearanceHubProps {
  instrument: FinancialInstrument;
  onToggleClearance: (cell: 'pgrc' | 'vigilance' | 'grants') => void;
  onGenerateNOC: () => void;
  currentRole?: UserRole;
}

export const MultiCellClearanceHub: React.FC<MultiCellClearanceHubProps> = ({
  instrument,
  onToggleClearance,
  onGenerateNOC,
  currentRole = 'BUREAU_HEAD'
}) => {
  const isFullyClear = 
    instrument.pgrcClearance === 'CLEAR' &&
    instrument.vigilanceClearance === 'CLEAR' &&
    instrument.grantsClearance === 'CLEAR';

  const canTogglePGRC = ['PGRC_OFFICER', 'BUREAU_HEAD'].includes(currentRole);
  const canToggleVigilance = ['VIGILANCE_OFFICER', 'BUREAU_HEAD'].includes(currentRole);
  const canToggleGrants = ['BUREAU_HEAD', 'SCRUTINY_OFFICER'].includes(currentRole);

  const getNocButtonLabel = () => {
    if (currentRole === 'INSTITUTION') return 'Download Digital Release NOC';
    if (currentRole === 'BANK_MANAGER') return 'Verify Digital NOC for Encashment';
    if (currentRole === 'BUREAU_HEAD') return 'Authorize & Digitally Sign Release NOC';
    return 'View Verifiable Digital Release NOC';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white px-5 py-3.5 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg border border-teal-400/30">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Clause 6.46 Multi-Cell Parallel Clearance Hub
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isFullyClear 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' 
                  : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
              }`}>
                {isFullyClear ? 'ALL CLEARANCES GRANTED' : 'CLEARANCES IN PROGRESS'}
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Parallel digital clearance routing across PGRC, Vigilance, and Grants Cells (Replaces 90-day sequential paper routing)
            </p>
          </div>
        </div>

        <button
          disabled={!isFullyClear}
          onClick={onGenerateNOC}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-sm ${
            isFullyClear
              ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold shadow-teal-500/20 scale-105'
              : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
          }`}
        >
          <QrCode className="w-4 h-4" />
          {getNocButtonLabel()}
        </button>
      </div>

      {/* Target Case Context Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 flex flex-wrap justify-between items-center gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-500 uppercase text-[10px] tracking-wider">Target Institution:</span>
          <span className="font-bold text-slate-800">{instrument.institutionName}</span>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[11px]">
            PID: {instrument.aictePermanentId}
          </span>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-blue-900 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded text-[11px] font-bold">
            FDR #{instrument.fdrNumber}
          </span>
          <span className="text-slate-300">•</span>
          <span className="font-bold text-emerald-700">₹{(instrument.principalAmount / 100000).toFixed(2)} Lakhs</span>
        </div>
        <div className="text-[11px] text-slate-600 font-medium">
          Maturity Lock-in: <span className="font-mono font-bold text-slate-800">{instrument.lockInTenureYears} Years</span> (Valid till {instrument.maturityDate})
        </div>
      </div>

      {/* 4 Cells Grid */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {/* Cell 1: PGRC Clearance */}
        <div className={`p-4 rounded-xl border transition flex flex-col justify-between h-full ${
          instrument.pgrcClearance === 'CLEAR' 
            ? 'bg-emerald-50/50 border-emerald-200' 
            : 'bg-amber-50/70 border-amber-300'
        }`}>
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Public Grievance (PGRC)
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                instrument.pgrcClearance === 'CLEAR' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-200 text-amber-900'
              }`}>
                {instrument.pgrcClearance}
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {instrument.pgrcClearance === 'CLEAR' 
                ? 'Zero active student fee refund complaints or unpaid faculty salary grievances in registry.' 
                : 'ACTIVE GRIEVANCE: Case #PGRC-2026-UP-041 filed for non-refund of student caution money.'}
            </p>
          </div>

          {canTogglePGRC ? (
            <button
              onClick={() => onToggleClearance('pgrc')}
              className={`w-full py-2 px-3 rounded text-xs font-bold transition flex items-center justify-center gap-1.5 mt-auto ${
                instrument.pgrcClearance === 'CLEAR'
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
              }`}
            >
              {instrument.pgrcClearance === 'CLEAR' ? 'Mark as Under Review' : 'Grant PGRC Clearance (Auto-Check)'}
            </button>
          ) : (
            <div className="w-full py-2 px-3 rounded text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center gap-1.5 mt-auto select-none">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>{currentRole === 'INSTITUTION' ? 'Verification Status (Read-Only)' : 'Restricted to PGRC Officer'}</span>
            </div>
          )}
        </div>

        {/* Cell 2: Vigilance Cell Clearance */}
        <div className={`p-4 rounded-xl border transition flex flex-col justify-between h-full ${
          instrument.vigilanceClearance === 'CLEAR' 
            ? 'bg-emerald-50/50 border-emerald-200' 
            : 'bg-red-50/70 border-red-300'
        }`}>
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Vigilance & CVC Cell
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                instrument.vigilanceClearance === 'CLEAR' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-red-200 text-red-900'
              }`}>
                {instrument.vigilanceClearance}
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {instrument.vigilanceClearance === 'CLEAR' 
                ? 'No active CBI, CVC, or state police vigilance inquiries pending against trust.' 
                : 'HELD: Document discrepancy or duplicate certificate alert under forensic investigation.'}
            </p>
          </div>

          {canToggleVigilance ? (
            <button
              onClick={() => onToggleClearance('vigilance')}
              className={`w-full py-2 px-3 rounded text-xs font-bold transition flex items-center justify-center gap-1.5 mt-auto ${
                instrument.vigilanceClearance === 'CLEAR'
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
              }`}
            >
              {instrument.vigilanceClearance === 'CLEAR' ? 'Flag for Inquiry' : 'Grant Vigilance Clearance'}
            </button>
          ) : (
            <div className="w-full py-2 px-3 rounded text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center gap-1.5 mt-auto select-none">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>{currentRole === 'INSTITUTION' ? 'Verification Status (Read-Only)' : 'Restricted to Chief Vigilance Officer'}</span>
            </div>
          )}
        </div>

        {/* Cell 3: Grants & AQIS Bureau */}
        <div className={`p-4 rounded-xl border transition flex flex-col justify-between h-full ${
          instrument.grantsClearance === 'CLEAR' 
            ? 'bg-emerald-50/50 border-emerald-200' 
            : 'bg-amber-50/70 border-amber-300'
        }`}>
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Institutional Grants (AQIS)
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                instrument.grantsClearance === 'CLEAR' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-200 text-amber-900'
              }`}>
                {instrument.grantsClearance}
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {instrument.grantsClearance === 'CLEAR' 
                ? 'Zero unutilized grants or pending Utilization Certificates (UCs) under MODROBS/RPS.' 
                : 'PENDING: Awaiting submission of audited UC for 2024 AQIS research grant.'}
            </p>
          </div>

          {canToggleGrants ? (
            <button
              onClick={() => onToggleClearance('grants')}
              className={`w-full py-2 px-3 rounded text-xs font-bold transition flex items-center justify-center gap-1.5 mt-auto ${
                instrument.grantsClearance === 'CLEAR'
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
              }`}
            >
              {instrument.grantsClearance === 'CLEAR' ? 'Request Audit UC' : 'Grant Grants Bureau Clearance'}
            </button>
          ) : (
            <div className="w-full py-2 px-3 rounded text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center gap-1.5 mt-auto select-none">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>{currentRole === 'INSTITUTION' ? 'Verification Status (Read-Only)' : 'Restricted to Grants Bureau / Executive'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Under APH Clause 6.46b: Release No Objection Certificate is unlocked only when all 3 divisions sign off.</span>
        </div>
        <div className="font-mono text-slate-500">
          Target Clearance TAT: <strong className="text-slate-900">48 Hours</strong> (Previously 45-90 Days)
        </div>
      </div>
    </div>
  );
};
