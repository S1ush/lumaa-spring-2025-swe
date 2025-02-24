import { useState, useEffect } from 'react';
import { api } from '../../lib/axios';
import { Task } from '../../types';
import { TaskItem } from './TaskItem';
import { AddTaskForm } from './AddTaskForm';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdd = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdate = async (taskId: string, isComplete: boolean) => {
    try {
      await api.put(`/tasks/${taskId}`, { isComplete });
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, isComplete } : task
      ));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center py-8">
      <div className="text-purple-600 font-medium">Loading tasks...</div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
      <p className="text-red-700">{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <AddTaskForm onTaskAdd={handleTaskAdd} />
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks yet. Add your first task above!
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}