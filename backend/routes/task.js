const express = require("express");
const {
  createTask,
  deleteTask,
  getAllTasks,
  doneTask,
} = require("../controller/task");
const { checkRole } = require("../middleware/checkRole");
const { checkToken } = require("../middleware/checkToken");

const router = express.Router();

router
  .route("/task")
  .get(checkToken, checkRole("admin"), getAllTasks)
  .post(checkToken, createTask);
router
  .route("/task/:id")
  .delete(checkToken, deleteTask)
  .put(checkToken, doneTask);

module.exports = router;
