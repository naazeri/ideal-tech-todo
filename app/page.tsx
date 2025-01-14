'use client';

import { Container, Typography } from '@mui/material';
import TaskList from './components/TaskList';

export default function Home() {
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        ToDo App
      </Typography>
      <TaskList />
    </Container>
  );
}
