import React from 'react';
import { Search, Bell, ChevronDown, Folder, Users, CheckSquare, TrendingUp, MoreVertical, Pause, Play } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

// Mock chart data
const chartData = [
    { name: 'Jan', value: 30 },
    { name: 'Fev', value: 40 },
    { name: 'Mar', value: 35 },
    { name: 'Abr', value: 50 },
    { name: 'Mai', value: 45 },
    { name: 'Jun', value: 70 }, // Peak
    { name: 'Jul', value: 60 },
];

const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">

            {/* 1. Floating Header Area */}
            <header className="top-header">
                <div className="greeting-section">
                    <h2>Bom dia Wendell, segue as atualizações do dia!</h2>
                </div>

                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search here" />
                    </div>
                    <button className="glass-btn padding-md">
                        <span>Clientes</span>
                        <ChevronDown size={16} />
                    </button>
                    <button className="glass-btn icon-only relative">
                        <Bell size={20} />
                        <span className="notif-badge">21</span>
                    </button>
                </div>
            </header>

            {/* 2. Main Dashboard Content Card */}
            <div className="dashboard-glass-panel glass-panel">

                <div className="panel-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Acompanhe todas as métricas de <strong>Avoice Company</strong></p>
                    </div>
                </div>

                {/* Grid Layout for Widgets */}
                <div className="dashboard-grid">

                    {/* Main Left Column */}
                    <div className="main-widgets">

                        {/* Stats Cards Row */}
                        <div className="stats-row">
                            <div className="stat-card active-orange">
                                <div className="stat-top">
                                    <div className="icon-wrapper glass">
                                        <Folder size={20} />
                                    </div>
                                    <span className="arrow-icon">↗</span>
                                </div>
                                <h3>Total Projects</h3>
                                <small>Updated 1 week ago</small>
                                <div className="tags-row">
                                    <span className="tag glass">Mobile</span>
                                    <span className="tag glass">2+ years exp.</span>
                                </div>
                                <div className="stat-value">38 <span>applications</span></div>
                            </div>

                            <div className="stat-card white">
                                <div className="stat-top">
                                    <div className="icon-wrapper dark">
                                        <Users size={20} color="white" />
                                    </div>
                                    <span className="arrow-icon">↗</span>
                                </div>
                                <h3>Clients</h3>
                                <small>Updated 1 week ago</small>
                                <div className="tags-row">
                                    <span className="tag">Remote</span>
                                    <span className="tag">2+ years exp.</span>
                                </div>
                                <div className="stat-value">38 <span>applications</span></div>
                            </div>

                            <div className="stat-card white">
                                <div className="stat-top">
                                    <div className="icon-wrapper yellow">
                                        <CheckSquare size={20} color="white" />
                                    </div>
                                    <span className="arrow-icon">↗</span>
                                </div>
                                <h3>Total Tasks</h3>
                                <small>Updated 1 week ago</small>
                                <div className="tags-row">
                                    <span className="tag">Remote</span>
                                    <span className="tag">2+ years exp.</span>
                                </div>
                                <div className="stat-value">38 <span>applications</span></div>
                            </div>

                            <div className="stat-card white">
                                <div className="stat-top">
                                    <div className="icon-wrapper green">
                                        <TrendingUp size={20} color="white" />
                                    </div>
                                    <span className="arrow-icon">↗</span>
                                </div>
                                <h3>Total income</h3>
                                <small>Updated 1 week ago</small>
                                <div className="tags-row">
                                    <span className="tag">Remote</span>
                                    <span className="tag">2+ years exp.</span>
                                </div>
                                <div className="stat-value">38 <span>applications</span></div>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="chart-section">
                            <div className="chart-header">
                                <h3>Claims Over the Years</h3>
                                <div className="chart-legend">
                                    <span className="dot pink"></span> Approved
                                    <span className="dot blue"></span> Submitted
                                </div>
                            </div>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height={200}>
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="value" stroke="#6C5CE7" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Collaborators List */}
                        <div className="collab-section">
                            <h3>Colaboradores</h3>
                            <div className="collab-list">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="collab-row card-white-sm">
                                        <div className="collab-info">
                                            <img src={`https://ui-avatars.com/api/?name=Aline+Dias&background=random`} className="avatar-sm" />
                                            <span>Aline Dias</span>
                                        </div>
                                        <div className="progress-mini">
                                            <div className="bar" style={{ width: '70%' }}></div>
                                        </div>
                                        <span className="badge-gold">+Gold</span>
                                        <MoreVertical size={16} className="more-btn" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar (Events) */}
                    <div className="right-widgets">
                        <h3 className="section-header-sm">Eventos</h3>
                        <div className="events-list">
                            <div className="event-card orange">
                                <div className="date-box">
                                    <span className="day">30</span>
                                    <span className="wday">Sex</span>
                                </div>
                                <div className="event-details">
                                    <h4>Desenvolvimento</h4>
                                    <small>Avoice Company</small>
                                    <span className="time">09:45 am - 10:45 am</span>
                                </div>
                            </div>

                            <div className="event-card yellow">
                                <div className="date-box">
                                    <span className="day">3</span>
                                    <span className="wday">Seg</span>
                                </div>
                                <div className="event-details">
                                    <h4>Daily</h4>
                                    <small>Mirum Agency</small>
                                    <span className="time">09:45 am - 10:45 am</span>
                                </div>
                            </div>

                            <div className="event-card white-bg">
                                <div className="date-box">
                                    <span className="day">6</span>
                                    <span className="wday">Qua</span>
                                </div>
                                <div className="event-details">
                                    <h4>Tráfego Pago</h4>
                                    <small>Garden Agency</small>
                                    <span className="time">09:45 am - 10:45 am</span>
                                </div>
                            </div>
                        </div>

                        <h3 className="section-header-sm mt-4">Reuniões</h3>
                        <div className="meeting-card card-white-sm">
                            <h4>Reunião com Mirum Agency 📹🟢</h4>
                            <small>Horário: 09:30 pm - 10:30 am</small>
                            <button className="btn-orange-full mt-2">📷 Entrar na Reunião</button>
                        </div>

                        <div className="timer-card active-orange mt-4">
                            <h3>Timer</h3>
                            <h1>01:24:08</h1>
                            <div className="timer-controls">
                                <button className="control-btn white"><Pause size={20} fill="black" /></button>
                                <button className="control-btn dark"><div className="square"></div></button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
