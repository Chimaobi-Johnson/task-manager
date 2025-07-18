const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'done'],
    default: 'pending',
  },
  extras: {
    type: mongoose.Schema.Types.Mixed, // Can store JSON like { tags, dueDate, priority }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
