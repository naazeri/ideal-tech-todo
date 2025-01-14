'use client';

import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
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
  Avatar,
} from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getTodos, addTodo, editTodo, removeTodo } from '../store/tasksSlice';
import CustomChip from './CustomChip';

const TaskApp = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading, error, message } = useSelector(
    (state: RootState) => state.tasks
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState(emptyTask);

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

  // Handle task completion
  const handleTaskCompletion = (taskId: string, isCompleted: boolean) => {
    dispatch(editTodo({ id: taskId, todo: { is_completed: isCompleted } }));
  };

  // Handle task deletion
  const handleTaskDeletion = (taskId: string) => {
    dispatch(removeTodo(taskId));
  };

  // Handle modal open/close
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

    // Reset form and close modal
    setNewTask(emptyTask);
    closeModal();
  };

  return (
    <Box sx={{ width: '100%', p: 0, backgroundColor: '#f5f5f5' }}>
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
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Today's Task" sx={{}} />
        <Tab label="Tomorrow's Task" />
      </Tabs>

      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Today&#39;s Task
          </Typography>
          <Typography variant="subtitle2" color="textDisabled">
            Wednesday, 11 May
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
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
          <Add sx={{ fontSize: '17px', marginRight: '8px' }} /> New Task
        </Button>
      </Box>

      {/* Filter Chips */}
      <Box display="flex" gap={2} mt={2}>
        <CustomChip label="All" badgeNumber={35} />
        <CustomChip label="All" badgeNumber={'14'} disabled />
        <Chip label="Open" color="default" variant="outlined" />
        <Chip label="Closed" color="default" variant="outlined" />
        <Chip label="Archived" color="default" variant="outlined" />
      </Box>

      {/* Task List */}
      <Box sx={{ mt: 3, backgroundColor: '#ffffff', borderRadius: 2, p: 2 }}>
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

        {!loading && tasks.length === 0 && (
          <Typography textAlign="center" color="textSecondary">
            No tasks available.
          </Typography>
        )}

        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
                py: 1.5,
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    textDecoration: task.is_completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`${new Date(
                    task.start_date
                  ).toLocaleTimeString()} - ${new Date(
                    task.end_date
                  ).toLocaleTimeString()}`}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Checkbox
                  icon={<RadioButtonUnchecked color="disabled" />}
                  checkedIcon={<CheckCircle color="primary" />}
                  checked={task.is_completed}
                  onChange={(e) =>
                    handleTaskCompletion(task._id, e.target.checked)
                  }
                />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleTaskDeletion(task._id)}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Add New Task Modal */}
      <Dialog open={modalOpen} onClose={closeModal}>
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
            />
            <TextField
              label="End Date"
              name="end_date"
              type="datetime-local"
              value={newTask.end_date}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleTaskSubmission}
            color="primary"
            variant="contained"
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const emptyTask = { title: '', description: '', start_date: '', end_date: '' };

export default TaskApp;
