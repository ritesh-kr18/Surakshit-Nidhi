import React from 'react';
import { FinancialInstrument } from '../types/fdr';
import { ShieldAlert, AlertTriangle, Landmark, TrendingDown, ArrowRight, ShieldCheck } from 'lucide-react';

interface BankSolvencyRadarProps {
  instruments: FinancialInstrument[];
}

export const BankSolvencyRadar: React.FC<BankSolvencyRadarProps> = ({
  instruments
}) => {
  // Filter instruments from co-operative or flagged banks
  const distressedInstruments = instruments.filter(i => 
    i.issuingBankName.toLowerCase().includes('co-operative') || 
    i.issuingBankName.toLowerCase().includes('urban')
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-amber-300 overflow-hidden">
      {/* Header */}
      <div className="bg-amber-950 text-white px-5 py-3.5 flex justify-between items-center border-b border-amber-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-800 text-amber-200 rounded-lg border border-amber-700">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              RBI Prompt Corrective Action (PCA) & Solvency Early-Warning Radar
              <span className="bg-amber-500 text-slate-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                1 Warning Active
              </span>
            </h3>
            <p className="text-xs text-amber-200">
              Protects AICTE deposits exceeding DICGC's ₹5,00,000 insurance limit against long-term bank insolvency or moratoriums
            </p>
          </div>
        </div>

        <div className="text-xs font-mono bg-amber-900 px-3 py-1 rounded text-amber-200 border border-amber-800">
          DICGC Max Coverage: ₹5,00,000
        </div>
      </div>

      <div className="p-6">
        {/* Risk Overview Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs mb-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                Deposit Solvency Alert: Capital At Risk Beyond Insurance Threshold
              </span>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                Under Section 16(1) of the DICGC Act, bank liquidations insure depositor funds only up to <strong>₹5 Lakhs</strong>. Technical institutions submitting deposits of ₹15 Lakh to ₹35 Lakh in non-scheduled urban cooperative banks subject the council to unrecoverable financial write-offs.
              </p>
            </div>
            <div className="text-right shrink-0 ml-4 font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Total Capital At Risk:</span>
              <span className="text-lg font-extrabold text-red-700">₹15.00 Lakhs</span>
            </div>
          </div>
        </div>

        {/* Flagged Bank Card */}
        {distressedInstruments.map((inst) => (
          <div key={inst.id} className="border-2 border-red-200 bg-red-50/40 rounded-xl p-4 text-xs mb-4">
            <div className="flex flex-wrap justify-between items-center border-b border-red-200 pb-2 mb-3">
              <div>
                <span className="font-bold text-sm text-red-950">{inst.institutionName}</span>
                <span className="text-slate-500 ml-2 font-mono text-[11px]">(PID: {inst.aictePermanentId})</span>
              </div>
              <span className="bg-red-200 text-red-900 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded border border-red-300">
                RBI PCA WATCHLIST TRIGGERED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11px] mb-3">
              <div className="bg-white p-2.5 rounded border border-red-200">
                <span className="text-[10px] text-slate-500 block">Issuing Bank Entity:</span>
                <strong className="text-slate-900 font-sans">{inst.issuingBankName}</strong>
              </div>
              <div className="bg-white p-2.5 rounded border border-red-200">
                <span className="text-[10px] text-slate-500 block">FDR Amount Pledged:</span>
                <strong className="text-red-700 font-sans">₹{(inst.principalAmount / 100000).toFixed(2)} Lakhs (₹10L Uninsured)</strong>
              </div>
              <div className="bg-white p-2.5 rounded border border-red-200">
                <span className="text-[10px] text-slate-500 block">Recommended Action:</span>
                <strong className="text-amber-800 font-sans">60-Day Replacement Directive</strong>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-600 text-[11px]">
                Under APH norms, deposits must be maintained in Scheduled Commercial Banks.
              </span>
              <button
                onClick={() => alert(`Issued 60-Day Replacement Directive to ${inst.institutionName}. Mandated migration to Tier-1 Scheduled Bank.`)}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Issue 60-Day Instrument Migration Directive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
