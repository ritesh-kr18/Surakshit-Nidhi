import React, { useState } from 'react';
import { DollarSign, Send, CheckCircle, AlertTriangle, Building, RefreshCw, Mail } from 'lucide-react';

export const TrappedDepositsDashboard: React.FC = () => {
  const [notifiedIds, setNotifiedIds] = useState<string[]>([]);

  const trappedInstitutions = [
    {
      id: 'trap-01',
      name: 'Sahyadri Institute of Technology',
      pid: '1-0941829',
      fdrNumber: 'SBIN/MAH/2013/09412',
      amountLakhs: 35,
      maturedDate: '2023-08-14',
      monthsOverdue: 31,
      bank: 'State Bank of India',
      trustContact: 'trustee@sahyadri-edu.org',
      state: 'Maharashtra'
    },
    {
      id: 'trap-02',
      name: 'Malabar Engineering College',
      pid: '1-2840192',
      fdrNumber: 'CNRB/KER/2012/48190',
      amountLakhs: 35,
      maturedDate: '2022-11-20',
      monthsOverdue: 40,
      bank: 'Canara Bank',
      trustContact: 'secretary@malabartech.ac.in',
      state: 'Kerala'
    },
    {
      id: 'trap-03',
      name: 'Bundelkhand Polytechnic Institute',
      pid: '1-4910294',
      fdrNumber: 'PUNB/UP/2014/19402',
      amountLakhs: 15,
      maturedDate: '2024-01-05',
      monthsOverdue: 26,
      bank: 'Punjab National Bank',
      trustContact: 'bundelkhand.poly@gmail.com',
      state: 'Uttar Pradesh'
    }
  ];

  const handleNotify = (id: string, name: string) => {
    setNotifiedIds([...notifiedIds, id]);
    alert(`Automated Recovery Notice dispatched to ${name} via Email, SMS & WhatsApp. Release checklist auto-attached.`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-950 text-white px-5 py-3.5 flex justify-between items-center border-b border-emerald-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-800 text-emerald-200 rounded-lg border border-emerald-700">
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Trapped Deposit Recovery Engine (Addressing AICTE Circular Node 3297)
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                National Recovery Hub
              </span>
            </h3>
            <p className="text-xs text-emerald-200">
              Proactively tracks and recovers hundreds of crores in matured security deposits unclaimed by technical institutions
            </p>
          </div>
        </div>

        <div className="text-xs font-mono bg-emerald-900 px-3 py-1 rounded text-emerald-300 border border-emerald-800">
          Total Trapped Capital: ₹47.50 Cr
        </div>
      </div>

      <div className="p-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <span className="text-slate-500 uppercase block font-semibold text-[10px]">Unclaimed Matured FDRs</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">312 Institutions</span>
            <span className="text-emerald-700 text-[11px] block mt-1">Identified across 18 states</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <span className="text-slate-500 uppercase block font-semibold text-[10px]">Total Trapped Liquidity</span>
            <span className="text-2xl font-extrabold text-amber-900 font-mono">₹47.50 Crores</span>
            <span className="text-amber-800 text-[11px] block mt-1">Awaiting release application</span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <span className="text-slate-500 uppercase block font-semibold text-[10px]">Automated Recovery Rate</span>
            <span className="text-2xl font-extrabold text-blue-900 font-mono">68.4%</span>
            <span className="text-blue-700 text-[11px] block mt-1">Claim initiated within 60 days of notice</span>
          </div>
        </div>

        {/* Action Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Institution & Trust</th>
                <th className="py-2.5 px-3">FDR Ref & Bank</th>
                <th className="py-2.5 px-3 text-right">Trapped Amount</th>
                <th className="py-2.5 px-3">Matured On</th>
                <th className="py-2.5 px-3">Overdue Time</th>
                <th className="py-2.5 px-3 text-center">Automated Outreach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trappedInstitutions.map((item) => {
                const isSent = notifiedIds.includes(item.id);
                return (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">PID: {item.pid} • {item.state}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px]">
                      <div>{item.fdrNumber}</div>
                      <div className="text-slate-500 font-sans">{item.bank}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-800 text-sm">
                      ₹{item.amountLakhs}.00 L
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-700">
                      {item.maturedDate}
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-amber-100 text-amber-800 font-mono font-bold px-2 py-0.5 rounded text-[10px]">
                        +{item.monthsOverdue} Months
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        disabled={isSent}
                        onClick={() => handleNotify(item.id, item.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 mx-auto ${
                          isSent
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        }`}
                      >
                        {isSent ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Notice Dispatched
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Send Recovery Notice
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
