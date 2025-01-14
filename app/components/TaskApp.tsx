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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getTodos, addTodo, editTodo, removeTodo } from '../store/tasksSlice';

const TaskApp = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

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
        is_completed: false,
      })
    );

    // Reset form and close modal
    setNewTask({ title: '', description: '', start_date: '', end_date: '' });
    closeModal();
  };

  return (
    <Box sx={{ width: '100%', p: 0, backgroundColor: '#f5f5f5' }}>
      {/* Tabs */}
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Today's Task" />
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
          <Typography variant="subtitle1" color="textSecondary">
            Wednesday, 11 May
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={openModal}
        >
          + New Task
        </Button>
      </Box>

      {/* Filter Chips */}
      <Box display="flex" gap={2} mt={2}>
        <Chip label="All" color="primary" variant="filled" />
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

export default TaskApp;
