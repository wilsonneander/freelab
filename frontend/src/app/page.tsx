"use client";

import React from 'react';
import { Folder, Users, CheckSquare, TrendingUp } from 'lucide-react';
import {
  StatCard,
  RevenueChart,
  CollaboratorsList,
  EventsList,
  TimerWidget,
  MeetingCard,
  REVENUE_CHART_DATA,
  COLLABORATORS,
  CALENDAR_EVENTS,
  DASHBOARD_STATS
} from '@/features/dashboard';

const ICON_MAP: Record<string, any> = {
  Folder, Users, CheckSquare, TrendingUp
};

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full gap-4">

      {/* Header (Page Title) */}
      <div className="flex justify-between items-center shrink-0 px-2 min-h-[50px]">
        <div>
          <h2 className="text-white font-medium text-xl drop-shadow-sm">Bom dia Wendell, segue as atualizações do dia!</h2>
        </div>
      </div>

      {/* Main Dashboard Panel */}
      <div className="flex-1 bg-[#FFF5F0]/55 backdrop-blur-[20px] rounded-[32px] p-6 flex flex-col gap-6 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] border border-white/60">

        <div className="shrink-0 mb-2">
          <h1 className="text-white text-4xl font-bold mb-1">Dashboard</h1>
          <p className="text-white/90">Acompanhe todas as métricas de <strong className="font-semibold">Avoice Company</strong></p>
        </div>

        {/* Dashboard Grid Content - No Scroll on Page, controlled heights */}
        <div className="flex flex-col flex-1 gap-6 overflow-hidden">

          {/* Row 1: Metrics (Fixed Height 140px) */}
          <div className="flex gap-4 w-full h-[140px] shrink-0">
            {DASHBOARD_STATS.map((stat, i) => (
              <div key={i} className="flex-1 min-w-0">
                <StatCard
                  title={stat.title}
                  value={stat.value}
                  subtitle={stat.subtitle}
                  icon={ICON_MAP[stat.icon]}
                  variant={i === 0 ? 'orange' : 'white'}
                  iconColorClass={stat.iconColorClass}
                  tags={stat.tags}
                />
              </div>
            ))}
          </div>

          {/* Row 2: Chart (Priority - Min 320px or Flex-1) */}
          <div className="flex gap-4 w-full h-[320px] shrink-0">
            <div className="w-[75%] min-w-0 h-full">
              <RevenueChart data={REVENUE_CHART_DATA} />
            </div>
            <div className="w-[25%] min-w-0 h-full">
              <EventsList events={CALENDAR_EVENTS.slice(0, 3)} /> {/* Limit events if needed */}
            </div>
          </div>

          {/* Row 3: Collaborators + Meeting + Timer (Fixed 220px) */}
          <div className="flex gap-4 w-full h-[220px] shrink-0">
            <div className="w-[50%] min-w-0 h-full">
              <CollaboratorsList items={COLLABORATORS} />
            </div>
            <div className="w-[25%] min-w-0 h-full">
              <MeetingCard />
            </div>
            <div className="w-[25%] min-w-0 h-full">
              <TimerWidget />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
