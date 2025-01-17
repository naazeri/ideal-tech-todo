import { useCreateTodoMutation } from '@/app/store/features/task/tasksApiSlice';
import {
  closeNewTaskModal,
  showSnackbar,
} from '@/app/store/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { RootState } from '@/app/store/store';
import { RequestCreate } from '@/app/types/request';
import { Todo } from '@/app/types/todo';
import { Add } from '@mui/icons-material';
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { addHours, format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';

const NewTaskModal = () => {
  const dispatch = useAppDispatch();
  const { newTaskModalOpen } = useAppSelector((state: RootState) => state.ui);
  const [createTodo] = useCreateTodoMutation();

  const DEFAULT_TASK_VALUES: RequestCreate<Todo> = {
    title: '',
    description: '',
    start_date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    end_date: format(addHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RequestCreate<Todo>>({
    defaultValues: DEFAULT_TASK_VALUES,
  });

  // Handle new task submission
  const handleTaskSubmission = async (newTask: RequestCreate<Todo>) => {
    // Convert start_date and end_date to ISO
    newTask.start_date = new Date(newTask.start_date).toISOString();
    newTask.end_date = new Date(newTask.end_date).toISOString();

    try {
      await createTodo(newTask).unwrap();
      dispatch(
        showSnackbar({
          message: 'Task added successfully',
          severity: 'success',
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error?.data?.message || 'Failed to add task',
          severity: 'error',
        })
      );
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    dispatch(closeNewTaskModal());

    setTimeout(() => {
      reset(DEFAULT_TASK_VALUES);
    }, 300);
  };

  return (
    <Dialog
      open={newTaskModalOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          handleCloseModal();
        }
      }}
    >
      <Box mx={1} my={2}>
        <DialogTitle>Enter New Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleTaskSubmission)}>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: 'Title is required',
                  maxLength: {
                    value: 64,
                    message: 'Title must be at most 64 characters long',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{
                  required: 'Description is required',
                  maxLength: {
                    value: 256,
                    message: 'Description must be at most 256 characters long',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="start_date"
                control={control}
                rules={{ required: 'Start Date is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Start Date"
                    type="datetime-local"
                    fullWidth
                    error={!!errors.start_date}
                    helperText={errors.start_date?.message}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="end_date"
                control={control}
                rules={{ required: 'End Date is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="End Date"
                    type="datetime-local"
                    fullWidth
                    error={!!errors.end_date}
                    helperText={errors.end_date?.message}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button onClick={handleCloseModal} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            startIcon={<Add />}
            color="primary"
            variant="contained"
            onClick={handleSubmit(handleTaskSubmission)}
            sx={{
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            Add New Task
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default NewTaskModal;
