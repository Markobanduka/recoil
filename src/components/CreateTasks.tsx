import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { tasksState } from "../States/tasksState";

const CreateTasks: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");

  const setTasks = useSetRecoilState(tasksState);

  const createTask = () => {
    if (taskName.trim()) {
      setTasks((oldTasks) => [...oldTasks, taskName]);
      setTaskName("");
    }
  };
  return (
    <form>
      <input
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
        type="text"
        placeholder="Enter Title of task"
        className="border border-black mr-3 rounded-sm"
      />
      <button
        type="button"
        onClick={createTask}
        className="p-2 bg-green-700 text-white rounded-md"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTasks;
