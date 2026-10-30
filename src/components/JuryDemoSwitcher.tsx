import React from 'react';
import { Play, Sparkles, CheckCircle2, AlertTriangle, Layers, QrCode } from 'lucide-react';

export type DemoScenarioId = 1 | 2 | 3 | 4 | 5 | 6;

interface JuryDemoSwitcherProps {
  activeScenario: DemoScenarioId;
  onSelectScenario: (id: DemoScenarioId) => void;
}

export const JuryDemoSwitcher: React.FC<JuryDemoSwitcherProps> = ({
  activeScenario,
  onSelectScenario
}) => {
  const scenarios = [
    {
      id: 1 as DemoScenarioId,
      shortTitle: '1. OCR Mismatch',
      desc: 'Leased Land 2x Rule',
      icon: AlertTriangle,
    },
    {
      id: 2 as DemoScenarioId,
      shortTitle: '2. Duplicate pHash',
      desc: 'Cross-Institute Reused Scan',
      icon: Sparkles,
    },
    {
      id: 3 as DemoScenarioId,
      shortTitle: '3. Bank IFSC Bridge',
      desc: 'Official @sbi.co.in OTP Link',
      icon: CheckCircle2,
    },
    {
      id: 4 as DemoScenarioId,
      shortTitle: '4. What-If Simulator',
      desc: '90-Day Liquidity & Workload',
      icon: Layers,
    },
    {
      id: 5 as DemoScenarioId,
      shortTitle: '5. Renewal Lineage',
      desc: 'Parent-Child DAG Tree',
      icon: Play,
    },
    {
      id: 6 as DemoScenarioId,
      shortTitle: '6. Clause 6.46 Release',
      desc: '4-Cell Clearances & QR NOC',
      icon: QrCode,
    }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-700/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2.5">
          {/* Label Indicator */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aicte-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-aicte-gold"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-aicte-gold">
              🏆 SIH Jury Demo Switcher:
            </span>
          </div>

          {/* 6 Aligned Uniform Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full lg:w-auto flex-1 lg:max-w-5xl">
            {scenarios.map((s) => {
              const Icon = s.icon;
              const isActive = activeScenario === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectScenario(s.id)}
                  className={`h-12 px-2.5 py-1.5 rounded-lg text-left transition-all flex items-center space-x-2 border ${
                    isActive
                      ? 'bg-aicte-gold text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/40 font-bold'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold truncate leading-tight">{s.shortTitle}</div>
                    <div className={`text-[10px] truncate leading-tight ${isActive ? 'text-slate-900 opacity-90' : 'text-slate-400'}`}>
                      {s.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
