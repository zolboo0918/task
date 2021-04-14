import { Row } from "antd";
import axios from "axios";
import React, { Component } from "react";
import TaskItem from "../components/TaskItem";
import UserContext from "../context/userContext";

export default class UserTask extends Component {
  static contextType = UserContext;
  state = {
    data: null,
    name: null,
    description: null,
    createdAt: null,
    endedAt: null,
    isDone: null,
  };

  componentDidMount() {
    const state = this.context;
    axios
      .get(`http://localhost:4000/user/${this.props.match.params.id}/task`, {
        headers: { Authorization: `Bearer ${state.user.token}` },
      })
      .then((res) => {
        this.setState({ data: res.data.tasks });
        console.log("aaa", this.state.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  render() {
    return (
      <div>
        <Row
          type="flex"
          justify="center"
          align="top"
          style={{ minHeight: "80vh", maxWidth: "80%", marginLeft: "10%" }}
          gutter={16}
        >
          {this.state.data &&
            this.state.data.map((item) => <TaskItem item={item} />)}
        </Row>
      </div>
    );
  }
}
