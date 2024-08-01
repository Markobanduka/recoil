import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../States/userState";
import CreateTasks from "./CreateTasks";
import { tasksState } from "../States/tasksState";

interface Task {
  name: string;
  id: number;
}

const Tasks: React.FC = () => {
  const userData = useRecoilValue(userState);
  const taskData = useRecoilValue<Task[]>(tasksState);
  const setTaskData = useSetRecoilState(tasksState);

  console.log(taskData);

  const deleteTask = (taskId: number) => {
    const filteredTasks = taskData.filter((task) => task.id !== taskId);
    setTaskData(filteredTasks);
  };

  return (
    <>
      {taskData.map((task) => {
        return (
          <div key={task.id}>
            <p>{task.name}</p>
            <button
              className="p-2 bg-red-600 text-white rounded-md"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        );
      })}

      {userData.LoggedIn && (
        <div>
          <CreateTasks />
        </div>
      )}
    </>
  );
};

export default Tasks;
