import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./task-card";
import { Task } from "@/models/task";
import { Plus } from "lucide-react";

interface TaskSectionProps {
  status: "to do" | "doing" | "done";
  tasks: Task[];
  onTaskMove: (id: string, newStatus: "to do" | "doing" | "done") => void;
  onAddCard: () => void;
}

const TaskSection: React.FC<TaskSectionProps> = ({
  status,
  tasks,
  onTaskMove,
  onAddCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => onTaskMove(item.id, status),
  }));

  drop(ref);

  return (
    <div
      ref={ref}
      className="flex flex-col w-1/3 h-full p-4 bg-gray-100 rounded-lg shadow-md mx-2"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </h2>
      <div className="flex-grow overflow-y-auto">
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      <button
        onClick={onAddCard}
        className="mt-4 bg-none text-gray-500 font-bold py-2 px-2 rounded inline-flex items-center"
      >
        <span>
          <Plus />
        </span>
        Add a card
      </button>
    </div>
  );
};

export default TaskSection;
