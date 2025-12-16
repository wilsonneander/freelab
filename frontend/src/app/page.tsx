"use client";

import React from 'react';
import { Folder, Users, CheckSquare, TrendingUp } from 'lucide-react';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { RevenueChart } from '@/features/dashboard/components/RevenueChart';
import { CollaboratorsList } from '@/features/dashboard/components/CollaboratorsList';
import { EventsList } from '@/features/dashboard/components/EventsList';
import { TimerWidget, MeetingCard } from '@/features/dashboard/components/Widgets';
import { REVENUE_CHART_DATA, COLLABORATORS, CALENDAR_EVENTS, DASHBOARD_STATS } from '@/features/dashboard/services/mockData';

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
      <div className="flex-1 bg-[#FFF5F0]/55 backdrop-blur-[20px] rounded-[32px] p-8 flex flex-col overflow-y-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] border border-white/60">

        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-1">Dashboard</h1>
          <p className="text-white/90">Acompanhe todas as métricas de <strong className="font-semibold">Avoice Company</strong></p>
        </div>

        <div className="grid grid-cols-[3fr_1fr] gap-8 h-full">

          {/* Left Column */}
          <div className="flex flex-col gap-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              {DASHBOARD_STATS.map((stat, i) => (
                <StatCard
                  key={i}
                  title={stat.title}
                  value={stat.value}
                  subtitle={stat.subtitle}
                  icon={ICON_MAP[stat.icon]}
                  variant={stat.variant as any}
                  iconColorClass={stat.iconColorClass}
                  tags={stat.tags}
                />
              ))}
            </div>

            <RevenueChart data={REVENUE_CHART_DATA} />

            <CollaboratorsList items={COLLABORATORS} />
          </div>

          {/* Right Column (Events) */}
          <div className="flex flex-col h-full">
            <EventsList events={CALENDAR_EVENTS} />
            <MeetingCard />
            <TimerWidget />
          </div>

        </div>
      </div>
    </div>
  );
}
