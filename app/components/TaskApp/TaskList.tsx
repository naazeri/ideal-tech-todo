import { List, Box, Typography, CircularProgress } from '@mui/material';
import { Todo } from '@/app/types/todo';
import TaskListItem from './TaskListItem';

interface TaskListProps {
  tasks: Todo[];
  loading: boolean;
  tab: number;
  activeFilter: string;
  onListItemClick: (task: Todo) => void;
  onTaskCompletion: (taskId: string, isCompleted: boolean) => void;
}

const TaskList = ({
  tasks,
  loading,
  tab,
  activeFilter,
  onListItemClick,
  onTaskCompletion,
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
        <Typography textAlign="center" color="textSecondary">
          No tasks available.
        </Typography>
      )}

      {/* Tasks List */}
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {tasks.map((task) => (
          <TaskListItem
            key={task._id}
            task={task}
            tab={tab}
            activeFilter={activeFilter}
            onListItemClick={onListItemClick}
            onTaskCompletion={onTaskCompletion}
          />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
