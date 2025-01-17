import { openNewTaskModal } from '@/app/lib/store/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks/storeHooks';
import { RootState } from '@/app/lib/store/store';
import { Add } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { addDays, format } from 'date-fns';

const TaskHeader = () => {
  const dispatch = useAppDispatch();
  const { tab } = useAppSelector((state: RootState) => state.ui);

  // Handle new task modal open/close
  const handleOpenNewTaskModal = () => {
    return dispatch(openNewTaskModal());
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={5}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {tab === 0 ? "Today's" : "Tomorrow's"} Task
        </Typography>
        <Typography variant="subtitle2" color="textDisabled">
          {/* show current date like: Wednesday , 11 May */}
          {format(
            tab === 0 ? new Date() : addDays(new Date(), 1),
            'EEEE , dd MMMM'
          )}
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="small"
        startIcon={<Add />}
        sx={{
          textTransform: 'none',
          backgroundColor: '#0760FB1A',
          color: 'primary.main',
          borderRadius: '10px',
          fontSize: '14px',
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#0760FB26',
            boxShadow: 'none',
          },
        }}
        onClick={handleOpenNewTaskModal}
      >
        New Task
      </Button>
    </Box>
  );
};

export default TaskHeader;
