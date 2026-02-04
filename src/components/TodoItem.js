import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteTask, updateTask }) => {
  const dynamicStyle = {
    backgroundColor: item.isComplete ? "gray" : "white",
  };

  const textStyle = {
    textDecoration: item.isComplete ? "line-through" : "none",
  };
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`} style={dynamicStyle}>
          <div className="todo-content" style={textStyle}>
            {item.task}
          </div>

          <div>
            <button
              style={dynamicStyle}
              className="button-delete"
              onClick={() => {
                console.log(item._id, "del");
                deleteTask(item._id);
              }}
            >
              삭제
            </button>

            <button
              style={dynamicStyle}
              className="button-delete"
              onClick={() => {
                updateTask(item._id);
              }}
            >
              {item.isComplete ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
