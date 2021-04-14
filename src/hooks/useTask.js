import { notification } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";

const useTask = () => {
  const state = useContext(UserContext);
  const [task, setTask] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${state.user.user._id}/task`, {
        headers: { Authorization: `Bearer ${state.user.token}` },
      })
      .then((res) => {
        setTask(res.data.tasks);
      })
      .catch((err) => console.log("error", err));
  }, [state, refresh]);

  const handleIsDone = (val, task) => {
    setIsChecked(val);
    axios
      .put(
        `http://localhost:4000/task/${task._id}`,
        {},
        { headers: { Authorization: `Bearer ${state.user.token}` } }
      )
      .then((res) => {
        setRefresh(true);
        notification.success({ message: "Амжилттай" });
      })
      .catch((err) => {
        console.log("err", err);
        notification.error({ message: err });
      });
  };

  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:4000/task/${item._id}`, {
        headers: { Authorization: `Bearer ${state.user.token}` },
      })
      .then((res) => {
        setRefresh(!refresh);
        notification.success({ message: "Амжилттай" });
      })
      .catch((err) => {
        console.log("err", err);
        notification.error({ message: err });
      });
  };
  const handleAdd = (body) => {
    axios
      .post(`http://localhost:4000/task/`, body, {
        headers: { Authorization: `Bearer ${state.user.token}` },
      })
      .then((res) => {
        setRefresh(!refresh);
        notification.success({ message: "Амжилттай" });
      })
      .catch((err) => {
        console.log("err", err);
        notification.error({ message: err });
      });
  };

  return [task, handleDelete, handleIsDone, handleAdd, isChecked];
};

export default useTask;
