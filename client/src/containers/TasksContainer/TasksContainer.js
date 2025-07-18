"use client"

import { useState } from "react";
import { FiCheckCircle, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import TaskItem from "./Components/TaskItem";

const initialTasks = [
  {
    id: 1,
    title: "Finish project documentation",
    date: new Date("2024-06-01T10:00:00"),
    done: false,
  },
  {
    id: 2,
    title: "Review pull requests",
    date: new Date("2024-06-02T14:30:00"),
    done: true,
  },
  {
    id: 3,
    title: "Plan next sprint",
    date: new Date("2024-06-03T09:00:00"),
    done: false,
  },
];

const TasksContainer = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        date: new Date(),
        done: false,
      },
    ]);
    setNewTask("");
  };

  console.log('tasks ', tasks)

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditingValue(title);
  };

  const handleUpdate = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editingValue } : task
      )
    );
    setEditingId(null);
    setEditingValue("");
  };

  const handleToggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Sort: not done first, then done; each group sorted by date ascending
  const sortedTasks = [
    ...tasks.filter((t) => !t.done).sort((a, b) => a.date - b.date),
    ...tasks.filter((t) => t.done).sort((a, b) => a.date - b.date),
  ];

  console.log('sortedTasks ', sortedTasks)

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
        >
          <FiPlus /> Add
        </button>
      </form>
      <ul className="space-y-4">
        {sortedTasks.map((task, i) => (
          <TaskItem 
            key={task.id + i}
            editingId={editingId}
            task={task} 
            handleToggleDone={handleToggleDone} 
            setEditingValue={setEditingValue} 
            handleUpdate={handleUpdate} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            />
        ))}
      </ul>
    </div>
  );
};

export default TasksContainer;