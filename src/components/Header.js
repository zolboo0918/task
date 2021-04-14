import React, { useContext, useState } from "react";
import { Button, PageHeader } from "antd";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import NewTaskModal from "./NewTaskModal";

export function BeforeLoginHeader() {
  return (
    <div className="header">
      <PageHeader
        title="TODO list"
        extra={[
          <Link to="/register">
            <Button key="2">Бүртгүүлэх</Button>
          </Link>,
          <Link to="/login">
            <Button key="1" type="primary">
              Нэвтрэх
            </Button>
          </Link>,
        ]}
      />
    </div>
  );
}

export function AfterLoginHeader() {
  const [showModal, setShowModal] = useState(false);
  const state = useContext(UserContext);
  const handleLogOut = () => {
    state.logOut();
  };
  return (
    <div className="header">
      <PageHeader
        title="TODO list"
        extra={[
          <Button key="1" onClick={() => setShowModal(!showModal)}>
            Шинэ таск үүсгэх
          </Button>,
          <Button key="2" onClick={handleLogOut}>
            Гарах
          </Button>,
        ]}
      />
      <NewTaskModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
