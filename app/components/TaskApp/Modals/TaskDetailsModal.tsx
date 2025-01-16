import Todo from '@/app/types/todo';
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

interface TaskDetailsModalProps {
  open: boolean;
  task: Todo | null;
  onClose: () => void;
  onTaskCompletion: (taskId: string, isCompleted: boolean) => void;
  onTaskDeletion: (taskId: string) => void;
}

const TaskDetailsModal = ({
  open,
  task,
  onClose,
  onTaskCompletion,
  onTaskDeletion,
}: TaskDetailsModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      {task && (
        <Box mx={2} my={1}>
          <DialogContent>
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              alignItems={'start'}
            >
              <Box display="flex" flexDirection="row" alignItems={'center'}>
                <Typography variant="h6">{task.title}</Typography>
                <ICheckbox
                  checked={task.is_completed}
                  onChange={(e) => onTaskCompletion(task._id, e.target.checked)}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                {task.description}
              </Typography>
              <Divider
                orientation="horizontal"
                sx={{
                  width: '100%',
                  my: 1,
                }}
              />
              <TaskTime task={task} variant="taskDetails" />
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Button onClick={onClose} variant="outlined" color="inherit">
              Close
            </Button>
            <Button
              startIcon={<Delete />}
              onClick={() => onTaskDeletion(task._id)}
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
