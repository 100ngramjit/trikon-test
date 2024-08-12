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
    <div ref={ref} className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md m-2">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </h2>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
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
