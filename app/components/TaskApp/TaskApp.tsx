'use client';

import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { isSameDay, addDays, startOfDay, isBefore } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  getTodos,
  addTodo,
  editTodo,
  removeTodo,
} from '../../store/tasksSlice';
import Todo, { CategorizedTasksType, TodoCreate } from '../../types/todo';
import ISnackbar from '../General/ISnackbar';
import { TASK_FILTERS } from '@/app/constants/constants';
import TaskTabs from './TaskTabs';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import NewTaskModal from './Modals/NewTaskModal';
import TaskHeader from './TaskHeader';
import TaskDetailsModal from './Modals/TaskDetailsModal';
import TaskRootContainer from './TaskRootContainer';
import TaskTabContainer from './TaskTabContainer';

const TaskApp = () => {
  // Redux state
  const { tasks, loading, error, message } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch: AppDispatch = useDispatch();

  const [tab, setTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>(TASK_FILTERS.ALL);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');

  const categorizedTasks: CategorizedTasksType = useMemo(() => {
    const result: CategorizedTasksType = {
      filteredTasks: [],
      allTasksLength: 0,
      openTasksLength: 0,
      closedTasksLength: 0,
      archivedTasksLength: 0,
    };
    const dateFilter = tab === 0 ? new Date() : addDays(new Date(), 1); // today or tomorrow

    // filter tasks by date(today or tomorrow)
    const dateFilteredTasks = tasks.filter((task) =>
      isSameDay(new Date(task.start_date), dateFilter)
    );

    // filter tasks
    const openTasks = dateFilteredTasks.filter((task) => !task.is_completed);
    const closedTasks = dateFilteredTasks.filter((task) => task.is_completed);
    const archivedTasks = tasks.filter((task) =>
      isBefore(new Date(task.end_date), startOfDay(new Date()))
    ); // don't need to implement archived tasks

    // set filtered tasks length
    result.allTasksLength = dateFilteredTasks.length;
    result.openTasksLength = openTasks.length;
    result.closedTasksLength = closedTasks.length;
    result.archivedTasksLength = archivedTasks.length;

    // filter tasks by activeFilter
    switch (activeFilter) {
      case TASK_FILTERS.OPEN:
        result.filteredTasks = openTasks;
        break;
      case TASK_FILTERS.CLOSED:
        result.filteredTasks = closedTasks;
        break;
      case TASK_FILTERS.ARCHIVED:
        result.filteredTasks = archivedTasks;
        break;
      default:
        result.filteredTasks = dateFilteredTasks;
        break;
    }

    return result;
  }, [tab, tasks, activeFilter]);

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  // Show Snackbar for success or error
  useEffect(() => {
    if (message) {
      setSnackbarMessage(message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [message, error]);

  useEffect(() => {
    // if details modal is open, update selected task
    if (selectedTask) {
      const newSelectedTask = tasks.find(
        (task) => task._id === selectedTask._id
      );
      setSelectedTask(newSelectedTask || null);
    }
  }, [selectedTask, tasks]);

  // Handle Snackbar close
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  // Handle tab change
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    if (Object.values(TASK_FILTERS).includes(filter)) {
      setActiveFilter(filter);
    }
  };

  // Handle task completion
  const handleTaskCompletion = (taskId: string, isCompleted: boolean) => {
    dispatch(editTodo({ id: taskId, todo: { is_completed: isCompleted } }));
  };

  // Open the details modal
  const openDetailsModal = (task: Todo) => {
    setSelectedTask(task);
    setDetailsModalOpen(true);
  };

  // Close the details modal
  const closeDetailsModal = () => {
    setDetailsModalOpen(false);

    setTimeout(() => {
      setSelectedTask(null);
    }, 300); // for smooth close transition, remove this line
  };

  // Handle task deletion from the details modal
  const handleTaskDeletion = (taskId: string) => {
    dispatch(removeTodo(taskId));
    closeDetailsModal();
  };

  // Handle modal open/close
  const openModal = () => setNewTaskModalOpen(true);
  const closeModal = () => {
    // Reset form and close modal
    setNewTaskModalOpen(false);
  };

  // Handle new task submission
  const handleTaskSubmission = (newTask: TodoCreate) => {
    const { title, description, start_date, end_date } = newTask;

    // Dispatch addTodo action
    dispatch(
      addTodo({
        title,
        description,
        start_date: new Date(start_date).toISOString(),
        end_date: new Date(end_date).toISOString(),
      })
    );

    closeModal();
  };

  return (
    <TaskRootContainer>
      {/* Tabs */}
      <TaskTabs value={tab} onChange={handleTabChange} />

      {/* Tab Content Section */}
      <TaskTabContainer>
        {/* Global messages */}
        <ISnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
        />

        {/* Header Section */}
        <TaskHeader tab={tab} openModal={openModal} />

        {/* Filter Chips */}
        <TaskFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          categorizedTasks={categorizedTasks}
        />

        {/* Task List */}
        <TaskList
          tasks={categorizedTasks.filteredTasks}
          loading={loading}
          tab={tab}
          activeFilter={activeFilter}
          onListItemClick={openDetailsModal}
          onTaskCompletion={handleTaskCompletion}
          onListRefresh={() => dispatch(getTodos())}
        />

        {/* Task Details Modal */}
        <TaskDetailsModal
          open={detailsModalOpen}
          task={selectedTask}
          onClose={closeDetailsModal}
          onTaskCompletion={handleTaskCompletion}
          onTaskDeletion={handleTaskDeletion}
        />

        {/* Add New Task Modal */}
        <NewTaskModal
          openModal={newTaskModalOpen}
          onCloseModal={closeModal}
          onTaskSubmission={handleTaskSubmission}
        />
      </TaskTabContainer>
    </TaskRootContainer>
  );
};

export default TaskApp;
