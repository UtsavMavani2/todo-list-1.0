import { useState, useEffect } from "react";
import API from "../utils/axios";
import TodoModal from "../components/TodoModal";
import toast from "react-hot-toast";
import DarkModeToggle from "../components/DarkModeToggle";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchTodos = async () => {
    setLoading(true); // Start loading
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    let updatedTodos = [...todos];

    if (statusFilter !== "all") {
      updatedTodos = updatedTodos.filter((todo) =>
        statusFilter === "completed"
          ? todo.status === "completed"
          : todo.status === "pending"
      );
    }

    if (sortOrder === "newest") {
      updatedTodos.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    } else {
      updatedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    setFilteredTodos(updatedTodos);
  }, [statusFilter, sortOrder, todos]);

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("To-Do deleted successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete To-Do!");
    }
  };

  // const logOut = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/";
  // };



  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

  return (
    <div className="p-6">
      <DarkModeToggle />
      <button className="p-3 bg-gray-500 cursor-pointer" onClick={handleLogout}>
        Logout
      </button>{" "}
      <h2 className="text-xl font-bold mb-4">To-Do List</h2>
      <button
        className="p-2 bg-green-500 text-white rounded mb-4"
        onClick={() => setModalOpen(true)}
        aria-label="Add a new to-do"
      >
        Add To-Do
      </button>
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          className="p-2 border rounded"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <button
          className="p-2 bg-green-500 text-white rounded"
          onClick={() => setModalOpen(true)}
        >
          Add To-Do
        </button>
      </div>
      {
        loading ? (
          <p className="text-center">Loading todos...</p>
        ) : (
          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th scope="col" className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Priority</th>
                <th className="border p-2">Due Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {todos.map((todo) => (
            <tr key={todo._id} className="border">
              <td className="border p-2">{todo.title}</td>
              <td className="border p-2">{todo.description}</td>
              <td className="border p-2">{todo.priority}</td>
              <td className="border p-2">
                {new Date(todo.dueDate).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {todo.status === "completed" ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-red-500">Pending</span>
                )}
              </td>

              <td className="border p-2 flex gap-2">
                <button
                  className="p-1 bg-yellow-500 text-white rounded"
                  onClick={() => {
                    setEditTodo(todo);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="p-1 bg-red-500 text-white rounded"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))} */}

              {filteredTodos.map((todo) => (
                <tr key={todo._id} className="border">
                  <td className="border p-2">{todo.title}</td>
                  <td className="border p-2">{todo.description}</td>
                  <td className="border p-2">{todo.priority}</td>
                  <td className="border p-2">
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {todo.status === "completed" ? (
                      <span className="text-green-500">Completed</span>
                    ) : (
                      <span className="text-red-500">Pending</span>
                    )}
                  </td>
                  <td className="border p-2 flex gap-2">
                    <button
                      className="p-1 bg-yellow-500 text-white rounded"
                      onClick={() => {
                        setEditTodo(todo);
                        setModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="p-1 bg-red-500 text-white rounded"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      <TodoModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTodo(null);
        }}
        refreshTodos={fetchTodos}
        editTodo={editTodo}
      />
    </div>
  );
};

export default Dashboard;
