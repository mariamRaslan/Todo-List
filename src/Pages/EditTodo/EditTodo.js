import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../../TodoContext";

const EditTodo = () => {
  const { todos, editTodo } = useContext(TodoContext);
  const { id } = useParams();
  const todo = todos.find((todo) => todo.id === parseInt(id));
  const [content, setContent] = useState(todo.content);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for validation errors
    const errors = {};

    if (!content) {
      errors.content = "Todo content is required.";
    } else if (content.length < 5) {
      errors.content = "Todo content must be at least 5 characters.";
    } else if (content.length > 100) {
      errors.content = "Todo content must be at most 100 characters.";
    }

    // If there are errors, set them into state and return
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const updatedTodo = {
      id: todo.id,
      content,
      createdAt: todo.createdAt,
    };
    editTodo(updatedTodo);
    navigate("/");
  };

  return (
    <div className="edit-todo container mt-5 border border-3 p-5 ">
      {todo ? (
        <>
          <h3 className="mb-3 text-decoration-underline">Edit Todo</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="content">Enter your todo:</label>
              <textarea
                id="content"
                className={`form-control ${errors.content && "is-invalid"}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              {errors.content && (
                <div className="invalid-feedback">{errors.content}</div>
              )}
            </div>
            <button type="submit"className="btn btn-success me-3 mt-3">Save Changes</button>
          </form>
        </>
      ) : (
        <p>Todo not found.</p>
      )}

    </div>
  );
};

export default EditTodo;