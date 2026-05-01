import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, UserPlus, LogIn } from 'lucide-react';

const Home = () => {
  return (
    <div className="container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '80vh', 
      textAlign: 'center' 
    }}>
      <div style={{ marginBottom: '24px' }}>
        <Layout size={64} color="var(--primary)" />
      </div>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>TeamTask Manager</h1>
      
      <p style={{ 
        fontSize: '1.2rem', 
        color: 'var(--text-secondary)', 
        maxWidth: '600px', 
        marginBottom: '40px',
        lineHeight: '1.6'
      }}>
        A simple and effective way to manage your team's tasks and projects. 
        Assign work, track progress, and collaborate in one place.
      </p>
      
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link to="/login" className="btn btn-primary" style={{ padding: '12px 32px' }}>
          <LogIn size={20} /> Login
        </Link>
        <Link to="/register" className="btn" style={{ 
          padding: '12px 32px', 
          background: 'var(--bg-glass)', 
          border: '1px solid var(--border-glass)' 
        }}>
          <UserPlus size={20} /> Register
        </Link>
      </div>
      
      <div style={{ marginTop: '64px', borderTop: '1px solid var(--border-glass)', paddingTop: '24px', width: '100%', maxWidth: '800px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Role-Based</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Separate flows for Admins and Members.</p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Project Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Organize tasks by specific projects.</p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Real-time</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Instant updates on task status changes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
