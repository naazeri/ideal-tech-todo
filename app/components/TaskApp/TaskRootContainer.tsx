import { Box } from '@mui/material';

interface TaskRootContainerProps {
  children: React.ReactNode;
}

const TaskRootContainer = ({ children }: TaskRootContainerProps) => {
  return <Box sx={{ width: '100%' }}>{children}</Box>;
};

export default TaskRootContainer;
