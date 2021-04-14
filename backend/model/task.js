const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ажлын нэрийг оруулна уу"],
  },
  createdAt: { type: Date, default: Date.now() },
  endedAt: { type: Date, default: Date.now() },
  isDone: Boolean,
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);
