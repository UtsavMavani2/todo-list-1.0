import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../utils/axios";
import toast from "react-hot-toast";

const TodoModal = ({ isOpen, onClose, refreshTodos, editTodo }) => {
  const formik = useFormik({
    initialValues: {
      title: editTodo ? editTodo.title : "",
      description: editTodo ? editTodo.description : "",
      priority: editTodo ? editTodo.priority : "low",
      dueDate: editTodo ? editTodo.dueDate.split("T")[0] : "",
      status: editTodo ? editTodo.status : "pending",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      priority: Yup.string().oneOf(["low", "medium", "high"]).required(),
      dueDate: Yup.date().required("Due date is required"),
      status: Yup.string().oneOf(["pending", "completed"]).required(),
    }),
    onSubmit: async (values) => {
      try {
        if (editTodo) {
          await API.put(`/todos/${editTodo._id}`, values);
          toast.success("To-Do updated successfully!");
        } else {
          await API.post("/todos", values);
          toast.success("To-Do added successfully!");
        }
        refreshTodos();
        onClose();
      } catch (err) {
        toast.error("Something went wrong!");
      }
    },
  });

  useEffect(() => {
    if (editTodo) {
      formik.setValues({
        title: editTodo.title,
        priority: editTodo.priority,
        dueDate: editTodo.dueDate.split("T")[0],
        status: editTodo.status,
        description: editTodo.description,
      });
    }
  }, [editTodo]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">
            {editTodo ? "Edit" : "Add"} To-Do
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full p-2 border rounded mb-2"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500">{formik.errors.title}</p>
            )}
            <input
              type="text"
              name="description"
              placeholder="description"
              className="w-full p-2 border rounded mb-2"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500">{formik.errors.description}</p>
            )}

            <select
              name="priority"
              className="w-full p-2 border rounded mb-2"
              {...formik.getFieldProps("priority")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              name="status"
              className="w-full p-2 border rounded mb-2"
              {...formik.getFieldProps("status")}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <input
              type="date"
              name="dueDate"
              className="w-full p-2 border rounded mb-2"
              {...formik.getFieldProps("dueDate")}
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <p className="text-red-500">{formik.errors.dueDate}</p>
            )}

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              {editTodo ? "Update" : "Add"} To-Do
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default TodoModal;
