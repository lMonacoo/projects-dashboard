import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProject, IProjectSlice } from '~/interfaces';
import { findBiggerNumberInArray, getPropertyInArray } from '~/utils';

import initialProjects from './mock';

const initialState: IProjectSlice = {
  allProjects: initialProjects
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Omit<IProject, 'id'>>) {
      const allExistentIds = getPropertyInArray<IProject>(state.allProjects, 'id') as number[];
      const getBiggerId = findBiggerNumberInArray(allExistentIds);

      state.allProjects.push({ ...action.payload, id: getBiggerId + 1 });
    },
    removeProject(state, action: PayloadAction<number>) {
      const filteredProjects = state.allProjects.filter(project => project.id !== action.payload);
      state.allProjects = filteredProjects;
    }
  }
});

export const { addProject, removeProject } = projectSlice.actions;
export default projectSlice.reducer;
