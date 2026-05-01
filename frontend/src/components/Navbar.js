import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout, LogOut, CheckSquare, FolderGit2, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="glass" style={{ margin: '20px', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700, fontSize: '1.2rem' }}>
        <Layout color="var(--primary)" />
        <span>TeamTask</span>
      </div>
      
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>
          <Home size={18} /> Dashboard
        </Link>
        <Link to="/projects" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>
          <FolderGit2 size={18} /> Projects
        </Link>
        <Link to="/tasks" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>
          <CheckSquare size={18} /> Tasks
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>{user.role}</div>
        </div>
        <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '8px' }}>
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
