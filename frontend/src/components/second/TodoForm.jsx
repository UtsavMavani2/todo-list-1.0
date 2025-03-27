// TodoForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../../utils/axios';

const TodoForm = ({ fetchTodos, todo = {}, isUpdate = false, closeModal }) => {
    const validationSchema = Yup.object({
        title: Yup.string()
            .min(2, 'Title must be at least 2 characters')
            .max(50, 'Title must be less than 50 characters')
            .required('Title is required'),
        description: Yup.string()
            .max(200, 'Description must be less than 200 characters')
            .required('Description is required'),
        dueDate: Yup.date()
            .required('Due date is required')
            .min(new Date(), 'Due date cannot be in the past'),
        priority: Yup.string()
            .oneOf(['low', 'medium', 'high'], 'Invalid priority')
            .required('Priority is required'),
        status: Yup.string().oneOf(["pending", "completed"])
            .required('Status is required'),
    });

    const initialValues = {
        title: todo.title || '',
        description: todo.description || '',
        dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
        priority: todo.priority || 'low',
        status: todo.status || 'pending',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (isUpdate) {
                await API.put(`/todos/${todo._id}`, values);
                closeModal();
            } else {
                await API.post('/todos', values);
                resetForm();
            }
            fetchTodos();
        } catch (error) {
            console.error('Error submitting todo:', error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <Field
                            name="title"
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <Field
                            name="description"
                            as="textarea"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows="3"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                        <Field
                            name="dueDate"
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                        <Field
                            as="select"
                            name="priority"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Field>
                        <ErrorMessage name="priority" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <Field
                            as="select"
                            name="status"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
                    >
                        {isUpdate ? 'Update' : 'Create'} Todo
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default TodoForm;