export interface Task {
  id: string;
  name: string;
  description: string;
  date: string;
  status: "to do" | "doing" | "done";
}

export const createTask = (
  name: string,
  description: string,
  status: "to do" | "doing" | "done"
): Task => ({
  id: Math.random().toString(36).substr(2, 9),
  name,
  description,
  date: new Date().toISOString(),
  status,
});
