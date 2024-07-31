import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../States/userState";
import CreateTasks from "./CreateTasks";
import { tasksState } from "../States/tasksState";

interface Task {
  name: string;
}

const Tasks: React.FC = () => {
  const userData = useRecoilValue(userState);
  const taskData = useRecoilValue<Task[]>(tasksState);
  const setTaskData = useSetRecoilState(tasksState);

  console.log(taskData);

  const deleteTask = (taskName: string) => {
    const filteredTasks = taskData.filter((task) => task !== taskName);
    setTaskData(filteredTasks);
  };

  return (
    <>
      {taskData.map((taskName, index) => {
        return (
          <div key={index}>
            <p>{taskName}</p>
            <button
              className="p-2 bg-red-600 text-white rounded-md"
              onClick={() => deleteTask(taskName)}
            >
              Delete
            </button>
          </div>
        );
      })}

      {userData.LoggedIn && (
        <div>
          <CreateTasks />
          <p>Tasks</p>
        </div>
      )}
    </>
  );
};

export default Tasks;
