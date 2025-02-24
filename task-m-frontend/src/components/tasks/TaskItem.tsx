import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: string, isComplete: boolean) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex-1">
        <h3 className={`text-lg font-medium ${task.isComplete ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-gray-500 mt-1">{task.description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdate(task.id, !task.isComplete)}
          className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            task.isComplete 
            ? 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500'
            : 'bg-green-700 text-white hover:bg-green-200 focus:ring-green-400 hover:text-green-700'
          }`}
        >
          {task.isComplete ? 'Completed' : 'Complete'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors rounded-lg 
                   hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}