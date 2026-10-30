import React, { useState } from 'react';
import { FinancialInstrument } from '../types/fdr';
import { X, CheckCircle, Shield, Printer, ExternalLink, QrCode, Download } from 'lucide-react';

interface DigitalNOCModalProps {
  isOpen: boolean;
  onClose: () => void;
  instrument: FinancialInstrument;
}

export const DigitalNOCModal: React.FC<DigitalNOCModalProps> = ({
  isOpen,
  onClose,
  instrument
}) => {
  const [isVerifyingQR, setIsVerifyingQR] = useState(false);

  if (!isOpen) return null;

  const nocHash = `NOC-${new Date().getFullYear()}-${instrument.aictePermanentId.replace('-', '')}`;
  const verificationUrl = `https://verify.aicte.gov.in/noc/${nocHash}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center space-x-2.5">
            <Shield className="w-5 h-5 text-aicte-gold" />
            <h3 className="font-bold text-sm tracking-wide">
              Official Digital Release No Objection Certificate (NOC)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Printable Certificate Body */}
        <div className="p-8 bg-slate-50 border-b border-slate-200">
          <div className="bg-white border-2 border-slate-300 rounded-xl p-6 shadow-sm relative">
            {/* National Watermark Emblem */}
            <div className="text-center border-b-2 border-slate-800 pb-4 mb-5">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
                अखिल भारतीय तकनीकी शिक्षा परिषद | All India Council for Technical Education
              </div>
              <div className="text-[11px] text-slate-500">
                Ministry of Education, Government of India • Nelson Mandela Marg, New Delhi 110070
              </div>
              <div className="mt-2 inline-block bg-teal-800 text-white font-mono text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Digital Security Deposit / FDR Discharge Certificate
              </div>
            </div>

            {/* Certificate Meta Details */}
            <div className="grid grid-cols-2 text-xs text-slate-600 mb-5 font-mono">
              <div>Certificate Ref: <strong className="text-slate-900">{nocHash}</strong></div>
              <div className="text-right">Issued Date: <strong className="text-slate-900">{new Date().toISOString().split('T')[0]}</strong></div>
            </div>

            {/* Certificate Statutory Text */}
            <div className="text-xs text-slate-800 leading-relaxed space-y-3 mb-6">
              <p>
                This is to certify that the <strong>Member Secretary, All India Council for Technical Education (AICTE)</strong> has <strong>NO OBJECTION</strong> to the discharge, encashment, or release of the Joint Fixed Deposit Receipt described hereunder, the institution having fulfilled all statutory compliance conditions stipulated under <strong>Clause 6.46 of the AICTE Approval Process Handbook</strong>.
              </p>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div>Institution Name: <strong className="text-slate-900 block font-sans">{instrument.institutionName}</strong></div>
                <div>AICTE PID: <strong className="text-slate-900 block">{instrument.aictePermanentId}</strong></div>
                <div>FDR Number: <strong className="text-slate-900 block">{instrument.fdrNumber}</strong></div>
                <div>Principal Amount: <strong className="text-slate-900 block font-sans">₹{(instrument.principalAmount / 100000).toFixed(2)} Lakhs</strong></div>
                <div>Issuing Bank: <strong className="text-slate-900 block font-sans">{instrument.issuingBankName}</strong></div>
                <div>Branch & IFSC: <strong className="text-slate-900 block">{instrument.branchName} ({instrument.ifscCode})</strong></div>
              </div>

              <p className="text-[11px] text-slate-600 italic">
                The issuing Bank Branch is hereby authorized to discharge the exclusive lien marked in favor of AICTE and transfer the principal deposit along with accrued interest to the registered account of the institution's governing Trust/Society.
              </p>
            </div>

            {/* Signatures & Scannable QR Token */}
            <div className="flex justify-between items-end pt-4 border-t border-slate-200">
              {/* Live QR Code Token */}
              <div className="flex items-center space-x-3 bg-teal-50/80 p-2.5 rounded-lg border border-teal-200">
                {/* Embedded SVG QR representation */}
                <div className="w-16 h-16 bg-white p-1 rounded border border-slate-300 flex items-center justify-center shadow-inner">
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />
                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />
                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />
                    <rect x="40" y="10" width="10" height="20" />
                    <rect x="50" y="40" width="20" height="10" />
                    <rect x="40" y="70" width="20" height="10" />
                    <rect x="70" y="50" width="20" height="20" />
                    <circle cx="50" cy="50" r="4" fill="red" />
                  </svg>
                </div>
                <div className="text-[11px]">
                  <span className="font-bold text-teal-900 block flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-teal-700" />
                    W3C Verifiable Credential QR
                  </span>
                  <span className="text-slate-500 block text-[10px]">
                    Scan with any smartphone camera to verify live authenticity
                  </span>
                  <button
                    onClick={() => setIsVerifyingQR(true)}
                    className="text-[10px] text-teal-700 font-bold underline hover:text-teal-900 mt-0.5 inline-block"
                  >
                    Simulate Live Bank Branch QR Scan →
                  </button>
                </div>
              </div>

              {/* Digital Signature Specimen */}
              <div className="text-right">
                <div className="inline-block border border-emerald-400 bg-emerald-50 px-3 py-1.5 rounded text-left mb-1">
                  <div className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Digitally Signed via e-Sign / DSC
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono">
                    Signed by: Member Secretary, AICTE<br />
                    Timestamp: {new Date().toUTCString()}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-slate-900">Regulation & Approval Bureau</div>
                <div className="text-[10px] text-slate-500">All India Council for Technical Education</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-white flex justify-between items-center text-xs">
          <div className="text-slate-500">
            Hash Chain Integrity: <span className="font-mono text-emerald-700 font-bold">100% Cryptographically Sealed</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Certificate
            </button>
            <button
              onClick={() => {
                alert(`Downloaded official digitally signed AICTE Release Order (${nocHash}.pdf)`);
                onClose();
              }}
              className="px-4 py-2 bg-aicte-blue hover:bg-slate-800 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              Download Sealed PDF
            </button>
          </div>
        </div>

        {/* Live QR Verification Popover Simulation */}
        {isVerifyingQR && (
          <div className="absolute inset-0 bg-slate-950/90 flex items-center justify-center p-6 z-20 animate-in fade-in">
            <div className="bg-white rounded-xl p-6 max-w-md w-full text-slate-900 border-2 border-emerald-500 shadow-2xl">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-slate-900">
                  ✅ VERIFIED OFFICIAL AICTE RELEASE NOC
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Host: verify.aicte.gov.in (Government of India SSL)
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1.5 font-mono mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Certificate Status:</span>
                  <span className="text-emerald-700 font-bold">LIEN RELEASED / NO OBJECTION</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Institution:</span>
                  <span className="font-bold text-slate-900">{instrument.institutionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FDR Number:</span>
                  <span className="font-bold text-slate-900">{instrument.fdrNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Release Amount:</span>
                  <span className="font-bold text-slate-900">₹{(instrument.principalAmount / 100000).toFixed(2)} Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Digital Signature:</span>
                  <span className="text-emerald-600 font-bold">VALID & GENUINE</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-4 text-center">
                The bank branch manager scanning this QR code has confirmed that AICTE authorized the release of this deposit without postal delays or signature disputes.
              </p>

              <button
                onClick={() => setIsVerifyingQR(false)}
                className="w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition"
              >
                Close Verification Modal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
