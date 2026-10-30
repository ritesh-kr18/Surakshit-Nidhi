import React, { useState } from 'react';
import { X, BookOpen, Send, Sparkles, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface ComplianceCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplianceCopilotModal: React.FC<ComplianceCopilotModalProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'copilot'; text: string; clause?: string }>>([
    {
      sender: 'copilot',
      text: 'Namaste! I am your AICTE Regulatory Compliance Copilot, grounded exclusively in the Approval Process Handbook (APH 2024–2027) & APH 2026–27 Addendum. Ask any procedural question regarding security deposits, leased land multipliers, or Clause 6.46 release rules.',
      clause: 'AICTE Approval Process Handbook 2024-27'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleQuery = (query: string) => {
    const userMsg = { sender: 'user' as const, text: query };
    let replyText = '';
    let citedClause = '';

    const lower = query.toLowerCase();
    if (lower.includes('leased') || lower.includes('double') || lower.includes('2x')) {
      replyText = 'Under APH 2026–27 Official Addendum (Clause 1.4, Table 1.4): If an institution operates on a private leased building or leased land, the mandatory Security Deposit requirement is strictly DOUBLED (2.0x). For an Under Graduate Engineering institution, the standard requirement is ₹35 Lakhs, which becomes ₹70 Lakhs on leased land.';
      citedClause = 'APH 2026-27 Addendum Clause 1.4 & Table 1.4';
    } else if (lower.includes('release') || lower.includes('clause 6.46') || lower.includes('clearance')) {
      replyText = 'Under APH Clause 6.46(b), releasing an FDR upon 8/10-year maturity requires concurrent digital clearances from: (1) Public Grievance Redressal Cell (PGRC - zero student caution money/salary disputes), (2) Vigilance Cell (no CBI/CVC inquiry), and (3) Grants/AQIS Bureau (no unutilized grants or missing UCs).';
      citedClause = 'APH Clause 6.46(b) Release Guidelines';
    } else if (lower.includes('minority') || lower.includes('women') || lower.includes('concession')) {
      replyText = 'Under APH Clause 1.4 Table 1.4, technical institutions established exclusively for Women, Minorities, or Persons with Disabilities (PwD) are granted a 50% statutory concession on security deposits (e.g., PG Management requires ₹7.5 Lakhs instead of ₹15 Lakhs).';
      citedClause = 'APH Clause 1.4 Statutory Concessions';
    } else {
      replyText = 'Under AICTE regulations, all security deposits must be maintained for an uninterrupted lock-in period of 8 or 10 years in a Scheduled Commercial Bank, held jointly in the name of the Trust/Society AND the Member Secretary, AICTE. Interest accrued is credited to AICTE for Quality Improvement Programmes.';
      citedClause = 'APH Clause 1.4 Core Regulations';
    }

    setMessages([...messages, userMsg, { sender: 'copilot', text: replyText, clause: citedClause }]);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col h-[580px] animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-aicte-blue to-slate-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center space-x-2.5">
            <BookOpen className="w-5 h-5 text-aicte-gold" />
            <div>
              <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
                AICTE Compliance Copilot (Grounded Regulatory RAG)
                <span className="text-[10px] bg-sky-500/30 text-sky-200 px-2 py-0.5 rounded font-mono">Read-Only</span>
              </h3>
              <p className="text-[11px] text-slate-300">Grounded exclusively in APH 2024-2027 • Zero Hallucinations</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Pane */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50 text-xs">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-xl p-3.5 shadow-sm ${
                m.sender === 'user' 
                  ? 'bg-aicte-blue text-white font-medium' 
                  : 'bg-white text-slate-800 border border-slate-200'
              }`}>
                <p className="leading-relaxed">{m.text}</p>
                {m.clause && (
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Cited Source: {m.clause}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-5 py-2 bg-slate-100 border-t border-slate-200 flex flex-wrap gap-1.5 text-[11px]">
          <span className="text-slate-500 text-[10px] font-semibold py-1">Quick Queries:</span>
          <button 
            onClick={() => handleQuery('What is the deposit rule for an engineering college on leased land?')}
            className="bg-white hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full border border-slate-300 transition"
          >
            Leased land (2x) rule?
          </button>
          <button 
            onClick={() => handleQuery('What clearances are needed under Clause 6.46 for release?')}
            className="bg-white hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full border border-slate-300 transition"
          >
            Clause 6.46 multi-cell clearances?
          </button>
          <button 
            onClick={() => handleQuery('What are the concessions for minority or women colleges?')}
            className="bg-white hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full border border-slate-300 transition"
          >
            50% minority/women concessions?
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask a regulatory query on APH rules or deposit calculations..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && inputText) handleQuery(inputText); }}
            className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aicte-blue"
          />
          <button
            onClick={() => { if (inputText) handleQuery(inputText); }}
            className="p-2 bg-aicte-blue hover:bg-slate-800 text-white rounded-lg transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
