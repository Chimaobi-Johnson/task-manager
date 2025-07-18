const dbConnect = require("../../lib/database");
const Task = require("../../models/Task");

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
