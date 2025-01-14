'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getTodos, removeTodo } from '../store/tasksSlice';
import { List, ListItem, ListItemText, Button } from '@mui/material';

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(removeTodo(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task._id}>
          <ListItemText
            primary={task.title}
            secondary={`Due: ${new Date(task.end_date).toLocaleDateString()}`}
          />
          <Button onClick={() => handleDelete(task._id)} color="error">
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
