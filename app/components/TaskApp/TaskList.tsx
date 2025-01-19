import {
  List,
  Box,
  Typography,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import { CategorizedTasksType } from '@/app/lib/types/todo';
import TaskListItem from './TaskListItem';
import { useFetchTodosQuery } from '@/app/lib/store/features/task/tasksApiSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/app/lib/hooks/features/store/storeHooks';
import { RootState } from '@/app/lib/store/store';
import { useMemo } from 'react';
import { TASK_FILTERS } from '@/app/lib/constants/constants';
import { addDays, isSameDay, isBefore, startOfDay } from 'date-fns';
import TaskFilters from './TaskFilters';
import { Search } from '@mui/icons-material';
import { setSearchTerm } from '@/app/lib/store/features/ui/uiSlice';

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { data: { data: tasks = [] } = {}, isLoading } = useFetchTodosQuery();
  const { tab, activeFilter, searchTerm } = useAppSelector(
    (state: RootState) => state.ui
  );

  // Categorize tasks whenever tasks or tab change
  const categorizedTasks: CategorizedTasksType = useMemo(() => {
    const result: CategorizedTasksType = {
      filteredTasks: [],
      allTasksLength: 0,
      openTasksLength: 0,
      closedTasksLength: 0,
      archivedTasksLength: 0,
    };

    // today or tomorrow
    const dateFilter = tab === 0 ? new Date() : addDays(new Date(), 1);

    // Sort tasks by start_date in ascending order
    const sortedTasks = [...tasks].sort((a, b) =>
      new Date(a.start_date) > new Date(b.start_date) ? 1 : -1
    );

    // filter tasks by date(today or tomorrow)
    const dateFilteredTasks = sortedTasks.filter(
      (task) =>
        task.title.includes(searchTerm) &&
        isSameDay(new Date(task.start_date), dateFilter)
    );

    // filter tasks
    const openTasks = dateFilteredTasks.filter((task) => !task.is_completed);
    const closedTasks = dateFilteredTasks.filter((task) => task.is_completed);
    const archivedTasks = sortedTasks.filter((task) =>
      isBefore(new Date(task.start_date), startOfDay(new Date()))
    );

    // set filtered tasks length
    result.allTasksLength = dateFilteredTasks.length;
    result.openTasksLength = openTasks.length;
    result.closedTasksLength = closedTasks.length;
    result.archivedTasksLength = archivedTasks.length;

    // filter tasks by activeFilter
    switch (activeFilter) {
      case TASK_FILTERS.OPEN:
        result.filteredTasks = openTasks;
        break;
      case TASK_FILTERS.CLOSED:
        result.filteredTasks = closedTasks;
        break;
      case TASK_FILTERS.ARCHIVED:
        result.filteredTasks = archivedTasks;
        break;
      default:
        result.filteredTasks = dateFilteredTasks;
        break;
    }

    // dispatch(setCategorizedTasks(result));
    return result;
  }, [tab, tasks, activeFilter, searchTerm]);

  const handleSearch = (text: string) => {
    dispatch(setSearchTerm(text));
  };

  return (
    <>
      {/* Filters */}
      <TaskFilters
        categorizedTasks={categorizedTasks}
        activeFilter={activeFilter}
      />

      {/* List Container */}
      <Box sx={{ mt: 5, mb: 8, p: 0 }}>
        {/* Loading */}
        {isLoading && (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        )}

        {/* No Tasks */}
        {!isLoading && categorizedTasks.filteredTasks.length === 0 && (
          <Typography textAlign="center" color="textSecondary">
            No tasks available.
          </Typography>
        )}
        {/* Search Input */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            placeholder="Search tasks..."
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Tasks List */}
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {categorizedTasks.filteredTasks.map((task) => (
            <TaskListItem
              key={task._id}
              task={task}
              tab={tab}
              activeFilter={activeFilter}
            />
          ))}
        </List>
      </Box>
    </>
  );
};

export default TaskList;
