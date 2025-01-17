import { TASK_FILTERS } from '@/app/constants/constants';
import { Todo } from '@/app/types/todo';
import { ListItem, Box, Typography, Divider } from '@mui/material';
import React from 'react';
import ICheckbox from '../General/ICheckbox';
import TaskTime from './TaskTime';

interface TaskListItemProps {
  task: Todo;
  tab: number;
  activeFilter: string;
  onListItemClick: (task: Todo) => void;
  onTaskCompletion: (taskId: string, isCompleted: boolean) => void;
}

const TaskListItem = ({
  task,
  tab,
  activeFilter,
  onListItemClick,
  onTaskCompletion,
}: TaskListItemProps) => {
  return (
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
          alignItems={'center'}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography
              variant="body1"
              sx={{
                textDecoration: task.is_completed ? 'line-through' : 'none',
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
  );
};

export default TaskListItem;
