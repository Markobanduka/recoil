import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Task {
  id: number;
}

interface CommentFormProps {
  task: Task;
  callbackPostComment: (data: { taskId: number; comment: string }) => void;
}

interface FormData {
  comment: string;
  taskId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({
  task,
  callbackPostComment,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const postComment: SubmitHandler<FormData> = (data) => {
    callbackPostComment(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(postComment)}>
      <input
        {...register("comment", { required: "Comment is required" })}
        type="text"
        placeholder="Enter your comment"
        className="border border-gray-400 rounded-sm"
      />
      <input {...register("taskId")} type="hidden" defaultValue={task.id} />
      <button className="bg-blue-500 text-white mt-1 rounded-md hover:bg-blue-700 p-1">
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
