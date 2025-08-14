import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Project = {
  id: string;
  name: string;
};

interface ProjectState {
  list: Project[];
}

const initialState: ProjectState = {
  list: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.list = action.payload;
    },
    clearProjects(state) {
      state.list = [];
    },
  },
});

export const { setProjects, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
