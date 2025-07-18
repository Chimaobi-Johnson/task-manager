const dbConnect = require("../../lib/database");
const Task = require("../../models/Task");
const User = require("../../models/User");

exports.getTasks = async (req, res) => {
  await dbConnect();
  const tasks = await Task.find({ userId: req.user._id });
  res.json({ tasks });
};

exports.createTask = async (req, res) => {
  await dbConnect();
  const task = await Task.create({ ...req.body, userId: req.user._id });
  res.status(201).json({ task });
};

exports.updateTask = async (req, res) => {
  await dbConnect();
  const { id } = req.params;
  const updates = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    updates,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ task });
};

exports.deleteTask = async (req, res) => {
  await dbConnect();
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
};

// Custom endpoint: Get task insights for the user by email, 
// email is used here to make it easier to fetch data

exports.getTaskInsights = async (req, res) => {
  await dbConnect();
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  const tasks = await Task.find({ userId: user._id });
  const createdDates = tasks.map(t => t.createdAt).filter(Boolean).map(d => new Date(d));
  const updatedDates = tasks.map(t => t.updatedAt).filter(Boolean).map(d => new Date(d));
  const insights = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    createdAt: createdDates.length ? new Date(Math.max(...createdDates)).toISOString() : null,
    updatedAt: updatedDates.length ? new Date(Math.max(...updatedDates)).toISOString() : null,
  };
  res.json({ insights });
};
