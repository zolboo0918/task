/* eslint-disable no-unused-vars */
import { DatePicker, Input, notification } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";
import useTask from "../hooks/useTask";

export default function NewTaskModal({ showModal, setShowModal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endedAt, setEndedAt] = useState(null);

  const state = useContext(UserContext);

  const [task, handleDelete, handleIsDone, handleAdd] = useTask();

  const onOk = () => {
    if (name === "" || description === "" || !endedAt) {
      notification.error({ message: "Талбаруудыг бүрэн бөглөнө үү" });
      return;
    }
    const body = {
      name,
      description,
      isDone: false,
      endedAt,
      userId: state.user.user._id,
    };
    handleAdd(body);
    setShowModal(!showModal);
    notification.success({ message: "Амжилттай" });
  };

  return (
    <div>
      <Modal
        visible={showModal}
        title="Шинэ таск үүсгэх"
        onCancel={() => setShowModal(!showModal)}
        onOk={onOk}
      >
        <h3>Нэр</h3>
        <Input
          type="text"
          placeholder="Нэр"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h3>Тайлбар</h3>
        <Input
          type="text"
          placeholder="Тайлбар"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h3>Дуусах хугацаа</h3>
        <DatePicker
          onChange={(e) => {
            const date = new Date(e._d);
            setEndedAt(date.toISOString());
          }}
        />
      </Modal>
    </div>
  );
}
