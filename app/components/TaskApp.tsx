'use client';

import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  Tab,
  Tabs,
  Typography,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Add,
  Delete,
} from '@mui/icons-material';
import { isSameDay, addDays, startOfDay, isBefore, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getTodos, addTodo, editTodo, removeTodo } from '../store/tasksSlice';
import IChip from './IChip';
import Todo, { TodoCreate } from '../model/todo';

const TaskApp = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading, error, message } = useSelector(
    (state: RootState) => state.tasks
  );

  const [tab, setTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>(taskFilters.all);
  const selectedTask = useRef<Todo | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<TodoCreate>(emptyTask);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
      case taskFilters.open:
        result.filteredTasks = openTasks;
        break;
      case taskFilters.closed:
        result.filteredTasks = closedTasks;
        break;
      case taskFilters.archived:
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

  // Show Snackbar when message changes
  useEffect(() => {
    if (message) {
      setSnackbarOpen(true);
    }
  }, [message]);

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
  const handleFilterChange = (filterName: string) => {
    setActiveFilter(filterName);
  };

  // Handle task completion
  const handleTaskCompletion = (taskId: string, isCompleted: boolean) => {
    dispatch(editTodo({ id: taskId, todo: { is_completed: isCompleted } }));
  };

  // Open the details modal
  const openDetailsModal = (task: Todo) => {
    selectedTask.current = task;
    setDetailsModalOpen(true);
  };

  // Close the details modal
  const closeDetailsModal = () => {
    setDetailsModalOpen(false);

    setTimeout(() => {
      selectedTask.current = null;
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
    setNewTask(emptyTask);
    setNewTaskModalOpen(false);
  };

  // Handle form field changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Handle new task submission
  const handleTaskSubmission = () => {
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
    <Box sx={{ width: '100%' }}>
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {message}
        </Alert>
      </Snackbar>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="inherit"
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#000000',
          },
        }}
      >
        <Tab label="Today's Task" />
        <Tab label="Tomorrow's Task" />
      </Tabs>

      {/* Tab Content Section */}
      <Box sx={{ px: 3 }}>
        {/* Header Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {tab === 0 ? "Today's" : "Tomorrow's"} Task
            </Typography>
            <Typography variant="subtitle2" color="textDisabled">
              {/* show current date like: Wednesday , 11 May */}
              {format(
                tab === 0 ? new Date() : addDays(new Date(), 1),
                'EEEE , dd MMMM'
              )}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            sx={{
              textTransform: 'none',
              backgroundColor: '#0760FB1A',
              color: 'primary.main',
              borderRadius: '10px',
              fontSize: '14px',
              padding: '8px 16px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#0760FB26',
                boxShadow: 'none',
              },
            }}
            onClick={openModal}
          >
            New Task
          </Button>
        </Box>

        {/* Filter Chips */}
        <Box display="flex" gap={2} mt={2}>
          <IChip
            label={taskFilters.all}
            badgeNumber={categorizedTasks.allTasksLength}
            disabled={activeFilter !== taskFilters.all}
            onClick={() => handleFilterChange(taskFilters.all)}
          />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: 'text.disabled' }}
          />
          <IChip
            label={taskFilters.open}
            badgeNumber={categorizedTasks.openTasksLength}
            disabled={activeFilter !== taskFilters.open}
            onClick={() => handleFilterChange(taskFilters.open)}
          />
          <IChip
            label={taskFilters.closed}
            badgeNumber={categorizedTasks.closedTasksLength}
            disabled={activeFilter !== taskFilters.closed}
            onClick={() => handleFilterChange(taskFilters.closed)}
          />
          <IChip
            label={taskFilters.archived}
            badgeNumber={categorizedTasks.archivedTasksLength}
            disabled={activeFilter !== taskFilters.archived}
            onClick={() => handleFilterChange(taskFilters.archived)}
          />
        </Box>

        {/* Task List */}
        <Box sx={{ mt: 5, mb: 8, p: 0 }}>
          {loading && (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          {!loading && categorizedTasks.filteredTasks?.length === 0 && (
            <Typography textAlign="center" color="textSecondary">
              No tasks available.
            </Typography>
          )}

          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {categorizedTasks.filteredTasks?.map((task) => (
              <ListItem
                key={task._id}
                onClick={() => openDetailsModal(task)}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  py: 2,
                  cursor: 'pointer',
                }}
              >
                <Box display="flex" flexDirection="column" gap={1} width="100%">
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Box display="flex" flexDirection="column">
                      <Typography
                        variant="body1"
                        sx={{
                          textDecoration: task.is_completed
                            ? 'line-through'
                            : 'none',
                        }}
                      >
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="textDisabled">
                        {task.description}
                      </Typography>
                    </Box>
                    <Checkbox
                      icon={<RadioButtonUnchecked color="disabled" />}
                      checkedIcon={<CheckCircle color="primary" />}
                      checked={task.is_completed}
                      onClick={(e) => e.stopPropagation()} // Prevent ListItem click
                      onChange={(e) =>
                        handleTaskCompletion(task._id, e.target.checked)
                      }
                    />
                  </Box>
                  <Divider
                    orientation="horizontal"
                    sx={{
                      borderColor: '#D9D9D9',
                      width: '100%',
                      my: 1,
                    }}
                  />
                  <TaskTime
                    task={task}
                    firstPartType="day"
                    tab={tab}
                    activeFilter={activeFilter}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Task Details Modal */}
        <Dialog
          open={detailsModalOpen}
          onClose={closeDetailsModal}
          maxWidth="xs"
        >
          {selectedTask.current && (
            <>
              <DialogContent>
                <Box display="flex" flexDirection="column" gap={1} m={1}>
                  <Typography variant="h6">
                    {selectedTask.current.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedTask.current.description}
                  </Typography>
                  <Divider
                    orientation="horizontal"
                    sx={{
                      width: '100%',
                      my: 1,
                    }}
                  />
                  <TaskTime
                    task={selectedTask.current}
                    firstPartType="full_date"
                  />
                </Box>
              </DialogContent>
              <DialogActions
                sx={{ display: 'flex', justifyContent: 'space-evenly' }}
              >
                <Button
                  onClick={closeDetailsModal}
                  variant="outlined"
                  color="inherit"
                >
                  Close
                </Button>
                <Button
                  startIcon={<Delete />}
                  onClick={() =>
                    selectedTask.current &&
                    handleTaskDeletion(selectedTask.current._id)
                  }
                  color="error"
                  variant="contained"
                >
                  Delete Task
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Add New Task Modal */}
        <Dialog
          open={newTaskModalOpen}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
              closeModal();
            }
          }}
        >
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                label="Description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Start Date"
                name="start_date"
                type="datetime-local"
                value={newTask.start_date}
                onChange={handleInputChange}
                fullWidth
                required
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                label="End Date"
                name="end_date"
                type="datetime-local"
                value={newTask.end_date}
                onChange={handleInputChange}
                fullWidth
                required
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Button onClick={closeModal} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button
              startIcon={<Add />}
              color="primary"
              variant="contained"
              onClick={handleTaskSubmission}
            >
              Add New Task
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

function TaskTime({
  task,
  firstPartType = 'day',
  tab,
  activeFilter,
}: {
  task: Todo;
  firstPartType: 'full_date' | 'day';
  tab?: number;
  activeFilter?: string;
}) {
  function getTaskDate(task: Todo): string {
    if (activeFilter !== taskFilters.archived) {
      return tab === 0 ? 'Today' : 'Tomorrow';
    } else {
      return task.start_date.split('T')[0];
    }
  }

  return (
    <Box display="flex" flexDirection="row" justifyContent="start" gap={1}>
      <Typography variant="body2" color="textDisabled">
        {firstPartType === 'day'
          ? getTaskDate(task)
          : format(new Date(task.end_date), 'PP')}
      </Typography>
      <Typography variant="body2" color="#BFBFBF">
        {` ${format(new Date(task.start_date), 'hh:mm a')} - ${format(
          new Date(task.end_date),
          'hh:mm a'
        )}`}
      </Typography>
    </Box>
  );
}

const emptyTask: TodoCreate = {
  title: '',
  description: '',
  start_date: '',
  end_date: '',
};
const taskFilters = {
  all: 'All',
  open: 'Open',
  closed: 'Closed',
  archived: 'Archived',
};
type CategorizedTasksType = {
  filteredTasks: Todo[];
  allTasksLength: number;
  openTasksLength: number;
  closedTasksLength: number;
  archivedTasksLength: number;
};

export default TaskApp;
