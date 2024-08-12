import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { Task } from "@/models/task";
import { Clock, Pencil, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const ref = useRef<HTMLDivElement>(null);
  drag(ref);

  return (
    <>
      <div
        ref={ref}
        className={`bg-white p-4 rounded-lg shadow-md mb-3 ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <h3 className="text-lg text-gray-600 font-semibold mb-2">
          {task.name}
        </h3>
        <p className="text-gray-600 mb-2">{task.description}</p>
        <p className="text-sm text-gray-500 mb-3 inline-flex gap-2">
          <span>
            <Clock className="h-5 w-5" />
          </span>
          {new Date(task.date).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
          })}
        </p>
        <div className="flex justify-end space-x-2">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-sm inline-flex gap-2">
            <span>
              <Pencil className="h-5 w-5" />
            </span>
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm inline-flex gap-2"
          >
            <span>
              <Trash2 className="h-5 w-5" />
            </span>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
