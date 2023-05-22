import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../TodoContext";

const CreateTodo = () => {
  const { addTodo } = useContext(TodoContext);
  const [content, setContent] = useState("");
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

    const newTodo = {
      id: new Date().getTime(),
      content,
      createdAt: new Date(),
    };
    addTodo(newTodo);
    navigate("/");
  };

  return (
    <div className="create-todo container mt-5 border border-3 p-5 ">
      <h3 className="text-decoration-underline">Create a new todo</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4">
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
        <button type="submit" className="btn btn-success mt-3">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;