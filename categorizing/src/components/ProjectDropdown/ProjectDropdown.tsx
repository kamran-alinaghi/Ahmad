import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, updateDoc, deleteDoc, doc, } from 'firebase/firestore';
import './ProjectDropdown.css';
import type { RootState } from '../../redux/store';
import { db } from '../../utils/firebaseConfig';
import { setProjects } from '../../redux/projectSlice';
import PopupModal from '../PopupModal/PopupModal';

const ProjectDropdown: React.FC = () => {
    const projects = useSelector((state: RootState) => state.projects.list);
    const [selectedId, setSelectedId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDefault, setModalDefault] = useState('');
    const [showInput, setShowInput] = useState(true);
    const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete'>('add');

    const dispatch = useDispatch();

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedId(value);
        //if (value) alert(`Selected project ID: ${value}`);
    };

    const openAddModal = () => {
        setModalMode('add');
        setModalTitle('Add New Project');
        setModalDefault('');
        setShowInput(true);
        setModalVisible(true);
    };

    const openEditModal = () => {
        if (!selectedId) return alert('Select a project to edit');
        const current = projects.find((p) => p.id === selectedId);
        setModalMode('edit');
        setModalTitle('Edit Project Name');
        setModalDefault(current?.name || '');
        setShowInput(true);
        setModalVisible(true);
    };

    const openDeleteModal = () => {
        if (!selectedId) return alert('Select a project to delete');
        const current = projects.find((p) => p.id === selectedId);
        setModalMode('delete');
        setModalTitle(`Delete "${current?.name}"?`);
        setShowInput(false);
        setModalVisible(true);
    };

    const handleModalConfirm = async (value?: string) => {
        setModalVisible(false);

        if (modalMode === 'add') {
            if (!value?.trim()) return;
            try {
                const ref = await addDoc(collection(db, 'projects'), { name: value });
                const newProject = { id: ref.id, name: value };
                dispatch(setProjects([...projects, newProject]));
                setSelectedId(ref.id);
            } catch (error) {
                console.error('Failed to add project:', error);
                alert('Could not add project');
            }
        }

        if (modalMode === 'edit') {
            if (!value?.trim() || !selectedId) return;
            try {
                const ref = doc(db, 'projects', selectedId);
                await updateDoc(ref, { name: value });
                const updated = projects.map((p) =>
                    p.id === selectedId ? { ...p, name: value } : p
                );
                dispatch(setProjects(updated));
            } catch (error) {
                console.error('Failed to edit project:', error);
                alert('Could not update project');
            }
        }

        if (modalMode === 'delete') {
            if (!selectedId) return;
            try {
                await deleteDoc(doc(db, 'projects', selectedId));
                const updated = projects.filter((p) => p.id !== selectedId);
                dispatch(setProjects(updated));
                setSelectedId('');
            } catch (error) {
                console.error('Failed to delete project:', error);
                alert('Could not delete project');
            }
        }
    };

    return (
        <>
            <div className="project-dropdown-container">
                <label htmlFor="project-select">Select Project</label>
                <div className="project-dropdown-row">
                    <select id="project-select" value={selectedId} onChange={handleSelect}>
                        <option value="">-- Choose a project --</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>

                    <button
                        className="icon-button"
                        onClick={openAddModal}
                        title="Add project"
                    >
                        ＋
                    </button>

                    <button
                        className="icon-button"
                        onClick={openEditModal}
                        title="Edit project"
                    >
                        ✎
                    </button>

                    <button
                        className="icon-button delete"
                        onClick={openDeleteModal}
                        title="Delete project"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <PopupModal
                title={modalTitle}
                visible={modalVisible}
                defaultValue={modalDefault}
                onConfirm={handleModalConfirm}
                onCancel={() => setModalVisible(false)}
                showInput={showInput}
            />
        </>
    );
};

export default ProjectDropdown;
