export type RequestCreate<T> = Omit<T, '_id' | 'is_completed'>;
export type RequestUpdate<T> = Partial<Omit<T, '_id'>>;
