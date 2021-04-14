const Task = require("../model/Task");
const User = require("../model/user");

exports.getAllTasks = async (req, res, next) => {
  try {
    const task = await Task.find();
    if (!task) {
      throw new Error("Таск үүссэнгүй");
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    if (!task) {
      throw new Error("Таск үүссэнгүй");
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
    console.log("error", error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      throw new Error("Таск байхгүй байна");
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
    console.log("error==>", error);
  }
};

exports.doneTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { isDone: true });

    if (!task) {
      throw new Error("Таск олдсонгүй");
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log("error", error.message);
  }
};

exports.getUserTasks = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error("Хэрэглэгч олдсонгүй");
    }

    const task = await Task.find({ userId: user._id });

    if (!task) {
      throw new Error("Таск олдсонгүй");
    }

    res.status(200).json({ success: true, tasks: task });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ success: false, error: error.message });
  }
};
