import { Box, Divider } from '@mui/material';
import IChip from '../General/IChip';
import { TASK_FILTERS } from '@/app/lib/constants/constants';
import { CategorizedTasksType } from '@/app/lib/types/todo';
import { setActiveFilter } from '@/app/lib/store/features/ui/uiSlice';
import { useAppDispatch } from '@/app/lib/hooks/features/store/storeHooks';

interface TaskFiltersProps {
  categorizedTasks: CategorizedTasksType;
  activeFilter: string;
}

const TaskFilters = ({ categorizedTasks, activeFilter }: TaskFiltersProps) => {
  // Handle filter change
  const dispatch = useAppDispatch();

  const handleFilterChange = (filter: string) => {
    dispatch(setActiveFilter(filter));
  };

  return (
    <Box display="flex" gap={2} mt={5}>
      <IChip
        label={TASK_FILTERS.ALL}
        badgeNumber={categorizedTasks.allTasksLength}
        disabled={activeFilter !== TASK_FILTERS.ALL}
        onClick={() => handleFilterChange(TASK_FILTERS.ALL)}
      />
      <Divider
        orientation="vertical"
        flexItem
        sx={{ backgroundColor: 'text.disabled' }}
      />
      <IChip
        label={TASK_FILTERS.OPEN}
        badgeNumber={categorizedTasks.openTasksLength}
        disabled={activeFilter !== TASK_FILTERS.OPEN}
        onClick={() => handleFilterChange(TASK_FILTERS.OPEN)}
      />
      <IChip
        label={TASK_FILTERS.CLOSED}
        badgeNumber={categorizedTasks.closedTasksLength}
        disabled={activeFilter !== TASK_FILTERS.CLOSED}
        onClick={() => handleFilterChange(TASK_FILTERS.CLOSED)}
      />
      <IChip
        label={TASK_FILTERS.ARCHIVED}
        badgeNumber={categorizedTasks.archivedTasksLength}
        disabled={activeFilter !== TASK_FILTERS.ARCHIVED}
        onClick={() => handleFilterChange(TASK_FILTERS.ARCHIVED)}
      />
    </Box>
  );
};

export default TaskFilters;
