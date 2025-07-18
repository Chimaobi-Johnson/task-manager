"use client";

import instance from "@/lib/axios";
import { createContext, useContext, useState, useCallback } from "react";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setTasksLoading(true);
    setTasksError("");
    try {
      const res = await instance.get("/api/tasks/get");
      setTasks(res.data.tasks || []);
      return { success: true, data: res.data.tasks };
    } catch (err) {
      setTasksError(err.response?.data?.message || "Failed to fetch tasks.");
      return { success: false, error: err.response?.data?.message || "Failed to fetch tasks." };
    } finally {
      setTasksLoading(false);
    }
  }, []);

  // Create a new task
  const createTask = async (taskData) => {
    setTasksLoading(true);
    setTasksError("");
    try {
      const res = await instance.post("/api/tasks/create", taskData);
      setTasks((prev) => [...prev, res.data.task]);
      return { success: true, data: res.data.task };
    } catch (err) {
      setTasksError(err.response?.data?.message || "Failed to create task.");
      return { success: false, error: err.response?.data?.message || "Failed to create task." };
    } finally {
      setTasksLoading(false);
    }
  };

  // Update a task
  const updateTask = async (id, updates) => {
    setTasksLoading(true);
    setTasksError("");
    try {
      const res = await instance.put(`/api/tasks/${id}`, updates);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.task : t)));
      return { success: true, data: res.data.task };
    } catch (err) {
      setTasksError(err.response?.data?.message || "Failed to update task.");
      return { success: false, error: err.response?.data?.message || "Failed to update task." };
    } finally {
      setTasksLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    setTasksLoading(true);
    setTasksError("");
    try {
      await instance.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      return { success: true };
    } catch (err) {
      setTasksError(err.response?.data?.message || "Failed to delete task.");
      return { success: false, error: err.response?.data?.message || "Failed to delete task." };
    } finally {
      setTasksLoading(false);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        tasksLoading,
        tasksError,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setTasks, // for manual updates if needed
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
