import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { Todo } from '@/app/lib/types/todo';

interface TaskTimeProps {
  task: Todo;
  variant: 'activeTask' | 'archivedTask' | 'taskDetails';
  timePrefix?: string;
}

const TaskTime = ({ task, variant, timePrefix }: TaskTimeProps) => {
  function getTime(): string {
    switch (variant) {
      case 'activeTask':
        return timePrefix ?? '' + format(new Date(task.start_date), 'PP');

      case 'archivedTask':
        return task.start_date.split('T')[0];

      case 'taskDetails':
        return format(new Date(task.start_date), 'PP');

      default:
        return '';
    }
  }

  return (
    <Box display="flex" flexDirection="row" justifyContent="start" gap={1}>
      <Typography variant="body2" color="textDisabled">
        {getTime()}
      </Typography>
      <Typography variant="body2" color="#BFBFBF">
        {` ${format(new Date(task.start_date), 'hh:mm a')} - ${format(
          new Date(task.end_date),
          'hh:mm a'
        )}`}
      </Typography>
    </Box>
  );
};

export default TaskTime;
