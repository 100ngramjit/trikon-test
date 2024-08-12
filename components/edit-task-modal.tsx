import React, { useState } from "react";
import { Task } from "@/models/task";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { editTask } from "@/store/taskSlice";
import { CircleX } from "lucide-react";

interface EditTaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(editTask({ ...task, name, description }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <div className="flex justify-between space-x-2 text-black">
          <h2 className="text-2xl font-bold mb-4 text-black">Edit Task</h2>
          <button onClick={onClose}>
            <CircleX />
          </button>
        </div>

        <label className="block text-gray-700">Task Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 text-black rounded"
        />

        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 text-black rounded h-32"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
