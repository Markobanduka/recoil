import { useRecoilValue } from "recoil";
import { userState } from "../States/userState";

const UserData = () => {
  const userData = useRecoilValue(userState);

  return (
    <div>
      <p>Logged In: {userData.LoggedIn ? "Yes" : "No"}</p>
    </div>
  );
};

export default UserData;
