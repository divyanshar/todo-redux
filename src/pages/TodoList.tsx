import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteTodo, setTodos } from "../redux/todoSlice";
import { getTodos, deleteTodo as deleteTodoApi } from "../services/todoService";
import type { Todo } from "../types/todo";

function TodoList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const todos = useAppSelector((state) => state.todos.items);

  useEffect(() => {
    if (todos.length === 0) {
      getTodos().then((data) => dispatch(setTodos(data)));
    }
  }, [dispatch, todos.length]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      const deletedId = await deleteTodoApi(id);
      dispatch(deleteTodo(deletedId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const columns: GridColDef<Todo>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 300 },
    { field: "completed", headerName: "Completed", width: 150, type: "boolean" },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Button size="small" onClick={() => navigate(`/edit/${params.row.id}`)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Todo List</h1>
        <Button variant="contained" onClick={() => navigate("/add")}>
          Add Todo
        </Button>
      </div>
      <Paper sx={{ width: "100%" }}>
        <DataGrid
          rows={todos}
          columns={columns}
          pageSizeOptions={[10]}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          disableRowSelectionOnClick
          autoHeight
        />
      </Paper>
    </div>
  );
}

export default TodoList;
