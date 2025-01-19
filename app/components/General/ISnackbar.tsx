import { useFetchTodosQuery } from '@/app/lib/store/features/task/tasksApiSlice';
import {
  hideSnackbar,
  showSnackbar,
} from '@/app/lib/store/features/ui/uiSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/app/lib/hooks/features/store/storeHooks';
import { RootState } from '@/app/lib/store/store';
import { Alert, Snackbar } from '@mui/material';
import { useEffect } from 'react';

const ISnackbar = () => {
  const dispatch = useAppDispatch();
  const { error } = useFetchTodosQuery();
  const { open, message, severity } = useAppSelector(
    (state: RootState) => state.ui.snackbar
  );

  useEffect(() => {
    if (error) {
      dispatch(
        showSnackbar({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (error as any)?.data?.message || 'Failed to fetch tasks',
          severity: 'error',
        })
      );
    }
  }, [error, dispatch]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason !== 'clickaway') {
      dispatch(hideSnackbar());
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ mx: 2, my: 2 }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          fontSize: 15,
          py: 1.2,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ISnackbar;
