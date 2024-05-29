interface UserProgressProps {
  id: number;
  is_completed: boolean;
}

export interface ModuleUserProgress {
  module_id: number;
  page_id: number;
  is_completed: boolean;
}

export enum Operation {
  PATCH = 'PATCH',
  POST = 'POST',
}

export type {UserProgressProps};
