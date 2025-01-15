export default interface Todo {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
  is_archived: boolean;
}

export type TodoCreate = Omit<Todo, '_id' | 'is_completed' | 'is_archived'>;
export type TodoUpdate = Partial<Omit<Todo, '_id' | 'is_archived'>>;
