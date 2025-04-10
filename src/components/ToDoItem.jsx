"use client"

import { useState } from "react"

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (editText.trim() !== "") {
      onEdit(todo.id, editText)
      setIsEditing(false)
    }
  }

  const cancelEdit = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <div className={`todo-item ${todo.completed ? "completed-item" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit()
              if (e.key === "Escape") cancelEdit()
            }}
          />
          <button onClick={handleEdit} className="save-btn">
            Save
          </button>
          <button onClick={cancelEdit} className="cancel-btn">
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              id={`todo-${todo.id}`}
              className="todo-checkbox"
            />
            <label htmlFor={`todo-${todo.id}`} className={todo.completed ? "completed" : ""}>
              {todo.text}
            </label>
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => onDelete(todo.id)} className="delete-btn">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}
