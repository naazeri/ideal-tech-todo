import { setTab } from '@/app/lib/store/features/ui/uiSlice';
import { useAppDispatch } from '@/app/lib/hooks/features/store/storeHooks';
import { Tabs, Tab } from '@mui/material';
import { SyntheticEvent } from 'react';
import { usePersistentTab } from '@/app/lib/hooks/features/ui/usePersistentTab';

const TaskTabs = () => {
  const dispatch = useAppDispatch();
  const tab = usePersistentTab();

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
