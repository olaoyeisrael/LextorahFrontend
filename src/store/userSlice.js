import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: localStorage.getItem('firstName') || '',
  lastName: localStorage.getItem('lastName') || '',
  email: '',
  token: localStorage.getItem('token') || null,
  user_id: localStorage.getItem('user_id') || null,
  role: localStorage.getItem('role') || '',
  enrolledCourse: localStorage.getItem('enrolledCourse') || null,
  enrolledLevel: localStorage.getItem('enrolledLevel') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.role = action.payload.role;
      state.enrolledCourse = action.payload.enrolledCourse;
      state.enrolledLevel = action.payload.enrolledLevel;
      
      // Persist to localStorage
      localStorage.setItem('firstName', state.firstName);
      localStorage.setItem('lastName', state.lastName);
      localStorage.setItem('token', state.token);
      localStorage.setItem('user_id', state.user_id);
      localStorage.setItem('role', state.role);
      if (state.enrolledCourse) localStorage.setItem('enrolledCourse', state.enrolledCourse);
      if (state.enrolledLevel) localStorage.setItem('enrolledLevel', state.enrolledLevel);
    },
    updateEnrollment: (state, action) => {
        state.enrolledCourse = action.payload.course;
        state.enrolledLevel = action.payload.level;
        localStorage.setItem('enrolledCourse', action.payload.course);
        localStorage.setItem('enrolledLevel', action.payload.level);
    },
    logout: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.token = null;
      state.user_id = null;
      state.role = '';
      state.enrolledCourse = null;
      state.enrolledLevel = null;

      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('role');
      localStorage.removeItem('enrolledCourse');
      localStorage.removeItem('enrolledLevel');
    },
  },
});

export const { setUser, logout, updateEnrollment } = userSlice.actions;
export default userSlice.reducer;
