'use client';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { isSameDay, addDays, startOfDay, isBefore } from 'date-fns';
import { Todo, CategorizedTasksType } from '../../types/todo';
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
import {
  useFetchTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/app/store/tasksApiSlice';
import { RequestCreate } from '@/app/types/request';

const TaskApp = () => {
  // Redux
  const { data: { data: tasks = [] } = {}, isLoading } = useFetchTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

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

    // Sort tasks by start_date in ascending order
    const sortedTasks = [...tasks].sort((a, b) =>
      new Date(a.start_date) > new Date(b.start_date) ? 1 : -1
    );

    // filter tasks by date(today or tomorrow)
    const dateFilteredTasks = sortedTasks.filter((task) =>
      isSameDay(new Date(task.start_date), dateFilter)
    );

    // filter tasks
    const openTasks = dateFilteredTasks.filter((task) => !task.is_completed);
    const closedTasks = dateFilteredTasks.filter((task) => task.is_completed);
    const archivedTasks = sortedTasks.filter((task) =>
      isBefore(new Date(task.end_date), startOfDay(new Date()))
    );

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

  useEffect(() => {
    // if details modal is open, update selected task
    if (selectedTask) {
      const newSelectedTask = tasks.find(
        (task) => task._id === selectedTask._id
      );
      setSelectedTask(newSelectedTask || null);
    }
  }, [tasks, selectedTask]);

  // Handle task completion
  const handleTaskCompletion = async (taskId: string, isCompleted: boolean) => {
    try {
      await updateTodo({
        id: taskId,
        todo: { is_completed: isCompleted },
      }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSnackbarMessage(error?.data?.message || 'Failed to update task');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
    }
  };

  // Handle new task submission
  const handleTaskSubmission = async (newTask: RequestCreate<Todo>) => {
    try {
      await createTodo(newTask).unwrap();
      setSnackbarMessage('Task added successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage('Failed to add task');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      closeModal();
    }
  };

  // Handle task deletion from the details modal
  const handleTaskDeletion = async (taskId: string) => {
    // dispatch(removeTodo(taskId));
    try {
      await deleteTodo(taskId).unwrap();
      setSnackbarMessage('Task deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage('Failed to delete task');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      closeDetailsModal();
    }
  };

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

  // Handle modal open/close
  const openModal = () => setNewTaskModalOpen(true);
  const closeModal = () => {
    // Reset form and close modal
    setNewTaskModalOpen(false);
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
          loading={isLoading}
          tab={tab}
          activeFilter={activeFilter}
          onListItemClick={openDetailsModal}
          onTaskCompletion={handleTaskCompletion}
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
