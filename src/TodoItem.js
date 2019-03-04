import React from "react";
import "./TodoItem.css";

function TodoItem({ item, handleChange, handleRemoveTask }) {
  return (
    <div className="Todo-item">
      <label>
        <input
          type="checkbox"
          checked={item.completed}
          onClick={() => handleChange(item.id)}
        />
        <p
          className={item.completed ? "TodoItem-selected TodoItem-label" : "TodoItem-label"}
        >
          {item.text}
        </p>
      </label>
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
