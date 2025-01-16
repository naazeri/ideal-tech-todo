import {
  List,
  ListItem,
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material';
import ICheckbox from '../General/ICheckbox';
import Todo from '@/app/types/todo';
import TaskTime from './TaskTime';
import { TASK_FILTERS } from '@/app/constants/constants';
import { Refresh } from '@mui/icons-material';

interface TaskListProps {
  tasks: Todo[];
  loading: boolean;
  tab: number;
  activeFilter: string;
  onListItemClick: (task: Todo) => void;
  onTaskCompletion: (taskId: string, isCompleted: boolean) => void;
  onListRefresh: () => void;
}

const TaskList = ({
  tasks,
  loading,
  tab,
  activeFilter,
  onListItemClick,
  onTaskCompletion,
  onListRefresh,
}: TaskListProps) => {
  return (
    <Box sx={{ mt: 5, mb: 8, p: 0 }}>
      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      )}

      {/* No Tasks */}
      {!loading && tasks.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems={'center'}
        >
          <Typography color="textSecondary">No tasks available.</Typography>
          <Button
            startIcon={<Refresh />}
            onClick={onListRefresh}
            color="secondary"
            variant="outlined"
          >
            Try Again
          </Button>
        </Box>
      )}
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            onClick={() => onListItemClick(task)}
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
                <Box display="flex" flexDirection="column" gap={1}>
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
                <ICheckbox
                  checked={task.is_completed}
                  stopPropagation={true} // Prevent ListItem click
                  onChange={(e) => onTaskCompletion(task._id, e.target.checked)}
                />
              </Box>
              <Divider
                orientation="horizontal"
                sx={{
                  borderColor: '#D9D9D9',
                  my: 0.4,
                  mr: 1.6,
                }}
              />
              <TaskTime
                task={task}
                variant={
                  activeFilter === TASK_FILTERS.ARCHIVED
                    ? 'archivedTask'
                    : 'activeTask'
                }
                timePrefix={tab === 0 ? 'Today' : 'Tomorrow'}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
