import { TASK_FILTERS } from '@/app/lib/constants/constants';
import { Todo } from '@/app/lib/types/todo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
  open: boolean;
  message: string | null;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface UIState {
  tab: number;
  searchTerm: string;
  activeFilter: string;
  selectedTask: Todo | null;
  detailsModalOpen: boolean;
  newTaskModalOpen: boolean;
  snackbar: SnackbarState;
}

const initialState: UIState = {
  tab: 0,
  searchTerm: '',
  activeFilter: TASK_FILTERS.ALL,
  selectedTask: null,
  detailsModalOpen: false,
  newTaskModalOpen: false,
  snackbar: {
    open: false,
    message: null,
    severity: 'success',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setTab(state, action: PayloadAction<number>) {
      state.tab = action.payload;
      state.activeFilter = TASK_FILTERS.ALL;
    },

    setActiveFilter(state, action: PayloadAction<string>) {
      if (Object.values(TASK_FILTERS).includes(action.payload)) {
        state.activeFilter = action.payload;
      }
    },

    openDetailsModal(state, action: PayloadAction<Todo>) {
      state.selectedTask = action.payload;
      state.detailsModalOpen = true;
    },

    closeDetailsModal(state) {
      state.detailsModalOpen = false;
      state.selectedTask = null;
    },

    openNewTaskModal(state) {
      state.newTaskModalOpen = true;
    },

    closeNewTaskModal(state) {
      state.newTaskModalOpen = false;
    },

    showSnackbar(state, action: PayloadAction<Omit<SnackbarState, 'open'>>) {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    },

    hideSnackbar(state) {
      state.snackbar.open = false;
    },
  },
});

export const {
  setSearchTerm,
  setTab,
  setActiveFilter,
  openDetailsModal,
  closeDetailsModal,
  openNewTaskModal,
  closeNewTaskModal,
  showSnackbar,
  hideSnackbar,
} = uiSlice.actions;

export default uiSlice;
