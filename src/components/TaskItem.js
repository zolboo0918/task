/* eslint-disable no-unused-vars */
import { Button, Card, Col } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React from "react";
import useTask from "../hooks/useTask";
import "../screens/style.css";

export default function TaskItem({ item }) {
  const start = new Date(item.createdAt);
  const end = new Date(item.endedAt);

  const [task, handleDelete, handleIsDone] = useTask();

  return (
    <Col span={8}>
      <Card
        title={item.name}
        style={{ marginTop: 20, marginLeft: 20 }}
        extra={
          <Button onClick={() => handleDelete(item)} type="danger">
            Устгах
          </Button>
        }
      >
        <div className="task-item-desc">
          <div>
            <h3>Тайлбар: </h3>
            <h3>Эхэлсэн:</h3>
            <h3>Дуусах:</h3>

            <h3>Дууссан:</h3>
          </div>
          <div>
            <h3>{item.description}</h3>
            <h3>
              {start.getFullYear() +
                "-" +
                start.getMonth() +
                "-" +
                start.getDate()}
            </h3>
            <h3>
              {end.getFullYear() + "-" + end.getMonth() + "-" + end.getDate()}
            </h3>
            <Checkbox
              checked={item.isDone}
              onChange={(e) => handleIsDone(e.target.checked, item)}
            />
          </div>
        </div>
      </Card>
    </Col>
  );
}
