"use client";

import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import TaskItem from "./Components/TaskItem";
import { useTasks } from "@/context/tasksContext";

const TasksContainer = () => {
  const {
    tasks,
    tasksLoading,
    tasksError,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setTasks,
  } = useTasks();

  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const res = await createTask({ title: newTask });
    if (res.success) setNewTask("");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
  };

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditingValue(title);
  };

  const handleUpdate = async (id) => {
    await updateTask(id, { title: editingValue });
    setEditingId(null);
    setEditingValue("");
  };

  const handleToggleDone = async (id, currentDone) => {
    await updateTask(id, { status: currentDone ? "pending" : "done" });
  };

  // Sort: not done first, then done; each group sorted by createdAt ascending
  const sortedTasks = [
    ...tasks.filter((t) => t.status !== "done").sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    ...tasks.filter((t) => t.status === "done").sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
  ];

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">My Tasks</h2>
      <form onSubmit={handleAddTask} className="flex mb-6 gap-2">
        <input
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
          disabled={tasksLoading}
        >
          <FiPlus /> Add
        </button>
      </form>
      {tasksLoading && <div className="text-center text-gray-500">Loading tasks...</div>}
      {tasksError && <div className="text-center text-red-500">{tasksError}</div>}
      <ul className="space-y-4">
        {sortedTasks.map((task, i) => (
          <TaskItem
            key={task._id || task.id || i}
            editingId={editingId}
            task={task}
            handleToggleDone={() => handleToggleDone(task._id, task.status === "done")}
            setEditingValue={setEditingValue}
            handleUpdate={() => handleUpdate(task._id)}
            handleEdit={handleEdit}
            handleDelete={() => handleDelete(task._id)}
            editingValue={editingValue}
          />
        ))}
      </ul>
    </div>
  );
};

export default TasksContainer;