import { Tabs, Tab } from '@mui/material';
import { SyntheticEvent } from 'react';

interface TaskTabsProps {
  value: number;
  onChange: (event: SyntheticEvent, newValue: number) => void;
}

const TaskTabs = ({ value, onChange }: TaskTabsProps) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      textColor="inherit"
      variant="fullWidth"
      sx={{
        '& .MuiTabs-indicator': {
          backgroundColor: '#000000',
        },
      }}
    >
      <Tab label="Today's Task" />
      <Tab label="Tomorrow's Task" />
    </Tabs>
  );
};

export default TaskTabs;
