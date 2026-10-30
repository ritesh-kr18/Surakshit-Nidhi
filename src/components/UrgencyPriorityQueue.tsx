import React, { useState } from 'react';
import { FinancialInstrument, UserRole } from '../types/fdr';
import { AlertCircle, Clock, Search, ShieldCheck, Sparkles, Filter, ChevronRight, HelpCircle, Building } from 'lucide-react';

interface UrgencyPriorityQueueProps {
  instruments: FinancialInstrument[];
  selectedId: string;
  onSelectInstrument: (id: string) => void;
  currentRole?: UserRole;
}

export const UrgencyPriorityQueue: React.FC<UrgencyPriorityQueueProps> = ({
  instruments,
  selectedId,
  onSelectInstrument,
  currentRole = 'SCRUTINY_OFFICER'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [hoveredScoreId, setHoveredScoreId] = useState<string | null>(null);

  // If role is INSTITUTION, only display their own registered college deposit
  const roleScoped = currentRole === 'INSTITUTION' 
    ? instruments.filter(i => i.id === 'fdr-001')
    : instruments;

  // Sort descending by Urgency Score
  const sorted = [...roleScoped].sort((a, b) => b.urgencyScore - a.urgencyScore);

  const filtered = sorted.filter(inst => {
    const matchesSearch = 
      inst.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.aictePermanentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.fdrNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && inst.lifecycleStatus === statusFilter;
  });

  const getUrgencyBadge = (score: number) => {
    if (score >= 80) {
      return { label: 'CRITICAL', bg: 'bg-red-500 text-white border-red-600', ring: 'ring-red-400' };
    } else if (score >= 60) {
      return { label: 'HIGH', bg: 'bg-amber-500 text-white border-amber-600', ring: 'ring-amber-400' };
    } else if (score >= 40) {
      return { label: 'MEDIUM', bg: 'bg-yellow-400 text-yellow-950 border-yellow-500', ring: 'ring-yellow-300' };
    }
    return { label: 'LOW', bg: 'bg-emerald-500 text-white border-emerald-600', ring: 'ring-emerald-400' };
  };

  const getAuthenticityBadge = (status: string) => {
    switch (status) {
      case 'BANK_API_VERIFIED':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">Tier 3A: Bank API Confirmed</span>;
      case 'BANK_OTP_CONFIRMED':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-300">Tier 3B: Branch OTP Confirmed</span>;
      case 'AI_OCR_VALIDATED':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300">Tier 2: AI OCR Validated</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">Tier 1: Self Reported</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header with Search & Filter */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap justify-between items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Explainable Administrative Urgency Queue ($U_{`\\text{score}`}$)
            </h3>
            <span className="text-xs bg-aicte-blue text-white px-2 py-0.5 rounded-full font-mono font-bold">
              {filtered.length} Cases
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Formula: $U_{`\\text{score}`} = 0.35 \cdot S_{`\\text{deadline}`} + 0.30 \cdot S_{`\\text{discrepancy}`} + 0.20 \cdot S_{`\\text{SLA}`} + 0.15 \cdot S_{`\\text{compliance}`}$
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by PID, Name, FDR No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aicte-blue w-60"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-aicte-blue bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="DISCREPANCY_FLAGGED">Discrepancy Flagged</option>
              <option value="EXPIRING_30D">Expiring in 30 Days</option>
              <option value="RELEASE_PENDING_NOC">Release Pending NOC</option>
              <option value="RENEWED">Renewed</option>
              <option value="ACTIVE">Active</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <th className="py-2.5 px-3 w-20 text-center">Urgency</th>
              <th className="py-2.5 px-3 min-w-[240px]">Institution Details</th>
              <th className="py-2.5 px-3 min-w-[180px]">Instrument & Bank</th>
              <th className="py-2.5 px-3 text-right min-w-[120px]">Principal Amount</th>
              <th className="py-2.5 px-3 min-w-[120px]">Maturity Date</th>
              <th className="py-2.5 px-3 min-w-[150px]">Authenticity Tier</th>
              <th className="py-2.5 px-3 min-w-[130px]">Status</th>
              <th className="py-2.5 px-3 w-16 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((inst) => {
              const badge = getUrgencyBadge(inst.urgencyScore);
              const isSelected = selectedId === inst.id;

              return (
                <tr
                  key={inst.id}
                  onClick={() => onSelectInstrument(inst.id)}
                  className={`hover:bg-slate-50 transition cursor-pointer ${
                    isSelected ? 'bg-blue-50/70 border-l-4 border-aicte-blue' : ''
                  }`}
                >
                  {/* Urgency Score Badge with Hover Explainability */}
                  <td className="py-3 px-3 text-center relative">
                    <div 
                      onMouseEnter={() => setHoveredScoreId(inst.id)}
                      onMouseLeave={() => setHoveredScoreId(null)}
                      className={`inline-flex flex-col items-center justify-center w-11 h-11 rounded-lg border font-mono font-bold shadow-sm transition hover:scale-105 ${badge.bg}`}
                    >
                      <span className="text-sm leading-tight">{inst.urgencyScore}</span>
                      <span className="text-[9px] uppercase tracking-tighter opacity-90">{badge.label}</span>
                    </div>

                    {/* Explainability Floating Tooltip */}
                    {hoveredScoreId === inst.id && (
                      <div className="absolute left-16 top-0 z-50 w-72 bg-slate-900 text-white rounded-lg p-3 text-[11px] shadow-2xl border border-slate-700 text-left pointer-events-none">
                        <div className="flex justify-between items-center border-b border-slate-700 pb-1.5 mb-1.5">
                          <span className="font-bold text-amber-300 flex items-center gap-1">
                            <HelpCircle className="w-3 h-3" />
                            Urgency Breakdown ($U_{`\\text{score}`}$)
                          </span>
                          <span className="font-mono font-bold text-white">{inst.urgencyScore}/100</span>
                        </div>
                        <div className="space-y-1 font-mono text-[10px] text-slate-300">
                          <div className="flex justify-between">
                            <span>Deadline Proximity (35%):</span>
                            <span className="text-amber-400 font-bold">+{inst.urgencyBreakdown.deadlinePoints} pts</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Discrepancy Severity (30%):</span>
                            <span className="text-red-400 font-bold">+{inst.urgencyBreakdown.discrepancyPoints} pts</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Queue SLA Aging (20%):</span>
                            <span className="text-sky-400 font-bold">+{inst.urgencyBreakdown.slaPoints} pts</span>
                          </div>
                          <div className="flex justify-between">
                            <span>APH Compliance Factors (15%):</span>
                            <span className="text-purple-400 font-bold">+{inst.urgencyBreakdown.compliancePoints} pts</span>
                          </div>
                        </div>
                        <p className="mt-2 text-[10px] text-slate-200 font-sans border-t border-slate-700 pt-1.5 leading-relaxed">
                          {inst.urgencyBreakdown.explanation}
                        </p>
                      </div>
                    )}
                  </td>

                  {/* Institution Details */}
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{inst.institutionName}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span className="font-mono text-slate-600 font-semibold">{inst.aictePermanentId}</span>
                      <span>•</span>
                      <span>{inst.district}, {inst.state}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      <span className="bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-medium mr-1">
                        {inst.programType} ({inst.degreeLevel})
                      </span>
                      {inst.landTenure === 'LEASED' && (
                        <span className="bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.2 rounded border border-amber-300">
                          Leased Land (2x)
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Instrument & Bank */}
                  <td className="py-3 px-3">
                    <div className="font-mono font-semibold text-slate-800">{inst.fdrNumber}</div>
                    <div className="text-[11px] text-slate-600">{inst.issuingBankName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">IFSC: {inst.ifscCode}</div>
                  </td>

                  {/* Principal Amount */}
                  <td className="py-3 px-3 text-right">
                    <div className="font-mono font-bold text-slate-900 text-sm">
                      ₹{(inst.principalAmount / 100000).toFixed(2)} L
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Req: ₹{inst.statutoryRequiredDeposit} L
                    </div>
                  </td>

                  {/* Maturity Date */}
                  <td className="py-3 px-3">
                    <div className="font-mono font-semibold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {inst.maturityDate}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Tenure: {inst.lockInTenureYears} Years
                    </div>
                  </td>

                  {/* Authenticity Tier */}
                  <td className="py-3 px-3">
                    {getAuthenticityBadge(inst.authenticityStatus)}
                  </td>

                  {/* Lifecycle Status */}
                  <td className="py-3 px-3">
                    {inst.lifecycleStatus === 'DISCREPANCY_FLAGGED' && (
                      <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200">
                        <AlertCircle className="w-3 h-3 mr-1" /> Flagged
                      </span>
                    )}
                    {inst.lifecycleStatus === 'EXPIRING_30D' && (
                      <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3 mr-1" /> Expiring Soon
                      </span>
                    )}
                    {inst.lifecycleStatus === 'RELEASE_PENDING_NOC' && (
                      <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Ready for Release
                      </span>
                    )}
                    {inst.lifecycleStatus === 'RENEWED' && (
                      <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                        Renewed (DAG)
                      </span>
                    )}
                    {inst.lifecycleStatus === 'ACTIVE' && (
                      <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Active Normal
                      </span>
                    )}
                  </td>

                  {/* Action Button */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectInstrument(inst.id);
                      }}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-aicte-blue hover:text-white transition text-slate-600"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
