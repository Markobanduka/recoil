import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tasksState } from "../States/tasksState";
import { SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../Utils/Category";

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

  return (
    <div>
      <select {...register("category")}>
        {categories.map((category, index) => {
          return (
            <option value={category} key={index}>
              {category}
            </option>
          );
        })}
      </select>

      <form onSubmit={handleSubmit(createTask)}>
        {errors.taskName && <p>{errors.taskName.message}</p>}
        <input
          {...register("taskName", { required: "Task name is required" })}
          type="text"
          placeholder="Enter Title of task"
          className="border border-black mr-3 rounded-sm"
        />

        <button className="p-2 bg-green-700 text-white rounded-md">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTasks;
