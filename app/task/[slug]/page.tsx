'use client';
import ICheckbox from '@/app/components/General/ICheckbox';
import TaskTime from '@/app/components/TaskApp/TaskTime';
import { useFetchTodosQuery } from '@/app/lib/store/features/task/tasksApiSlice';
import { Box, Divider, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const TaskDetails = () => {
  const { slug } = useParams();
  const { data } = useFetchTodosQuery();

  const task = useMemo(() => {
    return data?.data.find((task) => task._id === slug);
  }, [slug, data]);

  if (!task) {
    return (
      <Box display="flex" flexDirection="column" gap={1} alignItems={'start'}>
        <Typography variant="h6">Task not found</Typography>
      </Box>
    );
  }

  return (
    task && (
      <Box display="flex" flexDirection="column" gap={1} alignItems={'start'}>
        <Box display="flex" flexDirection="row" alignItems={'center'}>
          <Typography variant="h6">{task.title}</Typography>
          <ICheckbox checked={task.is_completed} onChange={() => {}} />
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
    )
  );
};

export default TaskDetails;
