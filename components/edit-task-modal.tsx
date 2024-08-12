import React, { useState } from "react";
import { Task } from "@/models/task";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { editTask } from "@/store/taskSlice";

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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Task Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full text-black border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full text-black border rounded"
          />
        </div>
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
