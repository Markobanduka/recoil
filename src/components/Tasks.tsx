import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../States/userState";
import CreateTasks from "./CreateTasks";
import { tasksState } from "../States/tasksState";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categories } from "../Utils/Category";

interface Task {
  name: string;
  id: number;
  category: string;
}

const Tasks: React.FC = () => {
  const userData = useRecoilValue(userState);
  const taskData = useRecoilValue<Task[]>(tasksState);
  const setTaskData = useSetRecoilState(tasksState);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  interface FormData {
    taskId: number;
    taskName: string;
    category: string;
    id: number;
  }

  const { register, handleSubmit, reset } = useForm<FormData>();

  const deleteTask = (taskId: number) => {
    const filteredTasks = taskData.filter((task) => task.id !== taskId);
    setTaskData(filteredTasks);
  };

  const updateTask = (data: FormData) => {
    setEditTaskId(null);

    const updateTasks = taskData.map((task) => {
      if (task.id === data.taskId) {
        return { ...task, name: data.taskName, category: data.category };
      }
      return task;
    });
    setTaskData(updateTasks);
  };

  useEffect(() => {
    if (editTaskId !== null) {
      const task = taskData.find((t) => t.id === editTaskId);
      if (task) {
        reset({
          taskId: task.id,
          taskName: task.name,
          category: task.category,
        });
      }
    }
  }, [editTaskId, reset, taskData]);

  return (
    <div className="w-full flex flex-col items-center">
      {userData.LoggedIn && (
        <div className="w-96 mt-6">
          <CreateTasks />
        </div>
      )}
      <div className="w-full p-4 flex flex-col items-center">
        {userData.LoggedIn &&
          taskData.map((task) => {
            return (
              <div key={task.id} className="w-96 mb-4">
                {editTaskId === task.id ? (
                  <form
                    onSubmit={handleSubmit(updateTask)}
                    className="bg-white shadow-md rounded-lg p-4"
                  >
                    <input
                      {...register("taskId")}
                      type="hidden"
                      defaultValue={task.id}
                    />
                    <div className="mb-2">
                      <input
                        {...register("taskName")}
                        type="text"
                        defaultValue={task.name}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        {...register("category")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        defaultValue={task.category}
                      >
                        {categories.map((category, index) => (
                          <option value={category} key={index}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white p-2 rounded-md w-full"
                    >
                      Update task
                    </button>
                  </form>
                ) : (
                  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
                    <div>
                      <p className="text-lg font-semibold">{task.name}</p>
                      <p className="text-sm text-gray-500">{task.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-yellow-500 text-white p-2 rounded-md"
                        onClick={() => setEditTaskId(task.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-md"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Tasks;
