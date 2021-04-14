const User = require("../model/user");
const Task = require("../model/task");

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    if (!user) {
      throw new Error("Хэрэглэгч олдсонгүй");
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error", error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Нэвтрэх нэр, нууц үгээ шалгана уу");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Хэрэглэгч олдсонгүй");
    }

    const ok = await user.checkPassword(password);

    if (!ok) {
      throw new Error("Нэвтрэх нэр нууц үгээ шалгана уу");
    }

    const token = await user.getJWT();

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log("error", error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("taskID");
    if (!users) {
      throw new Error("Хэрэглэгчид олдсонгүй");
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("error", error);
  }
};
