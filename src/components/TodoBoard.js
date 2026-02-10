import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, deleteTask, updateTask }) => {
  return (
    <div>
      <h2>Todo List</h2>

      {todoList.length > 0 ? (
        todoList.map((item) => (
          <TodoItem
            item={item}
            key={item._id}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))
      ) : (
        <h2>할일이 없습니다!</h2>
      )}
    </div>
  );
};

export default TodoBoard;
