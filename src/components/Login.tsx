import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../States/userState";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const setUserState = useSetRecoilState(userState);
  const userData = useRecoilValue(userState);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const handleLogin: SubmitHandler<Inputs> = (data) => {
    if (data.email !== "admin@gmail.com" || data.password !== "123456") {
      setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
      return;
    }
    setUserState({ LoggedIn: true });
  };

  const handleLogout = () => {
    setUserState({
      LoggedIn: false,
    });
  };

  return (
    <>
      {!userData.LoggedIn ? (
        <form onSubmit={handleSubmit(handleLogin)}>
          {errors.email && <p>{(errors.email as FieldError).message}</p>}
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your email"
            className="border border-black mr-2"
          />
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter your password"
            className="border border-black mr-2"
          />
          <button className="bg-blue-600 p-2 rounded-md text-white">
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
