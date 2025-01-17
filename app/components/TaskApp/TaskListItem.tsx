import { TASK_FILTERS } from '@/app/constants/constants';
import { Todo } from '@/app/types/todo';
import { ListItem, Box, Typography, Divider } from '@mui/material';
import React from 'react';
import { useUpdateTodoMutation } from '@/app/store/features/task/tasksApiSlice';
import {
  openDetailsModal,
  showSnackbar,
} from '@/app/store/features/ui/uiSlice';
import { useAppDispatch } from '@/app/store/hooks';
import ICheckbox from '../General/ICheckbox';
import TaskTime from './TaskTime';

interface TaskListItemProps {
  task: Todo;
  tab: number;
  activeFilter: string;
}

const TaskListItem = ({ task, tab, activeFilter }: TaskListItemProps) => {
  const dispatch = useAppDispatch();
  const [updateTodo] = useUpdateTodoMutation();

  // Handle task completion
  const handleTaskCompletion = async (taskId: string, isCompleted: boolean) => {
    try {
      await updateTodo({
        id: taskId,
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
    } finally {
    }
  };

  // Handle details modal open/close
  const handleListItemClick = (task: Todo) => {
    return dispatch(openDetailsModal(task));
  };

  return (
    <ListItem
      key={task._id}
      onClick={() => handleListItemClick(task)}
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
            onChange={(e) => handleTaskCompletion(task._id, e.target.checked)}
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
