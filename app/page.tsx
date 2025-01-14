'use client';

import { Container } from '@mui/material';
import TaskApp from './components/TaskApp';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <TaskApp />
    </Container>
  );
}
