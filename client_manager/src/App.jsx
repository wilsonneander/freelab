import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<div style={{ padding: '20px' }}><h2>Clients Page</h2><p>Coming Soon</p></div>} />
          <Route path="tasks" element={<div style={{ padding: '20px' }}><h2>Tasks Kanban</h2><p>Coming Soon</p></div>} />
          <Route path="finance" element={<div style={{ padding: '20px' }}><h2>Finance</h2><p>Coming Soon</p></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
