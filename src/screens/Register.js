import { Alert, Button, Card, Col, Input, Row } from "antd";
import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const state = useContext(UserContext);
  const handleRegister = () => {
    if (userName === "" || email === "" || password === "") {
      <Alert message="Бүх талбаруудыг бөглөнө үү" type="error" />;
      return;
    }
    if (password !== password2) {
      <Alert message="Нууц үг тохирохгүй байна" type="error" />;
      return;
    }
    const body = {
      userName,
      email,
      password,
    };
    state.register(body);
  };
  return (
    <div>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "80vh" }}
      >
        <Col span={6}>
          <Card title="Register" className="login-card">
            <Input
              type="text"
              placeholder="Имэйл"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Хэрэглэгчийн нэр"
              className="login-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Нууц үг"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Нууц үг давт"
              className="login-input"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <Button
              type="primary"
              className="login-button"
              onClick={handleRegister}
            >
              Бүртгүүлэх
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
