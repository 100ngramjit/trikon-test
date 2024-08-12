"use client";

import { addTask, moveTask } from "@/store/taskSlice";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddTaskModal from "@/components/add-task-modal";
import { createTask } from "@/models/task";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import TaskSection from "@/components/task-section";

export default function Home() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<
    "to do" | "doing" | "done"
  >("to do");

  const moveTaskHandler = (
    id: string,
    newStatus: "to do" | "doing" | "done"
  ) => {
    dispatch(moveTask({ id, newStatus }));
  };

  const renderSection = (status: "to do" | "doing" | "done") => (
    <TaskSection
      status={status}
      tasks={tasks.filter((task) => task.status === status)}
      onTaskMove={moveTaskHandler}
      onAddCard={() => {
        setCurrentSection(status);
        setIsModalOpen(true);
      }}
    />
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex m-2">
        {renderSection("to do")}
        {renderSection("doing")}
        {renderSection("done")}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(name, description) => {
          dispatch(addTask(createTask(name, description, currentSection)));
          setIsModalOpen(false);
        }}
      />
    </DndProvider>
  );
}
