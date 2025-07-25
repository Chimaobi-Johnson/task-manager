import { FiCheckCircle, FiEdit2, FiTrash2, FiLoader } from "react-icons/fi";

const TaskItem = ({ task, handleToggleDone, setEditingValue, handleUpdate, handleEdit, handleDelete, editingId, editingValue, handleToggleInProgress }) => {
    return (
      <li
        className={`flex items-center justify-between p-3 rounded border border-gray-200 ${
          task.status === 'done' ? "bg-gray-100" : "bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Done Checkbox */}
          <button
            onClick={() => handleToggleDone(task._id, task.status === 'done')}
            className={`text-2xl cursor-pointer focus:outline-none ${
              task.status === 'done' ? "text-green-500" : "text-gray-400 hover:text-green-500"
            }`}
            title={task.status === 'done' ? "Mark as not done" : "Mark as done"}
          >
            <FiCheckCircle />
          </button>
          {/* In Progress Indicator */}
          <button
            onClick={() => handleToggleInProgress(task._id, task.status === 'in-progress')}
            className={`text-2xl cursor-pointer focus:outline-none ${
              task.status === 'in-progress' ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
            }`}
            title={task.status === 'in-progress' ? "Mark as not in progress" : "Mark as in progress"}
          >
            <FiLoader />
          </button>
          {editingId === task._id ? (
            <input
              className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              onBlur={() => handleUpdate(task._id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdate(task._id);
              }}
              autoFocus
            />
          ) : (
            <span
              className={`text-base ${
                task.status === 'done' ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 mr-2">
            {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : ""}{" "}
            {task.createdAt ? new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
          </span>
          <button
            onClick={() => handleEdit(task._id, task.title)}
            className="text-blue-500 cursor-pointer hover:text-blue-700 p-1"
            title="Edit"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-500 cursor-pointer hover:text-red-700 p-1"
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </li>
    );
};

export default TaskItem;