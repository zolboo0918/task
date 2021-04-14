import { Button, Card, Col, Input, Row } from "antd";
import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";
import "./style.css";

export default function Login() {
  const [email, setEmail] = useState("zolboo412@gmail.com");
  const [password, setPassword] = useState("1234");

  const state = useContext(UserContext);

  const handleLogin = () => {
    state.login(email, password);
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
          <Card title="Log in" className="login-card">
            <Input
              type="text"
              placeholder="Имэйл"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Нууц үг"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="primary"
              className="login-button"
              onClick={handleLogin}
            >
              Нэвтрэх
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
