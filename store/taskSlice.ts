import { Task } from "@/models/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: (Omit<Task, "date"> & { date: string })[];
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
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
