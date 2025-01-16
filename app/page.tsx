import { Container } from '@mui/material';
import TaskApp from './components/TaskApp/TaskApp';

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
      <TaskApp />
    </Container>
  );
}
