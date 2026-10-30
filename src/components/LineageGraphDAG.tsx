import React from 'react';
import { FinancialInstrument } from '../types/fdr';
import { GitBranch, CheckCircle2, Clock, ArrowDown, FileText, Shield } from 'lucide-react';

interface LineageGraphDAGProps {
  instrument: FinancialInstrument;
}

export const LineageGraphDAG: React.FC<LineageGraphDAGProps> = ({
  instrument
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-purple-950 text-white px-5 py-3.5 flex justify-between items-center border-b border-purple-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-800 text-purple-200 rounded-lg border border-purple-700">
            <GitBranch className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              FDR Directed Acyclic Graph (DAG) & Lifecycle Lineage Tree
              <span className="bg-purple-800 text-purple-200 text-[10px] font-mono px-2 py-0.5 rounded border border-purple-700">
                8-Year Continuous Chain
              </span>
            </h3>
            <p className="text-xs text-purple-200">
              Preserves parent-child replacement history, interest accumulation, and regulatory approvals without overwriting historical records
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-purple-300 bg-purple-900 px-3 py-1 rounded border border-purple-800">
          PID: {instrument.aictePermanentId}
        </div>
      </div>

      {/* DAG Interactive Tree Canvas */}
      <div className="p-8 bg-slate-50 flex flex-col items-center">
        {/* NODE 1: Historical Parent Instrument (2016) */}
        <div className="max-w-md w-full bg-white border-2 border-slate-300 rounded-xl p-4 shadow-sm relative text-xs">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Node 1: Original Joint FDR (2016 Cohort)
            </span>
            <span className="bg-slate-200 text-slate-700 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
              MATURED & RENEWED
            </span>
          </div>

          <div className="space-y-1 font-mono text-[11px] text-slate-600">
            <div>Instrument Ref: <strong className="text-slate-900">CNRB/CHE/2016/88104</strong></div>
            <div>Principal Amount: <strong className="text-slate-900">₹35,00,000 (35 Lakhs)</strong></div>
            <div>Validity Period: <strong>10-Jan-2016 to 10-Jan-2024 (8 Years)</strong></div>
            <div>Issuing Bank: Canara Bank, T. Nagar Branch</div>
            <div>Clearance Order: AICTE/SRO/FDR-REL/2016/881</div>
          </div>
        </div>

        {/* Directed Arrow Transition */}
        <div className="flex flex-col items-center my-3 text-purple-600">
          <div className="w-0.5 h-6 bg-purple-400"></div>
          <div className="bg-purple-100 text-purple-800 border border-purple-300 rounded-full px-3 py-0.5 text-[10px] font-bold font-mono my-1">
            Child Renewal Linked (parent_instrument_id: fdr-legacy-2016)
          </div>
          <ArrowDown className="w-5 h-5 text-purple-600 animate-bounce" />
        </div>

        {/* NODE 2: Current Renewed Instrument (2024) */}
        <div className="max-w-md w-full bg-emerald-50/70 border-2 border-emerald-400 rounded-xl p-4 shadow-md relative text-xs">
          <div className="flex justify-between items-center border-b border-emerald-200 pb-2 mb-2">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Node 2: Renewed Replacement FDR (Active 2024-2034)
            </span>
            <span className="bg-emerald-600 text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold">
              ACTIVE & BANK_CONFIRMED
            </span>
          </div>

          <div className="space-y-1 font-mono text-[11px] text-slate-700">
            <div>Instrument Ref: <strong className="text-slate-900">{instrument.fdrNumber}</strong></div>
            <div>Principal Amount: <strong className="text-slate-900">₹{(instrument.principalAmount / 100000).toFixed(2)} Lakhs</strong></div>
            <div>Maturity Amount: <strong className="text-emerald-800 font-bold">₹{(instrument.maturityAmount / 100000).toFixed(2)} Lakhs</strong> (at 7.4% p.a.)</div>
            <div>Validity Period: <strong>{instrument.issueDate} to {instrument.maturityDate} (10 Years)</strong></div>
            <div>Joint Holder: Member Secretary, AICTE (Verified ✅)</div>
          </div>
        </div>
      </div>

      {/* DAG Integrity Guarantee Footer */}
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-purple-700" />
          <span>Immutable Historical Lineage: 100% of historical interest calculations and officer sign-offs are archived.</span>
        </div>
        <span className="font-mono text-purple-800 font-bold text-[11px]">
          Lineage Chain Depth: 2 Generations
        </span>
      </div>
    </div>
  );
};
