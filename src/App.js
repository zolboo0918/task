import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { AfterLoginHeader, BeforeLoginHeader } from "./components/Header";
import Home from "./screens/Home";
import UserContext from "./context/userContext";
import { useContext } from "react";
import AdminHome from "./screens/AdminHome";
import UserTask from "./screens/UserTask";

function App() {
  const state = useContext(UserContext);
  return (
    <Router>
      <Switch>
        {!state.isLoggedIn ? (
          <>
            <BeforeLoginHeader />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </>
        ) : state.user.user.role === "admin" ? (
          <>
            <AfterLoginHeader />
            <Route path="/user-task/:id" component={UserTask} />
            <Route path="/" component={AdminHome} />
          </>
        ) : (
          <>
            <AfterLoginHeader />
            <Route path="/" component={Home} />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
