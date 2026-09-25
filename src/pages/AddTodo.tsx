import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { addTodo } from "../redux/todoSlice";
import { createTodo } from "../services/todoService";

function AddTodo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const newTodo = await createTodo({
        //userId: todo.userId,
        title: title.trim(),
        completed,
      });
      dispatch(addTodo(newTodo));
      navigate("/");
    } catch {
      setError("Failed to add todo");
    }
  };

  return (
    <div className="form-page">
      <h1>Add Todo</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
            {" "}Completed
          </label>
        </div>
        <div className="form-actions">
          <button className="primary-btn" type="submit">Add Todo</button>
          <button className="secondary-btn" type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
