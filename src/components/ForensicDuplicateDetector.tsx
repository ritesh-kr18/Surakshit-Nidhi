import React from 'react';
import { FinancialInstrument } from '../types/fdr';
import { ShieldAlert, Fingerprint, Copy, AlertOctagon, ArrowRight, Eye } from 'lucide-react';

interface ForensicDuplicateDetectorProps {
  instrument: FinancialInstrument;
}

export const ForensicDuplicateDetector: React.FC<ForensicDuplicateDetectorProps> = ({
  instrument
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-red-200 overflow-hidden">
      {/* Header */}
      <div className="bg-red-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-red-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-800 text-red-200 rounded-lg border border-red-700">
            <ShieldAlert className="w-5 h-5 text-red-300" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              🚨 Perceptual Hash (pHash) Cross-Institute Fraud Detection
              <span className="bg-red-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                Critical Duplicate Alert
              </span>
            </h3>
            <p className="text-xs text-red-200">
              Identical physical certificate scan detected across two separate institutions owned by the same Trust
            </p>
          </div>
        </div>

        <div className="text-xs font-mono bg-red-950 px-3 py-1 rounded text-red-300 border border-red-800">
          pHash: {instrument.imagePhash}
        </div>
      </div>

      {/* Side-by-Side Comparison of Collusive Certificates */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Certificate 1: Current Application */}
          <div className="border-2 border-red-300 bg-red-50/40 rounded-xl p-4 text-xs">
            <div className="flex justify-between items-center border-b border-red-200 pb-2 mb-3">
              <span className="font-bold text-red-900">Certificate A (Current Upload)</span>
              <span className="font-mono text-[11px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">
                PID: {instrument.aictePermanentId}
              </span>
            </div>

            <div className="bg-white border border-slate-200 p-3 rounded-lg mb-3 shadow-inner">
              <div className="text-center border-b border-slate-200 pb-2 mb-2 font-serif text-slate-800">
                <div className="font-bold text-xs uppercase text-aicte-blue">{instrument.issuingBankName}</div>
                <div className="text-[10px] text-slate-500 font-sans">{instrument.branchName}</div>
              </div>
              <div className="font-mono text-[10px] space-y-1 text-slate-700">
                <div>FDR No: <strong>{instrument.fdrNumber}</strong></div>
                <div>Institution: <strong>{instrument.institutionName}</strong></div>
                <div>Principal: <strong>₹{(instrument.principalAmount / 100000).toFixed(2)} Lakhs</strong></div>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 font-mono space-y-1">
              <div>SHA-256: <span className="text-slate-800">{instrument.fileHashSha256.substring(0, 24)}...</span></div>
              <div>Perceptual pHash: <strong className="text-red-700 font-bold">{instrument.imagePhash}</strong></div>
              <div>Upload Timestamp: {instrument.submittedAt}</div>
            </div>
          </div>

          {/* Certificate 2: Collusive Sibling College */}
          <div className="border-2 border-red-300 bg-red-50/40 rounded-xl p-4 text-xs">
            <div className="flex justify-between items-center border-b border-red-200 pb-2 mb-3">
              <span className="font-bold text-red-900">Certificate B (Previously Submitted)</span>
              <span className="font-mono text-[11px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">
                PID: 1-88412999
              </span>
            </div>

            <div className="bg-white border border-slate-200 p-3 rounded-lg mb-3 shadow-inner">
              <div className="text-center border-b border-slate-200 pb-2 mb-2 font-serif text-slate-800">
                <div className="font-bold text-xs uppercase text-aicte-blue">Bank of Baroda</div>
                <div className="text-[10px] text-slate-500 font-sans">Park Street, Kolkata</div>
              </div>
              <div className="font-mono text-[10px] space-y-1 text-slate-700">
                <div>FDR No: <strong>BOB/KOL/2023/11299</strong></div>
                <div>Institution: <strong>Aurobindo Polytechnic College</strong></div>
                <div>Principal: <strong>₹35.00 Lakhs</strong></div>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 font-mono space-y-1">
              <div>SHA-256: <span className="text-slate-800">deadbeef1234567890abcdef...</span></div>
              <div>Perceptual pHash: <strong className="text-red-700 font-bold">{instrument.imagePhash}</strong> (MATCH)</div>
              <div>Submitted Under: Sri Aurobindo Charitable Foundation</div>
            </div>
          </div>
        </div>

        {/* Forensic Verdict Box */}
        <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-xs text-red-900 mb-4">
          <div className="font-bold text-sm mb-1 flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-red-700" />
            Forensic Cross-Check Finding: Identical Document Reused Across Multiple Approvals
          </div>
          <p className="text-[11px] text-red-800 leading-relaxed">
            The trust attempted to satisfy statutory corpus requirements for two separate institutions using the same ₹35 Lakh Fixed Deposit. While the file was renamed and slightly contrast-adjusted, the perceptual visual fingerprint (pHash Hamming distance = 0) confirmed the exact same physical certificate.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500 font-mono">Action Trigger: Automatic Route to Chief Vigilance Officer</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => alert("Investigation dossier dispatched to AICTE Chief Vigilance Officer & Regional Director.")}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg transition shadow"
            >
              Dispatch to Vigilance Cell for CBI Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
