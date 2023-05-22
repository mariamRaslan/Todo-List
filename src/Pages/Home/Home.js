import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TodoContext } from "../../TodoContext";
import './Home.css';

const Home = () => {
  const { todos, deleteTodo } = useContext(TodoContext);
  const [selectedTodos, setSelectedTodos] = useState([]);

  const handleDelete = () => {
    selectedTodos.forEach(todo => deleteTodo(todo.id));
    setSelectedTodos([]);

  };

  const handleSelectTodo = (todo) => {
    if (selectedTodos.some(selectedTodo => selectedTodo.id === todo.id)) {
      setSelectedTodos(selectedTodos.filter(selectedTodo => selectedTodo.id !== todo.id));
    } else {
      setSelectedTodos([...selectedTodos, todo]);
    }
  };

  const sortedTodos = todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    < >
    
      <div className="home container mt-5 border border-3 p-5 ">
        <h3 className="text-decoration-underline">Todo List</h3>
        <table className="table mt-4">
          <thead>
            <tr>
              <th></th>
              <th scope="col">#</th>
              <th scope="col">Content</th>
              <th scope="col">Created At</th>
              <th scope="col">Controls</th>
            </tr>
          </thead>
          <tbody>
            {sortedTodos.length ? (
              sortedTodos.map((todo, index) => (
                <tr key={todo.id}>
                <td>
                <div className="form-check">
                     <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedTodos.some(selectedTodo => selectedTodo.id === todo.id)}
                        onChange={() => handleSelectTodo(todo)}
                      />
                    </div>
                </td>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Link to={`/TodoDetails/${todo.id}`}>{todo.content}</Link>
                  </td>
                  <td>{new Date(todo.createdAt).toLocaleString()}</td>
                  <td>

                    <FontAwesomeIcon onClick={() => handleDelete(todo.id)} className="text-danger btn" icon={faTrashAlt} />
                    <Link to={`/EditTodo/${todo.id}`}>
                      <FontAwesomeIcon className="ms-2" icon={faEdit} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-secondary">No todos yet.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <div>
            <button className="btn btn-success" onClick={() => setSelectedTodos(sortedTodos)}>Select All</button>
            <button className="btn btn-secondary ms-2" onClick={() => setSelectedTodos([])}>Clear Selection</button>
          </div>
          <div>
            <button className="btn btn-danger" disabled={!selectedTodos.length} onClick={handleDelete}>Delete Selected</button>
            <Link to="/CreateTodo">
              <button className="btn btn-success ms-2">Add Todo</button>
            </Link>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Home;