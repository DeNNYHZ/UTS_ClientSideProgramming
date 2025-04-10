"use client"

import { useState, useEffect } from "react"
import TodoItem from "./components/ToDoItem" 
import "./App.css"

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
    } finally {
      setIsInitialLoad(false); 
    }
  }, []);
  

  useEffect(() => {
    if (!isInitialLoad) {
      try {
        localStorage.setItem("todos", JSON.stringify(todos));
      } catch (error) {
        console.error("Error saving todos to localStorage:", error);
      }
    }
  }, [todos, isInitialLoad]);
  

  const addTodo = () => {
    if (inputValue.trim() === "") {
      alert("TASK TIDAK BOLEH KOSONG / EMPTY SPACE ");
      return;
    }
  
    const newTodo = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setInputValue("");

    console.log("Added new todo:", updatedTodos);
  };
  
  

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
  }

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === "active") return !todo.completed
    if (activeFilter === "completed") return todo.completed
    return true
  })

  return (
    <div className="todo-container">
      <h1>Personal To Do List</h1>
      <p className="subtitle">Deni Setiawan - C14210312</p>

      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo(); 
            }
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filter-container">
        <button className={activeFilter === "all" ? "active" : ""} onClick={() => setActiveFilter("all")}>
          All
        </button>
        <button className={activeFilter === "active" ? "active" : ""} onClick={() => setActiveFilter("active")}>
          Active
        </button>
        <button className={activeFilter === "completed" ? "active" : ""} onClick={() => setActiveFilter("completed")}>
          Completed
        </button>
      </div>

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">No tasks found</p>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleComplete} onEdit={editTodo} />
          ))
        )}
      </div>

      <div className="todo-stats">
        <p>{todos.filter((todo) => !todo.completed).length} tasks remaining</p>
      </div>

      {activeFilter === "completed" && todos.some((todo) => todo.completed) && (
  <div className="clear-btn-container">
    <button
      className="clear-btn"
      onClick={() => {
        const confirmClear = window.confirm("Are you sure you want to clear all completed tasks?");
        if (confirmClear) {
          setTodos(todos.filter((todo) => !todo.completed));
        }
      }}
    >
      Clear Completed Tasks
    </button>
  </div>
)}
  </div>
  )}

export default App
