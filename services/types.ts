interface UserProgressProps {
  id: number;
  is_completed: boolean;
}
enum Operation {
  PATCH = 'PATCH',
  POST = 'POST',
}

export type {UserProgressProps};
export {Operation};
