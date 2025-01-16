import { TodoCreate } from '@/app/types/todo';
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

interface NewTaskModalProps {
  openModal: boolean;
  onCloseModal: () => void;
  onTaskSubmission: (newTask: TodoCreate) => void;
}

const NewTaskModal = ({
  openModal,
  onCloseModal,
  onTaskSubmission,
}: NewTaskModalProps) => {
  const DEFAULT_TASK_VALUES: TodoCreate = {
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
  } = useForm<TodoCreate>({
    defaultValues: DEFAULT_TASK_VALUES,
  });

  const handleCloseModal = () => {
    onCloseModal();

    setTimeout(() => {
      reset(DEFAULT_TASK_VALUES);
    }, 300);
  };

  const onSubmit = (data: TodoCreate) => {
    onTaskSubmission(data); // Submit form data
    handleCloseModal(); // Close the modal
  };

  return (
    <Dialog
      open={openModal}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          handleCloseModal();
        }
      }}
    >
      <Box mx={1} my={2}>
        <DialogTitle>Enter New Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            onClick={handleSubmit(onSubmit)}
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
