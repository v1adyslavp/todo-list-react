import React, { Component } from "react";
import ReactDOM from "react-dom";
import TodoItem from "./TodoItem";
import todosData from "./todosData";

import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: todosData,
      archievedTodos: [],
      inputValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
  }

  handleChange(id) {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return {
        ...prevState,
        todos: updatedTodos
      };
    });
  }

  handleRemoveTask(id) {
    this.setState(prevState => {
      let todos = prevState.todos.filter(todo => todo.id !== id);

      return {
        ...prevState,
        todos
      };
    });
  }

  handleTaskAdd() {
    console.log(this.state.inputValue);

    this.setState(prevState => {
      let updatedTodos = [...prevState.todos];

      if (this.state.inputValue) {
        let allTodos = [...prevState.todos, ...prevState.archievedTodos];
        const fullIdList = allTodos.map(todo => todo.id);
        const id = Math.max(...fullIdList) + 1;

        updatedTodos.push({
          id,
          text: this.state.inputValue,
          completed: false
        });
      }

      return {
        ...prevState,
        todos: updatedTodos,
        inputValue: ""
      };
    });
  }

  handleInputChange(event) {
    let value = event.target.value;

    this.setState(prevState => {
      return {
        ...prevState,
        inputValue: value
      };
    });
  }

  handleArchiveClick() {
    this.setState(prevState => {
      let toArchieve = prevState.todos.filter(todo => todo.completed);
      let archievedTodos = [...prevState.archievedTodos, ...toArchieve];
      let activeTodos = prevState.todos.filter(todo => !todo.completed);

      return {
        ...prevState,
        archievedTodos,
        todos: activeTodos
      };
    });
  }

  handleShowAllClick() {
    this.setState(prevState => {
      let todos = [...prevState.todos, ...prevState.archievedTodos];

      return {
        ...prevState,
        todos,
        archievedTodos: []
      };
    });
  }

  render() {
    const todoItems = this.state.todos.map(item => (
      <TodoItem
    key={item.id}
    item={item}
    handleChange={this.handleChange}
    handleRemoveTask={this.handleRemoveTask}
    />
  ));

    return (
      <div>
      <h3
    style={{
      textAlign: "center",
        color: "lightcoral"
    }}
  >
    To do List
    </h3>
    <div className="todo-list">
      <button
    className="Todo-btn"
    onClick={() => this.handleArchiveClick()}
  >
    Hide completed
    </button>
    <label htmlFor="">
      <input
    type="text"
    value={this.state.inputValue}
    onChange={event => this.handleInputChange(event)}
    />
    <button
    className="Todo-add-btn Todo-btn"
    onClick={() => this.handleTaskAdd()}
  >
    Add new
    </button>
    </label>

    <div className="TodoItems-container">
    {todoItems.length > 0 ? (
      todoItems
    ) : (
      <span className="Todo-all-done-msg">
      Well done, no one new task
    </span>
  )}
  </div>

    {this.state.archievedTodos.length > 0 && (
    <button
      className="Todo-btn"
      onClick={() => this.handleShowAllClick()}
    >
      Show archieved
    </button>
    )}
  </div>
    </div>
  );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
