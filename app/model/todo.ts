export default interface Todo {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
}

export type TodoCreate = Omit<Todo, '_id' | 'is_completed'>;
export type TodoUpdate = Partial<Omit<Todo, '_id'>>;

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
