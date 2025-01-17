import { Delete } from '@mui/icons-material';
import {
  Dialog,
  Box,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
} from '@mui/material';
import ICheckbox from '../../General/ICheckbox';
import TaskTime from '../TaskTime';
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useFetchTodosQuery,
} from '@/app/store/features/task/tasksApiSlice';
import {
  closeDetailsModal,
  openDetailsModal,
  showSnackbar,
} from '@/app/store/features/ui/uiSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { RootState } from '@/app/store/store';

const TaskDetailsModal = () => {
  const dispatch = useAppDispatch();
  const { detailsModalOpen, selectedTask } = useAppSelector(
    (state: RootState) => state.ui
  );
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { data: { data: tasks = [] } = {} } = useFetchTodosQuery();

  // Automatically close the modal if the task is null
  useEffect(() => {
    if (detailsModalOpen && !selectedTask) {
      dispatch(closeDetailsModal());
    }
  }, [detailsModalOpen, selectedTask, dispatch]);

  // Update modal if the selected task is updated or deleted
  useEffect(() => {
    if (detailsModalOpen && selectedTask) {
      const updatedTask = tasks.find((task) => task._id === selectedTask._id);
      if (updatedTask) {
        dispatch(openDetailsModal(updatedTask)); // Update selected task
      } else {
        dispatch(closeDetailsModal()); // Close modal if the task is deleted
      }
    }
  }, [tasks, selectedTask, detailsModalOpen, dispatch]);

  // Handle task completion
  const handleTaskCompletion = async (isCompleted: boolean) => {
    if (!selectedTask) return;
    try {
      await updateTodo({
        id: selectedTask._id,
        todo: { is_completed: isCompleted },
      }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error?.data?.message || 'Failed to update task',
          severity: 'error',
        })
      );
    }
  };

  // Handle task deletion
  const handleTaskDeletion = async () => {
    if (!selectedTask) return;
    try {
      await deleteTodo(selectedTask._id).unwrap();

      handleClose();
      dispatch(
        showSnackbar({
          message: 'Task deleted successfully',
          severity: 'success',
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error?.data?.message || 'Failed to delete task',
          severity: 'error',
        })
      );
    }
  };

  // Handle modal close
  const handleClose = () => {
    dispatch(closeDetailsModal());
  };

  return (
    <Dialog open={detailsModalOpen} onClose={handleClose} maxWidth="xs">
      {selectedTask && (
        <Box mx={2} my={1}>
          <DialogContent>
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              alignItems={'start'}
            >
              <Box display="flex" flexDirection="row" alignItems={'center'}>
                <Typography variant="h6">{selectedTask.title}</Typography>
                <ICheckbox
                  checked={selectedTask.is_completed}
                  onChange={(e) => handleTaskCompletion(e.target.checked)}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                {selectedTask.description}
              </Typography>
              <Divider
                orientation="horizontal"
                sx={{
                  width: '100%',
                  my: 1,
                }}
              />
              <TaskTime task={selectedTask} variant="taskDetails" />
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Button onClick={handleClose} variant="outlined" color="inherit">
              Close
            </Button>
            <Button
              startIcon={<Delete />}
              onClick={handleTaskDeletion}
              color="error"
              variant="contained"
              sx={{
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}
            >
              Delete Task
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
};

export default TaskDetailsModal;
