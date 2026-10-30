import React, { useState } from 'react';
import { INITIAL_FDRS, INITIAL_AUDIT_LOGS } from './data/mockFDRs';
import { FinancialInstrument, UserRole } from './types/fdr';
import { Navbar } from './components/Navbar';
import { SplitScreenOCRViewer } from './components/SplitScreenOCRViewer';
import { UrgencyPriorityQueue } from './components/UrgencyPriorityQueue';
import { MultiCellClearanceHub } from './components/MultiCellClearanceHub';
import { DigitalNOCModal } from './components/DigitalNOCModal';
import { BankVerificationBridge } from './components/BankVerificationBridge';
import { ForensicDuplicateDetector } from './components/ForensicDuplicateDetector';
import { MaturitySimulator } from './components/MaturitySimulator';
import { LineageGraphDAG } from './components/LineageGraphDAG';
import { BankSolvencyRadar } from './components/BankSolvencyRadar';
import { TrappedDepositsDashboard } from './components/TrappedDepositsDashboard';
import { TamperEvidentLedger } from './components/TamperEvidentLedger';
import { HighCourtDossierModal } from './components/HighCourtDossierModal';
import { ComplianceCopilotModal } from './components/ComplianceCopilotModal';
import { 
  FileText, 
  Layers, 
  ShieldCheck, 
  GitBranch, 
  DollarSign, 
  Lock, 
  Eye, 
  CheckCircle2, 
  AlertTriangle,
  Landmark,
  User,
  Shield,
  KeyRound,
  Building
} from 'lucide-react';

interface RoleConfig {
  title: string;
  badge: string;
  department: string;
  description: string;
  permissions: string[];
  allowedTabs: string[];
  defaultTab: string;
  focusId: string;
}

const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  SCRUTINY_OFFICER: {
    title: 'Dr. R. K. Sharma (Section 4 Dealing Officer)',
    badge: 'AICTE Regulation Bureau',
    department: 'Scrutiny & Document Verification Division',
    description: 'Authorized to scrutinize submitted FDR instruments, perform AI OCR discrepancy validation, verify APH 2024-27 Clause 1.4 statutory formulas, query issuing bank branches, and manage the administrative urgency dealing queue.',
    permissions: ['OCR Field Validation', 'APH Calculation Scrutiny', 'Show-Cause Issuance', 'Renewal Lineage Audit'],
    allowedTabs: ['ocr', 'queue', 'lineage', 'bank', 'ledger'],
    defaultTab: 'ocr',
    focusId: 'fdr-001',
  },
  BUREAU_HEAD: {
    title: 'Dr. Abhay Jere / Member Secretary Desk',
    badge: 'Executive Competent Authority',
    department: 'Apex Governance & Policy Execution Bureau',
    description: 'Authorized apex signing authority to digitally grant and issue Clause 6.46 Release NOCs, forecast 90-day liquidity and scrutiny workloads, oversee DICGC bank solvency risks, and resolve Circular 3297 trapped deposits.',
    permissions: ['Clause 6.46 Digital NOC Authorization', '90-Day Workload Simulator', 'Bank Solvency Radar', 'Circular 3297 Recovery Hub', 'Cryptographic Audit Trail'],
    allowedTabs: ['clearance', 'simulator', 'radar', 'trapped', 'queue', 'ledger'],
    defaultTab: 'clearance',
    focusId: 'fdr-005',
  },
  INSTITUTION: {
    title: 'Nodal Officer — Sri Aurobindo Technical Trust',
    badge: 'College Nodal Portal (PID: 1-0941829)',
    department: 'Technical Institution / Trust Desk',
    description: 'Institution portal to track security deposit status, inspect AI OCR validation results, respond to show-cause notices or deficiency memos, view renewal lineages, and download authorized release NOCs.',
    permissions: ['Deposit Status Tracking', 'Rectification Upload', 'Renewal DAG History', 'Download Verified Release NOC'],
    allowedTabs: ['ocr', 'lineage', 'clearance'],
    defaultTab: 'ocr',
    focusId: 'fdr-001',
  },
  VIGILANCE_OFFICER: {
    title: 'Chief Vigilance Officer (CVO) Desk',
    badge: 'Vigilance & Anti-Corruption Bureau',
    department: 'Forensic Investigation & Fraud Prevention Cell',
    description: 'Statutory vigilance oversight to detect duplicate scan reuse across sibling trust institutions using perceptual hashing (pHash Hamming distance = 0) and grant or withhold mandatory Clause 6.46 vigilance clearance.',
    permissions: ['pHash Duplicate Detection', 'Clause 6.46 Vigilance Sign-off', 'Immutable Ledger Verification', 'CBI/CVC Referral'],
    allowedTabs: ['duplicate', 'clearance', 'ledger', 'radar'],
    defaultTab: 'duplicate',
    focusId: 'fdr-004',
  },
  PGRC_OFFICER: {
    title: 'Public Grievance Redressal Cell (PGRC) Desk',
    badge: 'Student & Faculty Welfare Division',
    department: 'Statutory Redressal & Caution Money Registry',
    description: 'Mandatory scrutiny of student fee refunds, caution money disputes, and faculty unpaid salary grievances prior to approving institutional deposit discharge under Clause 6.46b.',
    permissions: ['PGRC Clause 6.46 Clearance', 'Grievance Hold Management', 'Caution Money Audit', 'Trapped Deposit Verification'],
    allowedTabs: ['clearance', 'queue', 'trapped'],
    defaultTab: 'clearance',
    focusId: 'fdr-005',
  },
  BANK_MANAGER: {
    title: 'Branch Manager — State Bank of India (IIT Powai Branch)',
    badge: 'RBI IFSC Directory Bridge',
    department: 'Authorized Scheduled Commercial Bank',
    description: 'Authorized banking bridge to receive zero-login cryptographic verification tokens via official RBI corporate domain email, confirm deposit lien to AICTE, and validate AICTE Digital Release NOCs for encashment.',
    permissions: ['RBI Directory OTP Handshake', 'Deposit Lien Confirmation', 'NOC QR Verification', 'Matured Deposit Discharge'],
    allowedTabs: ['bank', 'clearance'],
    defaultTab: 'bank',
    focusId: 'fdr-003',
  },
};

const ALL_TABS = [
  {
    id: 'ocr',
    label: 'OCR & APH Engine',
    sub: 'Split-Screen Mismatch',
    icon: Eye,
    color: 'text-aicte-blue',
  },
  {
    id: 'queue',
    label: 'Urgency Queue',
    sub: 'Priority Score (U-score)',
    icon: FileText,
    color: 'text-aicte-blue',
  },
  {
    id: 'clearance',
    label: 'Clause 6.46 Clearances',
    sub: 'Parallel 4-Cell NOC',
    icon: ShieldCheck,
    color: 'text-teal-600',
  },
  {
    id: 'bank',
    label: 'RBI IFSC Bridge',
    sub: 'Tier 3B Branch OTP',
    icon: Landmark,
    color: 'text-emerald-600',
  },
  {
    id: 'duplicate',
    label: 'pHash Duplicate',
    sub: 'Cross-Institute Forensics',
    icon: AlertTriangle,
    color: 'text-red-500',
  },
  {
    id: 'simulator',
    label: '90-Day Simulator',
    sub: 'Workload & Liquidity',
    icon: Layers,
    color: 'text-indigo-600',
  },
  {
    id: 'lineage',
    label: 'Renewal DAG',
    sub: 'Parent-Child Tree',
    icon: GitBranch,
    color: 'text-purple-600',
  },
  {
    id: 'radar',
    label: 'Bank Solvency Radar',
    sub: 'RBI PCA Early Warning',
    icon: AlertTriangle,
    color: 'text-amber-600',
  },
  {
    id: 'trapped',
    label: 'Trapped Deposits',
    sub: 'Circular Node 3297',
    icon: DollarSign,
    color: 'text-emerald-600',
  },
  {
    id: 'ledger',
    label: 'Cryptographic Ledger',
    sub: 'SHA-256 WORM Chain',
    icon: Lock,
    color: 'text-slate-700',
  },
];

export function App() {
  const [instruments, setInstruments] = useState<FinancialInstrument[]>(INITIAL_FDRS);
  const [selectedId, setSelectedId] = useState<string>('fdr-001');
  const [currentRole, setCurrentRole] = useState<UserRole>('SCRUTINY_OFFICER');
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  // Active View Tab
  const [activeTab, setActiveTab] = useState<string>('ocr');

  // Modals
  const [isNocOpen, setIsNocOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  const selectedInstrument = instruments.find(i => i.id === selectedId) || instruments[0];
  const currentRoleConfig = ROLE_CONFIGS[currentRole];
  const visibleTabs = ALL_TABS.filter(tab => currentRoleConfig.allowedTabs.includes(tab.id));

  // Role Switcher Handler
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    const config = ROLE_CONFIGS[newRole];
    setActiveTab(config.defaultTab);
    setSelectedId(config.focusId);
  };

  // Toggle Clearance Status in Hub
  const handleToggleClearance = (cell: 'pgrc' | 'vigilance' | 'grants') => {
    setInstruments(prev => prev.map(inst => {
      if (inst.id !== selectedId) return inst;
      const key = `${cell}Clearance` as const;
      const current = inst[key];
      return {
        ...inst,
        [key]: current === 'CLEAR' ? 'HELD' : 'CLEAR'
      };
    }));
  };

  // Resolve Discrepancy
  const handleResolveDiscrepancy = (id: string) => {
    alert("Official Show-Cause Deficiency notice issued to Institution with 15-day compliance window.");
  };

  // Bank OTP Confirmation Handler
  const handleConfirmBankVerification = (id: string) => {
    setInstruments(prev => prev.map(inst => {
      if (inst.id !== id) return inst;
      return {
        ...inst,
        authenticityStatus: 'BANK_OTP_CONFIRMED',
        lifecycleStatus: 'ACTIVE'
      };
    }));
  };

  // Dynamic grid class based on allowed tabs count
  const getGridColsClass = (count: number) => {
    if (count <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-3';
    if (count === 4) return 'grid-cols-2 sm:grid-cols-4';
    if (count === 5) return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5';
    return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Main Navbar with Role Switcher */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        lang={lang}
        onLangChange={setLang}
        onOpenLegalDossier={() => setIsDossierOpen(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
      />

      {/* Role Context & Authorization Banner */}
      <div className="bg-slate-900 border-b border-slate-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start sm:items-center space-x-3">
              <div className="p-2 bg-aicte-gold/20 text-aicte-gold rounded-lg border border-aicte-gold/40 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Active User Identity:</span>
                  <span className="text-sm font-bold text-white">{currentRoleConfig.title}</span>
                  <span className="text-[10px] font-mono bg-aicte-gold text-slate-950 font-extrabold px-2 py-0.5 rounded">
                    {currentRoleConfig.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {currentRoleConfig.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 self-stretch md:self-auto justify-start md:justify-end">
              <span className="text-[10px] text-slate-400 uppercase font-semibold mr-1">Authorized Capabilities:</span>
              {currentRoleConfig.permissions.map((perm, idx) => (
                <span key={idx} className="text-[10px] bg-slate-800 text-emerald-300 border border-slate-700 px-2 py-0.5 rounded font-mono font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  {perm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        {/* Active Case Instrument Switcher Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2 bg-blue-50 text-aicte-blue rounded-lg border border-blue-200 shrink-0">
              <Building className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 font-medium">Active Case File:</span>
                <span className="font-mono bg-blue-50 text-blue-900 font-bold px-2 py-0.5 rounded border border-blue-200">
                  {selectedInstrument.fdrNumber}
                </span>
                <span className="font-semibold text-slate-800 truncate">
                  {selectedInstrument.institutionName}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 mt-0.5">
                <span>PID: <strong className="font-mono text-slate-700">{selectedInstrument.aictePermanentId}</strong></span>
                <span className="text-slate-300">•</span>
                <span>Deposit: <strong className="font-mono text-emerald-700 font-bold">₹{(selectedInstrument.principalAmount / 100000).toFixed(2)} Lakhs</strong></span>
                <span className="text-slate-300">•</span>
                <span>Bank: <strong className="text-slate-700">{selectedInstrument.issuingBankName}</strong></span>
                <span className="text-slate-300">•</span>
                <span>Lock-in: <strong className="text-slate-700">{selectedInstrument.lockInTenureYears} Years</strong> (Matures: {selectedInstrument.maturityDate})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto shrink-0 justify-end">
            <label className="text-[11px] font-bold text-slate-600 whitespace-nowrap">Switch Case Instrument:</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-aicte-blue cursor-pointer"
            >
              {instruments.map(inst => (
                <option key={inst.id} value={inst.id}>
                  {inst.id.toUpperCase()}: {inst.fdrNumber} — {inst.institutionName.split(' ')[0]} (₹{(inst.principalAmount / 100000).toFixed(0)}L)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Role-Scoped Navigation Tabs Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2.5 space-y-2">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between px-1 pb-1.5 border-b border-slate-100 text-xs">
            <div className="flex items-center space-x-2 text-slate-600 font-medium">
              <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-aicte-blue" />
                Role-Authorized Workspaces ({currentRoleConfig.badge})
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-slate-500 text-[11px]">
                Showing {visibleTabs.length} of 10 modules permitted under AICTE RBAC Policy
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-emerald-600" />
              RBAC Enforced
            </span>
          </div>

          {/* Symmetrical Grid of Only Allowed Tabs */}
          <div className={`grid ${getGridColsClass(visibleTabs.length)} gap-2 text-xs`}>
            {visibleTabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`h-12 px-3 py-1.5 rounded-lg transition-all flex items-center space-x-2.5 border text-left ${
                    isActive
                      ? 'bg-aicte-blue text-white border-blue-900 shadow-sm font-bold ring-2 ring-blue-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : tab.color}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold truncate leading-tight">
                      {idx + 1}. {tab.label}
                    </div>
                    <div className={`text-[10px] truncate leading-tight ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {tab.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Workspace Tab Content */}
        {activeTab === 'ocr' && (
          <div className="space-y-6">
            <SplitScreenOCRViewer
              instrument={selectedInstrument}
              onResolveDiscrepancy={handleResolveDiscrepancy}
              currentRole={currentRole}
            />
            {currentRole !== 'INSTITUTION' && (
              <UrgencyPriorityQueue
                instruments={instruments}
                selectedId={selectedId}
                onSelectInstrument={(id) => setSelectedId(id)}
                currentRole={currentRole}
              />
            )}
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="space-y-6">
            <UrgencyPriorityQueue
              instruments={instruments}
              selectedId={selectedId}
              onSelectInstrument={(id) => {
                setSelectedId(id);
                if (currentRoleConfig.allowedTabs.includes('ocr')) {
                  setActiveTab('ocr');
                }
              }}
              currentRole={currentRole}
            />
          </div>
        )}

        {activeTab === 'clearance' && (
          <div className="space-y-6">
            <MultiCellClearanceHub
              instrument={selectedInstrument}
              onToggleClearance={handleToggleClearance}
              onGenerateNOC={() => setIsNocOpen(true)}
              currentRole={currentRole}
            />
            {currentRole !== 'INSTITUTION' && currentRole !== 'BANK_MANAGER' && (
              <UrgencyPriorityQueue
                instruments={instruments}
                selectedId={selectedId}
                onSelectInstrument={(id) => setSelectedId(id)}
                currentRole={currentRole}
              />
            )}
          </div>
        )}

        {activeTab === 'bank' && (
          <div className="space-y-6">
            <BankVerificationBridge
              instrument={selectedInstrument}
              onConfirmVerification={handleConfirmBankVerification}
            />
          </div>
        )}

        {activeTab === 'duplicate' && (
          <div className="space-y-6">
            <ForensicDuplicateDetector
              instrument={selectedInstrument}
            />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <MaturitySimulator />
          </div>
        )}

        {activeTab === 'lineage' && (
          <div className="space-y-6">
            <LineageGraphDAG
              instrument={selectedInstrument}
            />
          </div>
        )}

        {activeTab === 'radar' && (
          <div className="space-y-6">
            <BankSolvencyRadar
              instruments={instruments}
            />
          </div>
        )}

        {activeTab === 'trapped' && (
          <div className="space-y-6">
            <TrappedDepositsDashboard />
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="space-y-6">
            <TamperEvidentLedger
              logs={INITIAL_AUDIT_LOGS}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <DigitalNOCModal
        isOpen={isNocOpen}
        onClose={() => setIsNocOpen(false)}
        instrument={selectedInstrument}
      />

      <HighCourtDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        instrument={selectedInstrument}
      />

      <ComplianceCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />

      {/* Government Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-xs border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-center md:text-left">
            <p className="font-semibold text-slate-300">
              Surakshit Nidhi (सुरक्षित निधि) • AICTE Security Deposit & FDR Management Portal
            </p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Designed for Regulation Bureau, All India Council for Technical Education, Ministry of Education, New Delhi
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[11px] font-mono">
            <span>TLS 1.3 Encrypted</span>
            <span>•</span>
            <span>AES-256 Storage</span>
            <span>•</span>
            <span className="text-emerald-400">GIGW 3.0 Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
