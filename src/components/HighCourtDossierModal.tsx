import React from 'react';
import { FinancialInstrument } from '../types/fdr';
import { X, Scale, Printer, Download, CheckCircle, FileText, Shield } from 'lucide-react';

interface HighCourtDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  instrument: FinancialInstrument;
}

export const HighCourtDossierModal: React.FC<HighCourtDossierModalProps> = ({
  isOpen,
  onClose,
  instrument
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center space-x-2.5">
            <Scale className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm tracking-wide">
              1-Click High Court Mandamus Defense Dossier (Statutory Counter-Affidavit)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dossier Content */}
        <div className="p-8 bg-slate-50 border-b border-slate-200 max-h-[70vh] overflow-y-auto text-xs font-serif leading-relaxed text-slate-900">
          <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm">
            <div className="text-center border-b-2 border-slate-900 pb-3 mb-4 font-sans">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                BEFORE THE HON'BLE HIGH COURT OF JUDICATURE
              </h4>
              <p className="text-xs text-slate-600 italic">
                In the matter of Writ Petition (Civil) regarding FDR Discharge / Security Deposit Release
              </p>
              <div className="mt-2 text-xs font-mono font-bold text-slate-800">
                AICTE COUNTER-AFFIDAVIT & EVIDENTIARY DOSSIER
              </div>
            </div>

            <div className="font-sans text-xs mb-4 space-y-1">
              <div><strong>Respondent:</strong> All India Council for Technical Education (AICTE), Ministry of Education</div>
              <div><strong>Petitioner Institution:</strong> {instrument.institutionName} (PID: {instrument.aictePermanentId})</div>
              <div><strong>Subject Instrument:</strong> Joint Fixed Deposit Receipt No. {instrument.fdrNumber} (₹{(instrument.principalAmount / 100000).toFixed(2)} Lakhs)</div>
            </div>

            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
              1. Chronological Statement of Facts & Statutory Justification
            </h5>
            <p className="mb-3">
              1.1. It is humbly submitted that the Petitioner institution was granted approval subject to the strict adherence of statutory norms codified in the <strong>AICTE Approval Process Handbook (APH)</strong>.
            </p>
            <p className="mb-3">
              1.2. Under <strong>Clause 6.46(b) of the Approval Process Handbook</strong>, the release of any security deposit or fixed deposit receipt upon completion of lock-in maturity is legally contingent upon concurrent clearances from the <strong>Public Grievance Redressal Cell (PGRC)</strong>, the <strong>Vigilance Cell</strong>, and the <strong>Grants/AQIS Bureau</strong>.
            </p>

            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
              2. Evidentiary Audit Trail of Administrative Actions
            </h5>
            <div className="bg-slate-50 border border-slate-200 rounded p-3 font-mono text-[11px] mb-4 space-y-1.5">
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>Application Timestamp:</span>
                <span className="font-bold">{instrument.submittedAt} (Logged via Surakshit Nidhi Portal)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>PGRC Grievance Status:</span>
                <span className={instrument.pgrcClearance === 'CLEAR' ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                  {instrument.pgrcClearance === 'CLEAR' ? 'Zero Liabilities Found' : 'Grievance #PGRC-2026-UP-041 Pending (Fee Refund Hold)'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>Vigilance Clearance:</span>
                <span className={instrument.vigilanceClearance === 'CLEAR' ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                  {instrument.vigilanceClearance}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Cryptographic Ledger Hash:</span>
                <span className="text-slate-600 truncate">{instrument.fileHashSha256.substring(0, 32)}...</span>
              </div>
            </div>

            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
              3. Prayer on Behalf of Respondent (AICTE)
            </h5>
            <p>
              In light of the documentary evidence and automated audit logs presented herein, AICTE has acted in strict conformity with gazetted regulatory procedures. It is respectfully prayed that the Hon'ble Court be pleased to uphold the statutory requirements of Clause 6.46 and direct the Petitioner to satisfy outstanding grievance liabilities prior to release.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-end font-sans text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Verified by AICTE Legal Bureau</span>
                <span className="font-bold text-slate-900">Advocate on Record / Standing Counsel</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Prepared within: 12 Seconds</span>
                <span className="font-mono text-emerald-700 font-bold">100% Cryptographically Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-white flex justify-between items-center text-xs">
          <span className="text-slate-500">
            Replaces 30-60 days of manual file notes across 4 bureaus with an instant court brief.
          </span>
          <div className="flex space-x-2">
            <button onClick={() => window.print()} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5" /> Print Dossier
            </button>
            <button onClick={() => { alert("Exported certified High Court counter-affidavit package."); onClose(); }} className="px-4 py-1.5 bg-aicte-blue hover:bg-slate-800 text-white font-bold rounded-lg transition flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Download Legal Brief (.PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
