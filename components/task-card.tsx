import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { Task } from "@/models/task";
import EditTaskModal from "./edit-task-modal";
import { Clock, Pencil, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { deleteTask } from "@/store/taskSlice";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const ref = useRef<HTMLDivElement>(null);
  drag(ref);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
          <button
            onClick={handleOpenModal}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-sm inline-flex gap-2"
          >
            <span>
              <Pencil className="h-5 w-5" />
            </span>
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteTask(task.id))}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm inline-flex gap-2"
          >
            <span>
              <Trash2 className="h-5 w-5" />
            </span>
            Delete
          </button>
        </div>
      </div>

      <EditTaskModal
        task={task}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default TaskCard;
