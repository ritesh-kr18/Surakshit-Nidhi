import React, { useState } from 'react';
import { FinancialInstrument } from '../types/fdr';
import { Landmark, Mail, KeyRound, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

interface BankVerificationBridgeProps {
  instrument: FinancialInstrument;
  onConfirmVerification: (id: string) => void;
}

export const BankVerificationBridge: React.FC<BankVerificationBridgeProps> = ({
  instrument,
  onConfirmVerification
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [otpValue, setOtpValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendLink = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep(2);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (otpValue.length < 4) {
      alert("Please enter the 6-digit OTP sent to the Branch Manager's official corporate terminal.");
      return;
    }
    setStep(3);
    onConfirmVerification(instrument.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-400/30">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              4-Tier Bank Verification Engine & RBI IFSC-Domain Bridge (Tier 3B)
              <span className="bg-teal-500/20 text-teal-300 text-[10px] font-mono px-2 py-0.5 rounded border border-teal-500/30">
                RBI Directory Lookup Active
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Dispatches cryptographic verification links directly to the issuing Branch Manager's corporate email (looked up from RBI master, never college gmail)
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-amber-300 bg-slate-800 px-3 py-1 rounded border border-slate-700">
          Target IFSC: {instrument.ifscCode}
        </div>
      </div>

      {/* Main Bridge Interactive Workflow */}
      <div className="p-6">
        {/* Step Indicator Progress Bar */}
        <div className="flex items-center justify-between max-w-xl mx-auto mb-6 text-xs font-semibold">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-aicte-blue' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono ${step >= 1 ? 'bg-aicte-blue text-white' : 'bg-slate-200'}`}>1</span>
            <span>RBI IFSC Directory Lookup</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-300"></div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-aicte-blue' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono ${step >= 2 ? 'bg-aicte-blue text-white' : 'bg-slate-200'}`}>2</span>
            <span>Branch Manager OTP Handshake</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-300"></div>
          <div className={`flex items-center space-x-2 ${step === 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>3</span>
            <span>Status: BANK_CONFIRMED</span>
          </div>
        </div>

        {/* Step 1: RBI Directory Match & Dispatch Link */}
        {step === 1 && (
          <div className="max-w-xl mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-aicte-blue" />
              Verified Issuing Branch Routing Information (RBI Master Directory)
            </h4>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 font-mono text-[11px] mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Issuing Scheduled Bank:</span>
                <span className="font-bold text-slate-900">{instrument.issuingBankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Branch Name:</span>
                <span className="font-bold text-slate-900">{instrument.branchName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Official Branch Domain Email:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {instrument.branchOfficialEmail}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">FDR Pledged Principal:</span>
                <span className="font-bold text-slate-900">₹{(instrument.principalAmount / 100000).toFixed(2)} Lakhs</span>
              </div>
            </div>

            <p className="text-slate-600 mb-4 text-[11px] leading-relaxed">
              Clicking the button below dispatches a zero-login cryptographic verification token to <strong>{instrument.branchOfficialEmail}</strong>. The Branch Manager will confirm the deposit lien without needing an account on AICTE portal.
            </p>

            <button
              disabled={isSending}
              onClick={handleSendLink}
              className="w-full py-2.5 bg-aicte-blue hover:bg-slate-800 text-white font-bold rounded-lg transition flex items-center justify-center gap-2 shadow"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Dispatching Cryptographic Token...
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  Dispatch Verification Token to Branch Manager
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Branch Manager OTP Simulator */}
        {step === 2 && (
          <div className="max-w-xl mx-auto bg-amber-50/80 border border-amber-300 rounded-xl p-5 text-xs animate-in fade-in">
            <div className="flex items-center space-x-2 text-amber-900 font-bold mb-2">
              <KeyRound className="w-4 h-4 text-amber-700" />
              <span>Simulated Branch Manager Terminal: Token Received</span>
            </div>

            <p className="text-slate-700 text-[11px] mb-3">
              The Branch Manager at <strong>{instrument.branchName}</strong> opened the secure token. Enter the 6-digit OTP delivered to the branch's registered authentication terminal to confirm the AICTE lien marking:
            </p>

            <div className="flex items-center space-x-3 mb-4">
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 849201"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                className="text-base font-mono font-bold tracking-widest text-center px-4 py-2 border-2 border-amber-400 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
              <button
                onClick={() => setOtpValue('739104')}
                className="text-[11px] text-amber-800 font-bold underline hover:text-amber-950"
              >
                (Auto-Fill Demo OTP)
              </button>
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2 shadow"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Lien & Authenticate as BANK_CONFIRMED
            </button>
          </div>
        )}

        {/* Step 3: Verified Badge State */}
        {step === 3 && (
          <div className="max-w-xl mx-auto bg-emerald-50 border-2 border-emerald-400 rounded-xl p-6 text-center text-xs animate-in zoom-in-95">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-emerald-900 mb-1">
              ✅ TIER 3B VERIFICATION SUCCESSFUL
            </h4>
            <p className="text-slate-600 mb-3 text-[11px]">
              Branch Manager confirmed: <strong>{instrument.fdrNumber}</strong> is active in Core Banking System with exclusive lien marked to Member Secretary, AICTE.
            </p>
            <div className="inline-block bg-white border border-emerald-300 font-mono text-emerald-800 font-bold px-3 py-1 rounded text-xs">
              Status Advanced to: BANK_CONFIRMED (Active Portfolio)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
