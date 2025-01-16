import { Alert, Snackbar } from '@mui/material';

interface ISnackbarProps {
  open: boolean;
  message: string | null;
  severity: 'success' | 'error' | 'info' | 'warning';
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

const ISnackbar = ({ open, message, severity, onClose }: ISnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ mx: 2, my: 2 }}
    >
      <Alert
        onClose={onClose}
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
