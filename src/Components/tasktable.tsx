"use client";
import React, { useEffect, useState } from "react";
import TaskModal from "./TaskModal";
import ToggleModal from "./TaskUpdateModal";
import LogoutButton from "./button /logout";

const TaskTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') ?? '';
    setUsername(storedUsername);
  }, []);

  const handleOpenModal1 = () => setIsModalOpen(true);
  const handleCloseModal1 = () => setIsModalOpen(false);

  const handleOpenModal2 = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal2 = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask1 = (task: Task) => {
    setTasks([...tasks, task]);
    handleCloseModal1();
  };

  const handleSaveTask2 = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    handleCloseModal2();
  };

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    if (currentStatus !== 'pending') {
      console.log('Task is already complete, no action taken.');
      return;
    }

    const newStatus = 'complete'; 

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update failed:', response.status, errorText);
        throw new Error('Failed to update task status');
      }

      const updatedTasks = tasks.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/getPostsByUsername?username=${username}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center p-4 bg-gray-100 ml-24 -mr-22">
        <h1 className="text-lg text-gray-700">User: {username}</h1>
        <button
          onClick={handleOpenModal1}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 mb-4"
        >
          Add New Task
        </button>
        <LogoutButton />
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal1}
          onSave={handleSaveTask1}
        />
      </div>

      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-x-auto ml-12">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[150px] sm:min-w-[200px] md:min-w-[250px]">
              S.NO.
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[150px] sm:min-w-[200px] md:min-w-[250px]">
              Title
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[200px] sm:min-w-[250px] md:min-w-[300px]">
              Description
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[100px] sm:min-w-[150px] md:min-w-[200px]">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.length > 0 && tasks.map((task: Task, index: number) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap min-w-[150px] sm:min-w-[200px] md:min-w-[250px]">
                {index + 1}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap min-w-[150px] sm:min-w-[200px] md:min-w-[250px]">
                {task.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap min-w-[200px] sm:min-w-[250px] md:min-w-[300px]">
                {task.description}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap min-w-[100px] sm:min-w-[150px] md:min-w-[200px]">
                <button
                  onClick={() => toggleTaskStatus(task._id, task.status)}
                  className={`px-2 py-1 rounded ${task.status === 'pending' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                  disabled={task.status === 'complete'}
                >
                  {task.status === 'pending' ? 'Mark Complete' : 'Already Complete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
