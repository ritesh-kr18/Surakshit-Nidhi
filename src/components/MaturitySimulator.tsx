import React, { useState } from 'react';
import { Layers, Calendar, Clock, DollarSign, Users, AlertCircle, BarChart3 } from 'lucide-react';

export const MaturitySimulator: React.FC = () => {
  const [daysHorizon, setDaysHorizon] = useState<number>(90);

  // Dynamic simulation multipliers based on days horizon
  const simulatedCount = Math.round((daysHorizon / 30) * 142);
  const officerHours = Math.round((simulatedCount * 18) / 60); // 18 mins avg scrutiny
  const cashOutflowCr = ((simulatedCount * 22.5) / 100).toFixed(2); // Avg 22.5L per FDR
  const bottleneckRegion = daysHorizon > 60 ? 'Northern Region (Kanpur Office - 38% Load)' : 'Western Region (Mumbai Office - 24% Load)';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Regulation Bureau What-If Workload & RTGS Liquidity Simulator
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-mono px-2 py-0.5 rounded border border-blue-500/30">
                Predictive Governance Engine
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Interactive projection model for Bureau Head to forecast scrutiny man-hours, regional bottlenecks, and treasury cash outflows
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-aicte-gold bg-slate-800 px-3 py-1 rounded border border-slate-700">
          Horizon: +{daysHorizon} Days
        </div>
      </div>

      <div className="p-6">
        {/* Interactive Horizon Slider Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-aicte-blue" />
              Simulate Maturity Horizon Window:
            </label>
            <span className="text-lg font-extrabold text-aicte-blue font-mono">
              +{daysHorizon} Days (T-{daysHorizon})
            </span>
          </div>

          <input
            type="range"
            min="15"
            max="180"
            step="15"
            value={daysHorizon}
            onChange={(e) => setDaysHorizon(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-aicte-blue"
          />

          <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
            <span>+15 Days (Urgent)</span>
            <span>+30 Days</span>
            <span>+60 Days</span>
            <span>+90 Days (Statutory Quarter)</span>
            <span>+180 Days (Half Year)</span>
          </div>
        </div>

        {/* 4 Projected Key Performance Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1: Expected Maturing Instruments */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 text-xs">
            <div className="flex items-center justify-between text-blue-900 font-bold mb-1">
              <span>Maturing Instruments</span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mb-1">
              {simulatedCount}
            </div>
            <p className="text-[11px] text-slate-600">
              Technical colleges reaching 8-to-10 year lock-in completion
            </p>
          </div>

          {/* Card 2: Officer Scrutiny Man-Hours */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs">
            <div className="flex items-center justify-between text-amber-900 font-bold mb-1">
              <span>Required Scrutiny Time</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mb-1">
              {officerHours} <span className="text-sm font-sans font-medium text-slate-600">Hours</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Calculated at 18 mins avg scrutiny per renewal file
            </p>
          </div>

          {/* Card 3: RTGS Cash Outflow Forecast */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-xs">
            <div className="flex items-center justify-between text-emerald-900 font-bold mb-1">
              <span>RTGS Refund Outflow</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mb-1">
              ₹{cashOutflowCr} <span className="text-sm font-sans font-medium text-slate-600">Cr</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Finance Bureau liquidity requirement for matured releases
            </p>
          </div>

          {/* Card 4: Projected Bottleneck */}
          <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-4 text-xs">
            <div className="flex items-center justify-between text-purple-900 font-bold mb-1">
              <span>Anticipated Bottleneck</span>
              <AlertCircle className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-sm font-bold text-slate-900 font-mono mb-1 truncate">
              {bottleneckRegion.split(' ')[0]} Region
            </div>
            <p className="text-[11px] text-slate-600 truncate">
              {bottleneckRegion}
            </p>
          </div>
        </div>

        {/* Action Strategy Alert for Bureau Head */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-5 h-5 text-aicte-blue" />
            <div>
              <strong className="text-slate-900 block font-sans">
                Predictive Resource Allocation Recommendation:
              </strong>
              <span className="text-slate-600 text-[11px]">
                Reassign 3 temporary Scrutiny Officers from Southern Region to Northern Region starting next month to prevent SLA breaches.
              </span>
            </div>
          </div>

          <button 
            onClick={() => alert(`Simulated Workload Plan exported for +${daysHorizon} days horizon.`)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition shrink-0"
          >
            Export Executive Projection Brief
          </button>
        </div>
      </div>
    </div>
  );
};
