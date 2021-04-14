/* eslint-disable no-unused-vars */
import { Row } from "antd";
import React from "react";
import TaskItem from "../components/TaskItem";
import useTask from "../hooks/useTask";

export default function Home() {
  const [task, handleDelete, handleIsDone, handleAdd, isChecked] = useTask();

  return (
    <div>
      <Row
        type="flex"
        justify="center"
        align="top"
        style={{ minHeight: "80vh", maxWidth: "80%", marginLeft: "10%" }}
        gutter={16}
      >
        {task.map((item) => (
          <TaskItem item={item} key={item._id} onCheck={handleIsDone} />
        ))}
      </Row>
    </div>
  );
}
