import { useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../utils/api";
import TodoBoard from "../components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("taskList", response.data.data);
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    try {
      if (!todoValue) return;
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        setTodoValue("");
        getTasks();
      }
    } catch (err) {
      console.log("addTask error: ", err);
    }
  };

  const deleteTask = async (_id) => {
    try {
      const response = await api.delete(`/tasks/${_id}`);
      if (response.status === 200) getTasks();
    } catch (err) {
      console.log("deleteTask error: ", err);
    }
  };

  const updateTask = async (_id) => {
    try {
      const response = await api.put(`/tasks/${_id}`);
      if (response.status === 200) getTasks();
    } catch (err) {
      console.log("updateTask error: ", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <header style={{ marginBottom: "40px" }}>
        <h1 style={{ fontWeight: "800", color: "#1e293b" }}>TODOPAGE</h1>
      </header>

      <Row className="add-item-row">
        <Col xs={12} sm={9}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={3}>
          <button className="button-add" onClick={addTask}>
            추가하기
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </Container>
  );
};

export default TodoPage;
