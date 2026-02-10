import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteTask, updateTask }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div
            className="todo-content"
            style={{
              textDecoration: item.isComplete ? "line-through" : "none",
            }}
          >
            {item.task}
            <span
              className="todo-author"
              style={{
                display: "inline-block",
                textDecoration: "none",
                marginLeft: "4px",
              }}
            >
              by {item.author.name}
            </span>
          </div>
          <div>
            <div className="button-group">
              <button
                className="button-delete"
                onClick={() => deleteTask(item._id)}
              >
                삭제
              </button>

              <button
                className="button-done"
                onClick={() => updateTask(item._id)}
              >
                {!item.isComplete ? "끝남" : "안끝남"}
              </button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
