import { Task } from "@/models/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const taskWithSerializedDate = {
        ...action.payload,
        date: action.payload.date,
      };
      state.tasks.push(taskWithSerializedDate);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...action.payload,
          date: action.payload.date,
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    moveTask: (
      state,
      action: PayloadAction<{
        id: string;
        newStatus: "to do" | "doing" | "done";
      }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.newStatus;
      }
    },
  },
});

export const { addTask, editTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
