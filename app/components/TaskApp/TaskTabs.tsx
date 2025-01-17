import { setTab } from '@/app/store/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { RootState } from '@/app/store/store';
import { Tabs, Tab } from '@mui/material';
import { SyntheticEvent } from 'react';

const TaskTabs = () => {
  const dispatch = useAppDispatch();
  const { tab } = useAppSelector((state: RootState) => state.ui);

  // Handle tab change
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    dispatch(setTab(newValue));
  };

  return (
    <Tabs
      value={tab}
      onChange={handleTabChange}
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
