import { type RootState } from './store';

export const selectCurrentProject = (state: RootState) => {
  const id = state.projects.selectedProjectId;
  return state.projects.list.find(p => p.id === id) || null;
};
