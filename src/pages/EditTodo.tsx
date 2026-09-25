import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateTodo } from "../redux/todoSlice";
import { getTodoById, updateTodo as updateTodoApi } from "../services/todoService";

function EditTodo() {
  const { id } = useParams<{ id: string }>();
  const todoId = Number(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const todo = useAppSelector((state) =>
    state.todos.items.find((item) => item.id === todoId)
  );

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
      return;
    }

    getTodoById(todoId).then((data) => {
        dispatch(updateTodo(data));
        setTitle(data.title);
        setCompleted(data.completed);
      })
      .catch(() => setError("Failed to load todo"));
  }, [todo, todoId, dispatch]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const updated = await updateTodoApi(todoId, {
        title: title.trim(),
        completed,
      });
      dispatch(updateTodo(updated));
      navigate("/");
    } catch {
      setError("Failed to update todo");
    }
  };

  return (
    <div className="form-page">
      <h1>Edit Todo</h1>
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
          <button className="primary-btn" type="submit">Update Todo</button>
          <button className="secondary-btn" type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
