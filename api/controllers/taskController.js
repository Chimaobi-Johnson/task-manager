const dbConnect = require("../../lib/database");
const Task = require("../../models/Task");

exports.getTasks = async (req, res) => {
  await dbConnect();
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  await dbConnect();
  const task = await Task.create({ ...req.body, userId: req.user._id });
  res.status(201).json(task);
};
