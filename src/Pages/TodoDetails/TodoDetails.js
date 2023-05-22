import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { TodoContext } from "../../TodoContext";

const TodoDetails = () => {
  const { todos } = useContext(TodoContext);
  const { id } = useParams();

  const todo = todos.find((todo) => todo.id === parseInt(id));

  return (
    <div className="todo-details container mt-5 border border-3 p-5">
      {todo ? (
        <>
          <h3 className="mb-3 text-decoration-underline">Todo Details</h3>
          <p className="mb-1">{todo.content}</p>
          <p className="mb-3">{new Date(todo.createdAt).toLocaleString()}</p>
          <Link to={`/EditTodo/${todo.id}`}>
            <button className="btn btn-success me-3">Edit</button>
          </Link>
        </>
      ) : (
        <p>Todo not found.</p>
      )}
      <Link to="/" className="btn btn-secondary">Back to List</Link>
    </div>
  );
};

export default TodoDetails;