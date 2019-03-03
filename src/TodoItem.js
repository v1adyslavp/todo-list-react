import React from "react";
import "./TodoItem.css";

function TodoItem({ item, handleChange, handleRemoveTask }) {
  return (
    <div className="Todo-item">
    <input
  type="checkbox"
  checked={item.completed}
  onChange={() => handleChange(item.id)}
  />
  <p
  className={
    item.completed ? "TodoItem-selected TodoItem-label" : "TodoItem-label"
}
  onClick={() => handleChange(item.id)}
>
  {item.text}
</p>
  <button
  className="TodoItem-remove-button"
  onClick={() => handleRemoveTask(item.id)}
>
  x
  </button>
  </div>
);
}

export default TodoItem;
