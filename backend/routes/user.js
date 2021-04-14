const express = require("express");
const { getUserTasks } = require("../controller/task");
const { login, register, getAllUsers } = require("../controller/user");
const { checkRole } = require("../middleware/checkRole");
const { checkToken } = require("../middleware/checkToken");

const router = express.Router();

//login
router.route("/login").post(login);

//register
router.route("/register").post(register);

router.route("/user").get(checkToken, checkRole("admin"), getAllUsers);

router.route("/user/:id/task").get(checkToken, getUserTasks);

module.exports = router;
