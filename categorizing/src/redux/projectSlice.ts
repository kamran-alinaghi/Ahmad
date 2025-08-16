import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { doc, updateDoc } from 'firebase/firestore';
import type { TableData } from '../components/DynamicTableBuilder/types';
import { db } from '../utils/firebaseConfig';

type Project = {
  id: string;
  name: string;
  table?: TableData;
};

interface ProjectState {
  list: Project[];
  selectedProjectId: string | null;
}

const initialState: ProjectState = {
  list: [],
  selectedProjectId: null,
};

// ✅ Thunk to save the table to Firestore
export const saveProjectTable = createAsyncThunk(
  'projects/saveProjectTable',
  async ({ projectId, table }: { projectId: string; table: TableData }) => {
    const ref = doc(db, 'projects', projectId);
    await updateDoc(ref, { table });
    return { projectId, table };
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProjects(state) { state.list = []; state.selectedProjectId = null; },
    setProjects(state, action: PayloadAction<Project[]>) { state.list = action.payload; },
    setSelectedProjectId(state, action: PayloadAction<string | null>) {
      state.selectedProjectId = action.payload;
    },
    updateProjectTable(
      state,
      action: PayloadAction<{ projectId: string; table: TableData }>
    ) {
      const { projectId, table } = action.payload;
      const project = state.list.find((p) => p.id === projectId);
      if (project) {
        project.table = table;
      }
    },
    // Optional: if you still want to populate list initially
    setProjectList(state, action: PayloadAction<Project[]>) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveProjectTable.fulfilled, (state, action) => {
      const { projectId, table } = action.payload;
      const project = state.list.find((p) => p.id === projectId);
      if (project) {
        project.table = table;
      }
    });
  },
});

export const { setSelectedProjectId, updateProjectTable, setProjectList, setProjects, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
