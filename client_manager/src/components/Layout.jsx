import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../index.css'; // Ensure global tokens are available

const Layout = () => {
    return (
        // Note: The #root in index.css already handles the outer flex container and padding
        <>
            <Sidebar />
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                overflow: 'hidden' /* Prevent full page scroll, handle inside components */
            }}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
