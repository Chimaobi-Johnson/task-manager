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
  const [statusFilter, setStatusFilter] = useState("all"); // all, pending, in-progress, done
  const [dateOrder, setDateOrder] = useState("asc"); // asc, desc
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      setInputError("Task title cannot be empty.");
      return;
    }
    setInputError("");
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

  const handleToggleInProgress = async (id, currentInProgress) => {
    await updateTask(id, { status: currentInProgress ? "pending" : "in-progress" });
  };

  // Filtering and sorting
  let filteredTasks = tasks;
  if (statusFilter !== "all") {
    filteredTasks = filteredTasks.filter(t => t.status === statusFilter);
  }
  filteredTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="md:max-w-xl mx-auto mt-12 p-6 bg-white md:border border-gray-300 rounded-lg">
      <h2 className="text-lg font-bold mb-6 text-center">My Tasks</h2>
      <form onSubmit={handleAddTask} className="flex mb-2 gap-2">
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
      {inputError && <div className="text-red-500 text-sm mb-4">{inputError}</div>}
      {/* Filter Controls */}
      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border text-sm text-gray-500 rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={dateOrder}
          onChange={e => setDateOrder(e.target.value)}
          className="border text-sm text-gray-500 rounded px-2 py-1"
        >
          <option value="asc">Date Asc ↑</option>
          <option value="desc">Date Dsc ↓</option>
        </select>
      </div>
      {tasksLoading && <div className="text-center text-gray-500">Updating tasks...</div>}
      {tasksError && <div className="text-center text-red-500">{tasksError}</div>}
      <ul className="space-y-4">
        {filteredTasks.map((task, i) => (
          <TaskItem
            key={task._id}
            editingId={editingId}
            task={task}
            handleToggleDone={handleToggleDone}
            handleToggleInProgress={handleToggleInProgress}
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