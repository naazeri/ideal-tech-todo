import { Box, Divider } from '@mui/material';
import IChip from '../General/IChip';
import { TASK_FILTERS } from '@/app/constants/constants';
import { CategorizedTasksType } from '@/app/types/todo';

interface TaskFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  categorizedTasks: CategorizedTasksType;
}

const TaskFilters = ({
  activeFilter,
  onFilterChange,
  categorizedTasks,
}: TaskFiltersProps) => (
  <Box display="flex" gap={2} mt={5}>
    <IChip
      label={TASK_FILTERS.ALL}
      badgeNumber={categorizedTasks.allTasksLength}
      disabled={activeFilter !== TASK_FILTERS.ALL}
      onClick={() => onFilterChange('All')}
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
      onClick={() => onFilterChange('Open')}
    />
    <IChip
      label={TASK_FILTERS.CLOSED}
      badgeNumber={categorizedTasks.closedTasksLength}
      disabled={activeFilter !== TASK_FILTERS.CLOSED}
      onClick={() => onFilterChange('Closed')}
    />
    <IChip
      label={TASK_FILTERS.ARCHIVED}
      badgeNumber={categorizedTasks.archivedTasksLength}
      disabled={activeFilter !== TASK_FILTERS.ARCHIVED}
      onClick={() => onFilterChange('Archived')}
    />
  </Box>
);

export default TaskFilters;
