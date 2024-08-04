import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tasksState } from "../States/tasksState";
import { SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../Utils/Category";
import UserData from "./UserData";
import { userState } from "../States/userState";

interface Task {
  id: number;
  name: string;
  category: string;
}

interface FormData {
  taskName: string;
  category: string;
  id: number;
}

const CreateTasks: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const setTasks = useSetRecoilState(tasksState);
  const setUserState = useSetRecoilState(userState);
  const tasks = useRecoilValue<Task[]>(tasksState);

  const createTask: SubmitHandler<FormData> = (data: FormData) => {
    const taskAlreadyExist = tasks.find((task) => task.name === data.taskName);
    if (taskAlreadyExist) {
      setError("taskName", {
        type: "manual",
        message: "Task already exists",
      });
      return;
    } else {
      const newTask = {
        id: Date.now(),
        name: data.taskName,
        category: data.category,
      };
      setTasks((oldTasks) => [...oldTasks, newTask]);
    }
  };
  const handleLogout = () => {
    setUserState({
      LoggedIn: false,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-6">
      <form onSubmit={handleSubmit(createTask)}>
        <div className="mb-4">
          <select
            {...register("category")}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            {...register("taskName", { required: "Task name is required" })}
            type="text"
            placeholder="Enter Title of task"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {errors.taskName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.taskName.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md w-full"
        >
          Create Task
        </button>
      </form>
      <div className="flex justify-between mt-2">
        <UserData />
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-600 p-2 rounded-md text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTasks;
