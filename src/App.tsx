import Login from "./components/Login";
import Tasks from "./components/Tasks";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <>
      <RecoilRoot>
        <Login />
        <Tasks />
      </RecoilRoot>
    </>
  );
};

export default App;
