import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteTask, updateTask }) => {
  return (
    <Row>
      <Col xs={12}>
        {/* 완료 여부에 따라 item-complete 클래스 추가 */}
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div
            className="todo-content"
            style={{
              textDecoration: item.isComplete ? "line-through" : "none",
            }}
          >
            {item.task}
          </div>

          <div>
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
              {item.isComplete ? "끝남" : "안끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
