import React, { useState } from 'react';
import { FinancialInstrument, UserRole } from '../types/fdr';
import { AlertTriangle, CheckCircle, Eye, ShieldAlert, FileText, Landmark, RefreshCw, ZoomIn, ZoomOut, UploadCloud, Send } from 'lucide-react';

interface SplitScreenOCRViewerProps {
  instrument: FinancialInstrument;
  onResolveDiscrepancy: (id: string) => void;
  currentRole?: UserRole;
}

export const SplitScreenOCRViewer: React.FC<SplitScreenOCRViewerProps> = ({
  instrument,
  onResolveDiscrepancy,
  currentRole = 'SCRUTINY_OFFICER'
}) => {
  const [activeHoverField, setActiveHoverField] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Dynamic calculations based on selected instrument
  const requiredAmount = instrument.statutoryRequiredDeposit * 100000;
  const deficit = Math.max(0, requiredAmount - instrument.principalAmount);
  const hasAmountMismatch = deficit > 0;
  const hasJointHolderMismatch = !instrument.jointHolderAICTE;
  const mismatchesCount = (hasAmountMismatch ? 1 : 0) + (hasJointHolderMismatch ? 1 : 0) + (instrument.discrepancies.length > 0 ? 1 : 0);
  const landTenureMultiplier = instrument.landTenure === 'LEASED' ? 2.0 : (instrument.category === 'MINORITY' || instrument.category === 'WOMEN' ? 0.5 : 1.0);
  const baseRateLakhs = (instrument.statutoryRequiredDeposit / landTenureMultiplier);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white px-5 py-3 flex flex-wrap justify-between items-center gap-3 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Split-Screen AI Document Intelligence & Discrepancy Overlay
              {mismatchesCount > 0 ? (
                <span className="bg-red-500/20 text-red-300 text-[11px] font-mono px-2 py-0.5 rounded border border-red-500/30 font-semibold">
                  {mismatchesCount} Mismatches Detected
                </span>
              ) : (
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
                  All OCR Fields Verified (PASS)
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-300">
              Live OCR Layout Analysis vs. Form Data for <strong>{instrument.institutionName}</strong> (PID: {instrument.aictePermanentId})
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
            <span className="text-slate-400">Scale:</span>
            <button 
              onClick={() => setZoomLevel(Math.max(85, zoomLevel - 5))} 
              className="hover:text-white p-0.5"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-amber-300 font-bold px-1">{zoomLevel}%</span>
            <button 
              onClick={() => setZoomLevel(Math.min(115, zoomLevel + 5))} 
              className="hover:text-white p-0.5"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-emerald-400 font-semibold hidden sm:flex items-center">
            <CheckCircle className="w-3.5 h-3.5 mr-1" /> PaddleOCR Pipeline Active
          </span>
        </div>
      </div>

      {/* Split-Screen Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* LEFT PANE: Rendered Bank FDR Certificate with Native In-Flow Bounding Boxes */}
        <div className="lg:col-span-6 p-4 sm:p-5 bg-slate-100/90 border-r border-slate-200 overflow-y-auto flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-3 text-xs text-slate-500 font-medium">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-aicte-blue" />
              Uploaded Instrument Certificate Scan (PNG/PDF)
            </span>
            <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
              SHA-256: {instrument.fileHashSha256.substring(0, 16)}...
            </span>
          </div>

          {/* Authentic Bank Certificate Card Container */}
          <div 
            className="w-full bg-[#fdfbf7] border-2 border-amber-300/80 rounded-xl p-5 sm:p-6 shadow-sm transition-all select-none font-serif text-slate-800 space-y-4"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Bank Header Watermark */}
            <div className="text-center border-b-2 border-slate-300 pb-3">
              <div className="flex justify-center items-center gap-2 mb-1">
                <Landmark className="w-6 h-6 text-aicte-blue" />
                <h4 className="text-lg font-bold uppercase tracking-wider text-aicte-blue font-sans">
                  {instrument.issuingBankName}
                </h4>
              </div>
              <p className="text-[11px] font-sans text-slate-600 font-medium">
                {instrument.branchName} • IFSC: {instrument.ifscCode}
              </p>
              <div className="inline-block bg-aicte-blue text-white font-sans text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest mt-1 shadow-sm">
                Fixed Deposit Receipt (Pledged to AICTE)
              </div>
            </div>

            {/* Bounding Box 1: FDR Reference No & Date (Green Match) */}
            <div 
              onMouseEnter={() => setActiveHoverField('fdrNo')}
              onMouseLeave={() => setActiveHoverField(null)}
              className={`relative rounded-lg p-3 transition-all cursor-pointer border-2 ${
                activeHoverField === 'fdrNo'
                  ? 'border-emerald-600 bg-emerald-500/20 ring-4 ring-emerald-400/40'
                  : 'border-emerald-500 bg-emerald-500/10'
              }`}
            >
              <span className="absolute -top-2.5 left-2 bg-emerald-700 text-white font-sans text-[10px] font-bold px-2 py-0.2 rounded shadow-sm">
                ✅ OCR MATCH: Valid Reference & IFSC
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-sans">FDR Certificate No:</span>
                  <span className="font-bold text-slate-900">{instrument.fdrNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-sans">Maturity Horizon:</span>
                  <span className="font-bold text-slate-900">{instrument.issueDate} to {instrument.maturityDate}</span>
                </div>
              </div>
            </div>

            {/* Bounding Box 2: Joint Holder Name (Dynamic Match or Mismatch) */}
            {hasJointHolderMismatch ? (
              <div 
                onMouseEnter={() => setActiveHoverField('jointHolder')}
                onMouseLeave={() => setActiveHoverField(null)}
                className={`relative rounded-lg p-3 transition-all cursor-pointer border-2 ${
                  activeHoverField === 'jointHolder'
                    ? 'border-red-600 bg-red-500/25 ring-4 ring-red-400/40 scale-[1.01]'
                    : 'border-red-500 bg-red-500/15 animate-pulse-glow'
                }`}
              >
                <span className="absolute -top-2.5 left-2 bg-red-600 text-white font-sans text-[10px] font-bold px-2 py-0.2 rounded shadow-sm">
                  ❌ OCR MISMATCH: Missing "Member Secretary, AICTE"
                </span>
                <div className="text-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans font-semibold mb-1">
                    Account Holders / Joint Beneficiary in Receipt:
                  </span>
                  <p className="font-bold text-slate-900">
                    1. {instrument.trustName}
                  </p>
                  <p className="font-medium text-red-700 font-sans text-[11px] italic mt-0.5">
                    ⚠️ [Name of Member Secretary, AICTE is missing as joint holder on this certificate]
                  </p>
                </div>
              </div>
            ) : (
              <div 
                onMouseEnter={() => setActiveHoverField('jointHolder')}
                onMouseLeave={() => setActiveHoverField(null)}
                className={`relative rounded-lg p-3 transition-all cursor-pointer border-2 ${
                  activeHoverField === 'jointHolder'
                    ? 'border-emerald-600 bg-emerald-500/20 ring-4 ring-emerald-400/40'
                    : 'border-emerald-500 bg-emerald-500/10'
                }`}
              >
                <span className="absolute -top-2.5 left-2 bg-emerald-700 text-white font-sans text-[10px] font-bold px-2 py-0.2 rounded shadow-sm">
                  ✅ OCR MATCH: Joint Holder Clause Verified
                </span>
                <div className="text-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans font-semibold mb-1">
                    Account Holders / Joint Beneficiary in Receipt:
                  </span>
                  <p className="font-bold text-slate-900">
                    1. {instrument.trustName}
                  </p>
                  <p className="font-semibold text-emerald-800 font-sans text-[11px] mt-0.5">
                    2. Member Secretary, All India Council for Technical Education (AICTE)
                  </p>
                </div>
              </div>
            )}

            {/* Bounding Box 3: Deposit Amount (Dynamic Match or Shortage) */}
            {hasAmountMismatch ? (
              <div 
                onMouseEnter={() => setActiveHoverField('amount')}
                onMouseLeave={() => setActiveHoverField(null)}
                className={`relative rounded-lg p-3 transition-all cursor-pointer border-2 ${
                  activeHoverField === 'amount'
                    ? 'border-red-600 bg-red-500/25 ring-4 ring-red-400/40 scale-[1.01]'
                    : 'border-red-500 bg-red-500/15 animate-pulse-glow'
                }`}
              >
                <span className="absolute -top-2.5 left-2 bg-red-600 text-white font-sans text-[10px] font-bold px-2 py-0.2 rounded shadow-sm">
                  ⚠️ STATUTORY SHORTAGE: ₹{(instrument.principalAmount / 100000).toFixed(2)}L vs ₹{instrument.statutoryRequiredDeposit}L Required
                </span>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-500 uppercase font-sans font-semibold">Deposit Principal Amount:</span>
                  <span className="font-bold text-base text-red-700 font-sans">
                    ₹{(instrument.principalAmount / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  In Words: {instrument.principalAmountWords}
                </p>
                <div className="mt-2 text-[11px] text-slate-600 flex justify-between border-t border-slate-200/80 pt-1.5 font-sans">
                  <span>Interest: <strong>{instrument.interestRate}% p.a.</strong></span>
                  <span>Lock-in Tenure: <strong>{instrument.lockInTenureYears} Years</strong></span>
                </div>
              </div>
            ) : (
              <div 
                onMouseEnter={() => setActiveHoverField('amount')}
                onMouseLeave={() => setActiveHoverField(null)}
                className={`relative rounded-lg p-3 transition-all cursor-pointer border-2 ${
                  activeHoverField === 'amount'
                    ? 'border-emerald-600 bg-emerald-500/20 ring-4 ring-emerald-400/40'
                    : 'border-emerald-500 bg-emerald-500/10'
                }`}
              >
                <span className="absolute -top-2.5 left-2 bg-emerald-700 text-white font-sans text-[10px] font-bold px-2 py-0.2 rounded shadow-sm">
                  ✅ OCR MATCH: Statutory Deposit Satisfied
                </span>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-500 uppercase font-sans font-semibold">Deposit Principal Amount:</span>
                  <span className="font-bold text-base text-slate-950 font-sans">
                    ₹{(instrument.principalAmount / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  In Words: {instrument.principalAmountWords}
                </p>
                <div className="mt-2 text-[11px] text-slate-600 flex justify-between border-t border-slate-200/80 pt-1.5 font-sans">
                  <span>Interest: <strong>{instrument.interestRate}% p.a.</strong></span>
                  <span>Lock-in Tenure: <strong>{instrument.lockInTenureYears} Years</strong></span>
                </div>
              </div>
            )}

            {/* Rubber Stamp & Lien Marking */}
            <div className="flex justify-between items-end pt-2">
              <div className="border-2 border-dashed border-red-500 p-2 text-center rounded rotate-[-1deg] bg-red-50/60">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-tighter block font-sans">
                  LIEN MARKED EXCLUSIVELY
                </span>
                <span className="text-[9px] text-red-600 font-sans">TO MEMBER SECRETARY, AICTE</span>
              </div>
              <div className="text-right text-[11px] font-sans text-slate-500">
                <div className="w-24 border-b border-slate-400 mb-1 ml-auto"></div>
                <span>Authorized Branch Signatory</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Comparison Table & APH Clause 1.4 Calculator */}
        <div className="lg:col-span-6 p-5 flex flex-col justify-between bg-white overflow-y-auto">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-aicte-blue" />
                  Structured Scrutiny & Field Comparison Table
                </h4>
                <p className="text-xs text-slate-500">
                  Real-time validation against AICTE APH 2024-27 & 2026-27 Addendum
                </p>
              </div>
              <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2.5 py-1 rounded-md border border-amber-300">
                Urgency Score: {instrument.urgencyScore}/100
              </span>
            </div>

            {/* APH Clause 1.4 Regulatory Formula Calculation Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-4 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-aicte-gold" />
                  APH Clause 1.4 Deposit Rule Engine:
                </span>
                {deficit > 0 ? (
                  <span className="bg-red-100 text-red-800 font-mono font-bold px-2 py-0.5 rounded text-[11px] border border-red-200">
                    DEFICIT: ₹{deficit.toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                    COMPLIANT (100% SATISFIED)
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>Program: <strong className="text-slate-900">{instrument.programType} ({instrument.degreeLevel})</strong></div>
                <div>Land Tenure: <strong className={instrument.landTenure === 'LEASED' ? 'text-red-700' : 'text-slate-900'}>{instrument.landTenure} ({instrument.landTenure === 'LEASED' ? 'Private Leased' : 'Institute Owned'})</strong></div>
                <div>Base Rate: <strong className="text-slate-900">₹{baseRateLakhs.toFixed(1)} Lakhs</strong></div>
                <div>Tenure Multiplier: <strong className={instrument.landTenure === 'LEASED' ? 'text-red-700 font-mono' : 'text-slate-900 font-mono'}>{landTenureMultiplier.toFixed(1)}x {instrument.landTenure === 'LEASED' ? '(DOUBLE Required)' : '(Standard)'}</strong></div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-200 text-slate-700 flex justify-between items-center">
                <span>Statutory Required Deposit:</span>
                <span className="text-sm font-extrabold text-slate-950 font-mono">
                  ₹{instrument.statutoryRequiredDeposit}.00 Lakhs (₹{requiredAmount.toLocaleString('en-IN')})
                </span>
              </div>
            </div>

            {/* Field-by-Field Discrepancy Breakdown */}
            <div className="space-y-3 mb-4">
              {/* Field 1: Deposit Principal Amount */}
              <div 
                onMouseEnter={() => setActiveHoverField('amount')}
                onMouseLeave={() => setActiveHoverField(null)}
                className={`p-3 rounded-lg border transition ${
                  hasAmountMismatch 
                    ? (activeHoverField === 'amount' ? 'bg-red-50 border-red-300 ring-2 ring-red-300' : 'bg-red-50/50 border-red-200')
                    : 'bg-emerald-50/40 border-emerald-200'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-bold text-xs flex items-center gap-1 ${hasAmountMismatch ? 'text-red-900' : 'text-emerald-900'}`}>
                    {hasAmountMismatch ? <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> : <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                    Deposit Principal Amount:
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${hasAmountMismatch ? 'bg-red-200 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {hasAmountMismatch ? 'Critical Shortfall' : 'Statutory Amount Verified'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Deposit Submitted:</span>
                    <span className="font-mono font-semibold text-slate-800">₹{(instrument.principalAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Statutory Required:</span>
                    <span className={`font-mono font-semibold ${hasAmountMismatch ? 'text-red-700' : 'text-slate-800'}`}>₹{requiredAmount.toLocaleString('en-IN')} {hasAmountMismatch && `(Short by ₹${deficit.toLocaleString('en-IN')})`}</span>
                  </div>
                </div>
                {hasAmountMismatch && (
                  <p className="text-[11px] text-red-700 mt-1.5 bg-red-100/60 p-1.5 rounded leading-relaxed">
                    ⚠️ Error: Under APH Clause 1.4, colleges on leased premises must submit 2.0x standard deposit. Deficit of ₹{deficit.toLocaleString('en-IN')} must be remitted.
                  </p>
                )}
              </div>

              {/* Field 2: Joint Holder Name */}
              <div 
                onMouseEnter={() => setActiveHoverField('jointHolder')}
                onMouseLeave={() => setActiveHoverField(null)}
                className={`p-3 rounded-lg border transition ${
                  hasJointHolderMismatch 
                    ? (activeHoverField === 'jointHolder' ? 'bg-red-50 border-red-300 ring-2 ring-red-300' : 'bg-red-50/50 border-red-200')
                    : 'bg-emerald-50/40 border-emerald-200'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-bold text-xs flex items-center gap-1 ${hasJointHolderMismatch ? 'text-red-900' : 'text-emerald-900'}`}>
                    {hasJointHolderMismatch ? <ShieldAlert className="w-3.5 h-3.5 text-red-600" /> : <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                    Joint Account Holder Clause:
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${hasJointHolderMismatch ? 'bg-red-200 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {hasJointHolderMismatch ? 'Mandatory Omission' : 'Joint Holding PASS'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Institution Form Entry:</span>
                    <span className="font-semibold text-slate-800">Trustee & Member Secretary, AICTE</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">OCR Scan Extracted:</span>
                    <span className={`font-semibold ${hasJointHolderMismatch ? 'text-red-700' : 'text-emerald-800'}`}>
                      {hasJointHolderMismatch ? `"${instrument.trustName}" only` : 'Trustee AND Member Secretary, AICTE'}
                    </span>
                  </div>
                </div>
                {hasJointHolderMismatch && (
                  <p className="text-[11px] text-red-700 mt-1.5 bg-red-100/60 p-1.5 rounded leading-relaxed">
                    ⚠️ Error: Fixed Deposit Receipt must be opened in the joint name of the Trust AND Member Secretary, AICTE.
                  </p>
                )}
              </div>

              {/* Field 3: Bank & IFSC (Passed) */}
              <div 
                onMouseEnter={() => setActiveHoverField('fdrNo')}
                onMouseLeave={() => setActiveHoverField(null)}
                className="p-2.5 rounded-lg border bg-emerald-50/40 border-emerald-200 text-xs flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-bold text-slate-900">Bank & IFSC: </span>
                    <span className="text-slate-700">{instrument.issuingBankName} ({instrument.ifscCode})</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Scheduled Bank PASS
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer for Role */}
          <div className="border-t border-slate-200 pt-3.5 flex flex-wrap items-center justify-between gap-3">
            {currentRole === 'INSTITUTION' ? (
              <>
                <div className="text-xs text-slate-600">
                  Institution Mandate: <strong className={hasAmountMismatch ? 'text-red-700' : 'text-emerald-700'}>
                    {hasAmountMismatch ? `Submit Supplementary ₹${deficit.toLocaleString('en-IN')} FDR (APH Clause 1.4)` : 'All Compliance Requirements Satisfied'}
                  </strong>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => alert("Supplementary FDR certificate upload dialog opened. Select PDF/PNG to submit.")}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    Upload Supplementary FDR Scan
                  </button>
                  
                  <button 
                    onClick={() => alert("Compliance response submitted to Scrutiny Officer Dr. R. K. Sharma for re-verification.")}
                    className="px-3.5 py-2 bg-aicte-blue hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Compliance Response
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-xs text-slate-500">
                  Assigned Dealing Officer: <strong className="text-slate-800">Dr. R. K. Sharma (Section 4)</strong>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => onResolveDiscrepancy(instrument.id)}
                    className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Issue Show-Cause Notice
                  </button>
                  
                  <button 
                    onClick={() => alert("Verification request dispatched to issuing Bank Branch Manager via RBI IFSC Directory bridge.")}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Query Branch Manager
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
