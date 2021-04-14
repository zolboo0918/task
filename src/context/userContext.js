import axios from "axios";
import React, { useState } from "react";

const UserContext = React.createContext();

export const UserStore = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    axios
      .post("http://localhost:4000/login", { email, password })
      .then((res) => {
        setUser(res.data);
        setIsLoggedIn(true);
      })
      .catch((err) => console.log("err", err));
  };

  const register = (body) => {
    axios
      .post("http://localhost:4000/register", body)
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data);
      })
      .catch((err) => console.log("err", err));
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logOut, register }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
