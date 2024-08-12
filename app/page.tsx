"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Plus } from "lucide-react";

export default function Home() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();

  const renderSection = (status: "to do" | "doing" | "done") => (
    <div ref={ref} className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md m-2">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </h2>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <button className="mt-4 bg-none text-gray-400 font-bold py-2 px-2 rounded inline-flex items-center">
        <span>
          <Plus />
        </span>
        Add a card
      </button>
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-between p-4 bg-gray-200 min-h-screen">
        {renderSection("to do")}
        {renderSection("doing")}
        {renderSection("done")}
      </div>
    </DndProvider>
  );
}
