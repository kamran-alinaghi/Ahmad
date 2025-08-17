import React from 'react';
import LogoutButton from '../Logout/LogoutComponent';
import ProjectDropdown from '../ProjectDropdown/ProjectDropdown';
import TableContainer from '../TableContainer/TableContainer';
const ProjectSelection: React.FC = () => {
  return <div>
    <LogoutButton/>
    <ProjectDropdown/>
    <TableContainer/>
    </div>;
};
export default ProjectSelection;

