import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Filter } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterMyTasks, setFilterMyTasks] = useState(false);
  const [newTask, setNewTask] = useState({ 
    title: '', description: '', status: 'TODO', priority: 'MEDIUM', deadline: '', assignedTo: { id: '' }, project: { id: '' } 
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
    if (user?.role === 'ADMIN') {
      fetchProjects();
      fetchUsers();
    }
  }, []);

  const fetchTasks = async () => {
    const response = await api.get('/tasks');
    setTasks(response.data);
  };

  const fetchProjects = async () => {
    const response = await api.get('/projects');
    setProjects(response.data);
  };

  const fetchUsers = async () => {
    // For simplicity, using a mock or separate endpoint if existed. 
    // In a real app, you'd have GET /users. Let's assume we can fetch them.
    try {
      const response = await api.get('/auth/users'); // I should add this endpoint or handle it
      setUsers(response.data);
    } catch (e) {
      // If endpoint doesn't exist, just use current user as option
      setUsers([user]);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post('/tasks', newTask);
    setShowModal(false);
    setNewTask({ title: '', description: '', status: 'TODO', priority: 'MEDIUM', deadline: '', assignedTo: { id: '' }, project: { id: '' } });
    fetchTasks();
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task status:", err);
      alert("Failed to update status: " + (err.response?.data || err.message));
    }
  };

  const filteredTasks = filterMyTasks 
    ? tasks.filter(t => t.assignedTo?.email === user.email)
    : tasks;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1>Tasks</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setFilterMyTasks(!filterMyTasks)}>
            <Filter size={18} color={filterMyTasks ? 'var(--primary)' : 'var(--text-secondary)'} />
            <span style={{ color: filterMyTasks ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 500 }}>
              {filterMyTasks ? 'Showing My Tasks' : 'Showing All'}
            </span>
          </div>
          {user?.role === 'ADMIN' && (
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <PlusCircle size={20} /> Create Task
            </button>
          )}
        </div>
      </div>

      <div className="glass card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '16px' }}>Task</th>
              <th>Project</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 600 }}>{task.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{task.description?.substring(0, 30)}...</div>
                </td>
                <td>{task.project?.name}</td>
                <td>{task.assignedTo?.name || 'Unassigned'}</td>
                <td><span className={`badge badge-${task.priority.toLowerCase()}`}>{task.priority}</span></td>
                <td>{task.deadline}</td>
                <td><span className="badge" style={{ background: 'var(--bg-glass)' }}>{task.status}</span></td>
                <td>
                  <select 
                    style={{ padding: '4px 8px', width: 'auto' }}
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value)}
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass card" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '24px' }}>New Task</h2>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Title</label>
                <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
                <textarea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Priority</label>
                  <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Deadline</label>
                  <input type="date" value={newTask.deadline} onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Project</label>
                  <select value={newTask.project.id} onChange={(e) => setNewTask({ ...newTask, project: { id: e.target.value } })} required>
                    <option value="">Select Project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Assign To</label>
                  <select value={newTask.assignedTo.id} onChange={(e) => setNewTask({ ...newTask, assignedTo: { id: e.target.value } })} required>
                    <option value="">Select Member</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ background: 'var(--bg-glass)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
