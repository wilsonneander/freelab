"use client";

import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '@/types';

interface RevenueChartProps {
    data: ChartDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="bg-white/40 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#2D3436]">Claims Over the Years</h3>
                <div className="flex gap-3 text-xs items-center">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#FF7675]"></span> Approved</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#6C5CE7]"></span> Submitted</span>
                </div>
            </div>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8395A7' }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="value" stroke="#6C5CE7" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
