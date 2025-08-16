import React from 'react';
import LogoutButton from '../Logout/LogoutComponent';
import ProjectDropdown from '../ProjectDropdown/ProjectDropdown';
import TableContainer from '../TableContainer/TableContainer';
const ProjectSelection: React.FC = () => {
  return <div>
    <LogoutButton/>
    <ProjectDropdown/>
    <TableContainer/>
    <h1 style={{ textAlign: 'center' }}>ProjectSelection</h1>
    </div>;
};
export default ProjectSelection;

