import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FolderPlus, Folder } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await api.get('/projects');
    setProjects(response.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post('/projects', newProject);
    setNewProject({ name: '', description: '' });
    setShowModal(false);
    fetchProjects();
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1>Projects</h1>
        {user?.role === 'ADMIN' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FolderPlus size={20} /> Create Project
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {projects.map(project => (
          <div key={project.id} className="glass card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Folder color="var(--accent-blue)" size={24} />
              <h3 style={{ margin: 0 }}>{project.name}</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', minHeight: '40px' }}>
              {project.description}
            </p>
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Created by: {project.createdBy?.name}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass card" style={{ width: '90%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '24px' }}>New Project</h2>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Project Name</label>
                <input 
                  type="text" 
                  value={newProject.name} 
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} 
                  required 
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
                <textarea 
                  rows="4"
                  value={newProject.description} 
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} 
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ background: 'var(--bg-glass)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
