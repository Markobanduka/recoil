import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../States/userState";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUserState = useSetRecoilState(userState);
  const userData = useRecoilValue(userState);

  const handleLogin = () => {
    if (email == "admin@gmail.com" && password == "123456") {
      setUserState({ LoggedIn: true });
    }
  };

  const handleLogout = () => {
    setUserState({
      LoggedIn: false,
    });
  };

  return (
    <>
      {!userData.LoggedIn ? (
        <form>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-black mr-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-black mr-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-600 p-2 rounded-md text-white"
          >
            Login
          </button>
        </form>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-600 p-2 rounded-md text-white"
        >
          Logout
        </button>
      )}
    </>
  );
};

export default Login;
