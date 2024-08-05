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

  return (
    <div className="flex justify-center items-center ">
      {!userData.LoggedIn && (
        <form onSubmit={handleSubmit(handleLogin)}>
          {errors.email && (
            <p className="text-red-600">
              {(errors.email as FieldError).message}
            </p>
          )}
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your email"
            className="border border-black mr-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter your password"
            className="border border-black mr-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 p-2 rounded-md text-white">
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
