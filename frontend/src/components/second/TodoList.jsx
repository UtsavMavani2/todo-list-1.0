// TodoList.jsx
import React, { useState, useEffect } from 'react';
import API from '../../utils/axios';
import TodoForm from './TodoForm';
import { useAuth } from '../../provider/authProvider';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();



    const [todos, setTodos] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await API.get('/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleDeleteClick = (todo) => {
        setSelectedTodo(todo);
        setShowDeleteModal(true);
    };

    const handleUpdateClick = (todo) => {
        setSelectedTodo(todo);
        setShowUpdateModal(true);
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/todos/${selectedTodo._id}`);
            setTodos(todos.filter(todo => todo._id !== selectedTodo._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleLogout = () => {
        setToken();
        navigate("/", { replace: true });
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <button className='p-2 bg-gray-600 text-white cursor-pointer' onClick={handleLogout}>Logout</button>
            <h2 className="text-2xl font-bold mb-4">Todo List</h2>
            <TodoForm fetchTodos={fetchTodos} />

            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Due Date</th>
                            <th className="p-3 text-left">Priority</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr key={todo._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{todo.title}</td>
                                <td className="p-3">{todo.description}</td>
                                <td className="p-3">{new Date(todo.dueDate).toLocaleDateString()}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded capitalize ${todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                                        todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                        {todo.priority}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded capitalize ${todo.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        todo.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {todo.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleUpdateClick(todo)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(todo)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showUpdateModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Update Todo</h3>
                            <button onClick={() => setShowUpdateModal(false)} className="text-gray-500 hover:text-gray-700">
                                ×
                            </button>
                        </div>
                        <TodoForm
                            fetchTodos={fetchTodos}
                            todo={selectedTodo}
                            isUpdate={true}
                            closeModal={() => setShowUpdateModal(false)}
                        />
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                        <p className="mb-4">Are you sure you want to delete "{selectedTodo?.title}"?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoList;