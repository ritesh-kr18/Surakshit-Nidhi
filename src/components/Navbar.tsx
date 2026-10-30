import React from 'react';
import { UserRole } from '../types/fdr';
import { Shield, Scale, Globe, User, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  lang: 'EN' | 'HI';
  onLangChange: (lang: 'EN' | 'HI') => void;
  onOpenLegalDossier: () => void;
  onOpenCopilot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  lang,
  onLangChange,
  onOpenLegalDossier,
  onOpenCopilot
}) => {
  return (
    <header className="bg-aicte-blue text-white shadow-md border-b-4 border-aicte-gold">
      {/* Top Micro-Bar for Government of India */}
      <div className="bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 text-xs flex flex-wrap justify-between items-center gap-2 text-slate-300">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-aicte-gold">भारत सरकार | Government of India</span>
            <span className="text-slate-500">•</span>
            <span>शिक्षा मंत्रालय | Ministry of Education</span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onLangChange(lang === 'EN' ? 'HI' : 'EN')}
              className="flex items-center space-x-1.5 hover:text-white transition px-2 py-0.5 rounded bg-white/5 hover:bg-white/10"
            >
              <Globe className="w-3.5 h-3.5 text-aicte-gold" />
              <span className="font-medium text-[11px]">{lang === 'EN' ? 'हिन्दी (Hindi)' : 'English'}</span>
            </button>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-mono text-[11px] flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-1.5 animate-pulse"></span>
              GIGW 3.0 / CERT-In Certified
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3.5 w-full">
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 bg-white rounded-xl p-1.5 shadow-sm flex items-center justify-center border border-slate-200 shrink-0">
              <Shield className="w-8 h-8 text-aicte-blue fill-aicte-blue/15" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center">
                  Surakshit Nidhi
                  <span className="ml-2.5 text-xs bg-aicte-gold/20 text-aicte-gold border border-aicte-gold/40 px-2.5 py-0.5 rounded-full font-mono font-medium">
                    सुरक्षित निधि • v2.4
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                AICTE Security Deposit & FDR Lifecycle Governance Portal | अखिल भारतीय तकनीकी शिक्षा परिषद
              </p>
            </div>
          </div>

          {/* Action Controls & Role Switcher */}
          <div className="flex items-center space-x-2.5 flex-wrap sm:flex-nowrap w-full lg:w-auto justify-start lg:justify-end">
            {/* High Court Legal Dossier Quick Trigger (AICTE Internal Roles Only) */}
            {['SCRUTINY_OFFICER', 'BUREAU_HEAD', 'VIGILANCE_OFFICER'].includes(currentRole) && (
              <button
                onClick={onOpenLegalDossier}
                className="h-9 flex items-center space-x-1.5 text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-200 px-3 rounded-lg border border-slate-600 transition shadow-sm font-semibold shrink-0"
                title="Generate High Court Mandamus Defense Dossier"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Court Defense Dossier</span>
              </button>
            )}

            {/* AICTE Compliance Copilot Trigger */}
            <button
              onClick={onOpenCopilot}
              className="h-9 flex items-center space-x-1.5 text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 rounded-lg border border-sky-400/50 transition shadow-sm font-semibold shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 text-white" />
              <span>APH Copilot (RAG)</span>
            </button>

            {/* User Role Switcher Dropdown */}
            <div className="h-9 flex items-center bg-slate-900/80 rounded-lg border border-white/20 px-3 shrink-0">
              <User className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mr-2 shrink-0">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-transparent text-xs font-semibold text-amber-300 focus:outline-none cursor-pointer pr-1"
              >
                <option value="SCRUTINY_OFFICER" className="bg-slate-900 text-white">Scrutiny Officer (AICTE)</option>
                <option value="BUREAU_HEAD" className="bg-slate-900 text-white">Bureau Head (Regulation)</option>
                <option value="INSTITUTION" className="bg-slate-900 text-white">College Nodal Officer</option>
                <option value="VIGILANCE_OFFICER" className="bg-slate-900 text-white">Vigilance Officer</option>
                <option value="PGRC_OFFICER" className="bg-slate-900 text-white">PGRC Grievance Cell</option>
                <option value="BANK_MANAGER" className="bg-slate-900 text-white">Bank Branch Manager</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
