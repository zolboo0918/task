const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг оруулна уу"],
  },
  email: {
    type: String,
    required: [true, "Хэрэглэгчийн мэйлийг оруулна уу"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Имэйл буруу байна",
    ],
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
  taskId: {
    type: [mongoose.Schema.ObjectId],
    ref: "Task",
  },
  password: {
    type: String,
    required: [true, "Нууц үг оруулна уу"],
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJWT = function () {
  const jsonWebToken = jwt.sign(
    { id: this._id, role: this.role },
    process.env.TOKEN_KEY,
    {
      expiresIn: process.env.TOKEN_EXPIRE,
    }
  );

  console.log("token", jsonWebToken);

  return jsonWebToken;
};

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
