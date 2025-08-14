import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import './ProjectDropdown.css';
import { db } from '../../utils/firebaseConfig';

type Project = {
  id: string;
  name: string;
};

const ProjectDropdown: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'projects'));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: (doc.data().name as string) || '(unnamed project)',
        }));
        setProjects(list);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedId(value);
    if (value) alert(`Selected project ID: ${value}`);
  };

  return (
    <div className="project-dropdown-container">
      <label htmlFor="project-select">Select Project</label>
      <select id="project-select" value={selectedId} onChange={handleChange}>
        <option value="">-- Choose a project --</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectDropdown;
