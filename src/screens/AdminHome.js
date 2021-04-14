/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";

export default function AdminHome() {
  const [data, setData] = useState([]);

  const state = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/", {
        headers: { Authorization: `Bearer ${state.user.token}` },
      })
      .then((res) => {
        setData(res.data.users);
      })
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      //   style={{ marginLeft: "10%" }}
    >
      <Col span={18}>
        <Table dataSource={data} pagination={false}>
          <Column title="Нэр" key="username" dataIndex="userName" />
          <Column title="Имэйл" key="email" dataIndex="email" />
          <Column title="Эрх" key="role" dataIndex="role" />
          <Column title="ID" key="id" dataIndex="_id" />

          <Column
            title="Таскууд"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <Link to={`/user-task/${record._id}`}>
                  <p> Дэлгэрэнгүй</p>
                </Link>
              </Space>
            )}
          />
        </Table>
        {/* {data.map((item) => (
          <User item={item} />
        ))} */}
      </Col>
    </Row>
  );
}
