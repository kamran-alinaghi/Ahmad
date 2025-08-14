import React from 'react';
import LogoutButton from '../Logout/LogoutComponent';
import ProjectDropdown from '../ProjectDropdown/ProjectDropdown';
const ProjectSelection: React.FC = () => {
  return <div>
    <LogoutButton/>
    <ProjectDropdown/>
    <h1 style={{ textAlign: 'center' }}>ProjectSelection</h1>
    </div>;
};
export default ProjectSelection;