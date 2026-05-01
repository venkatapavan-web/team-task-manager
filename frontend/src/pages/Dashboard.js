import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { CheckCircle, Clock, List, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      const data = response.data;
      setTasks(data);

      const now = new Date();
      const completed = data.filter(t => t.status === 'DONE').length;
      const pending = data.filter(t => t.status !== 'DONE').length;
      const overdue = data.filter(t => t.status !== 'DONE' && new Date(t.deadline) < now).length;

      setStats({ total: data.length, completed, pending, overdue });
    } catch (err) {
      console.error('Failed to fetch tasks');
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome, {user?.name || 'Pavan'}! ⭐</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening with your projects today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <List color="var(--primary)" size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Tasks</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.total}</div>
          </div>
        </div>

        <div className="glass card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(34, 197, 94, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <CheckCircle color="var(--success)" size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Completed</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.completed}</div>
          </div>
        </div>

        <div className="glass card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Clock color="var(--warning)" size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pending</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.pending}</div>
          </div>
        </div>

        <div className="glass card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <AlertCircle color="var(--danger)" size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Overdue</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.overdue}</div>
          </div>
        </div>
      </div>

      <div className="glass card">
        <h3 style={{ marginBottom: '20px' }}>Recent Tasks</h3>
        {tasks.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No tasks found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-glass)' }}>
                <th style={{ padding: '12px 0' }}>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tasks.slice(0, 5).map(task => (
                <tr key={task.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <td style={{ padding: '16px 0' }}>{task.title}</td>
                  <td><span className="badge" style={{ background: 'var(--bg-glass)' }}>{task.status}</span></td>
                  <td><span className={`badge badge-${task.priority.toLowerCase()}`}>{task.priority}</span></td>
                  <td>{task.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
