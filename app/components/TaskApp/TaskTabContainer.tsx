import { Box } from '@mui/material';

interface TaskTabContainerProps {
  children: React.ReactNode;
}

const TaskTabContainer = ({ children }: TaskTabContainerProps) => {
  return <Box sx={{ px: 3 }}>{children}</Box>;
};

export default TaskTabContainer;
