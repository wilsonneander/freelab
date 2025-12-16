import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutGrid,
    Folder,
    MessageCircle,
    CheckSquare,
    Wallet,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Plus
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const navItems = [
        { icon: LayoutGrid, label: 'Dashboard', path: '/' },
        { icon: Folder, label: 'Projetos', path: '/projects' },
        { icon: MessageCircle, label: 'Chat', path: '/chat' },
        { icon: CheckSquare, label: 'Tarefas', path: '/tasks' },
        { icon: Wallet, label: 'Financeiro', path: '/finance' },
    ];

    const collaborators = [
        { name: 'Erik Gunsel', avatar: 'https://ui-avatars.com/api/?name=Erik+Gunsel&background=random' },
        { name: 'Emily Smith', avatar: 'https://ui-avatars.com/api/?name=Emily+Smith&background=random' },
        { name: 'Arthur Adelk', avatar: 'https://ui-avatars.com/api/?name=Arthur+Adelk&background=random' },
    ];

    return (
        <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
            {/* Toggle Button (Optional UI element to trigger collapse, usually implies a button somewhere) */}
            <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle Sidebar">
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* 1. Company Switcher */}
            <div className="company-switcher">
                <div className="logo-box">
                    <span className="logo-initials">AV</span>
                </div>
                {!isCollapsed && (
                    <div className="company-info fade-in">
                        <span className="company-name">Avoice Company</span>
                        <ChevronDown size={16} className="arrow-icon" />
                    </div>
                )}
            </div>

            <div className="sidebar-scrollable">
                {/* 2. Main Navigation */}
                <div className="nav-section">
                    {!isCollapsed && <p className="section-title fade-in">HOME</p>}
                    <nav className="nav-list">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                            >
                                <div className="icon-container">
                                    <item.icon size={24} />
                                </div>
                                {!isCollapsed && <span className="nav-label fade-in">{item.label}</span>}

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && <div className="tooltip">{item.label}</div>}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* 3. Messages Section */}
                <div className="nav-section">
                    {!isCollapsed && (
                        <div className="section-header fade-in">
                            <p className="section-title">MESSAGES</p>
                            <button className="add-btn"><Plus size={16} /></button>
                        </div>
                    )}

                    <div className="collaborators-list">
                        {collaborators.map((user, idx) => (
                            <div key={idx} className="collaborator-row">
                                <div className="avatar-wrapper">
                                    <img src={user.avatar} alt={user.name} className="avatar-sm" />
                                    <span className="status-dot"></span>
                                </div>
                                {!isCollapsed && <span className="collaborator-name fade-in">{user.name}</span>}

                                {isCollapsed && <div className="tooltip">{user.name}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. User Profile (Footer) */}
            <div className="user-profile">
                <img
                    src="https://ui-avatars.com/api/?name=Wendell+Neander&background=000"
                    alt="User"
                    className="avatar-md"
                />
                {!isCollapsed && (
                    <div className="profile-info fade-in">
                        <small className="user-role">Desenvolvedor Backend</small>
                        <span className="user-name">Wendell Neander</span>
                    </div>
                )}

                {isCollapsed && (
                    <div className="tooltip profile-tooltip">
                        <strong>Wendell Neander</strong>
                        <span>Dev Backend</span>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
