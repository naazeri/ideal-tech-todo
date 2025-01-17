export interface Todo {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
}

export type CategorizedTasksType = {
  filteredTasks: Todo[];
  allTasksLength: number;
  openTasksLength: number;
  closedTasksLength: number;
  archivedTasksLength: number;
};

// type FilteredTodos = {
//   activeFilterTasks?: Todo[];
//   openTasks: Todo[];
//   closedTasks: Todo[];
//   archivedTasks: Todo[];
// };

// export type CategorizedTodos = {
//   todayTasks: FilteredTodos;
//   tomorrowTasks: FilteredTodos;
// };
