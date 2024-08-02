"use client";
import React, { useState, useEffect } from 'react';

const ToggleModal: React.FC<ToggleModalProps> = ({ isOpen, onClose, _id }) => {
  const [toggleState, setToggleState] = useState<'pending' | 'completed'>('pending');

  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const task = await response.json();
        setToggleState(task.status);
      } catch (error) {
        console.error('Error fetching task status', error);
      }
    };

    if (_id && isOpen) {
      fetchTaskStatus();
    }
  }, [_id, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/tasks/${_id}/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: toggleState }),
      });

      if (response.ok) {
        alert('Status updated successfully');
        onClose();
      } else {
        alert('Error updating status');
      }
    } catch (error) {
      console.error('Error updating status', error);
      alert('Error updating status');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Toggle Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status:
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setToggleState('pending')}
                className={`px-4 py-2 rounded-md ${toggleState === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setToggleState('completed')}
                className={`ml-2 px-4 py-2 rounded-md ${toggleState === 'pending' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
              >
                Complete
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ToggleModal;
