import Login from "./components/Login";
import Tasks from "./components/Tasks";
import UserData from "./components/UserData";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <>
      <RecoilRoot>
        <Tasks />
        <UserData />
        <Login />
      </RecoilRoot>
    </>
  );
};

export default App;
