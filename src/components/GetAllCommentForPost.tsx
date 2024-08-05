import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tasksState, Task } from "../States/tasksState";

interface GetAllCommentForPostProps {
  comments: string[];
  taskId: number;
}

const GetAllCommentForPost: React.FC<GetAllCommentForPostProps> = ({
  comments,
  taskId,
}) => {
  const taskData = useRecoilValue<Task[]>(tasksState);
  const setTaskData = useSetRecoilState(tasksState);

  const deleteComment = (comment: string, taskId: number) => {
    console.log("Comment:", comment);
    console.log("Task ID:", taskId);

    const tasksWithComments = taskData.map((task) => {
      if (task.id === taskId) {
        const updatedComments = task.comments?.filter(
          (taskComment: string) => taskComment !== comment
        );
        return {
          ...task,
          comments: updatedComments,
        };
      }
      return task;
    });

    setTaskData(tasksWithComments);
  };

  return (
    <div className="w-96 bg-white shadow-md rounded-lg p-4 mt-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment}
            className="bg-gray-100 p-2 rounded-md mb-2 flex justify-between items-center"
          >
            <p className="text-sm text-gray-700">{comment}</p>
            <button
              className="bg-red-500 text-white p-1 rounded-md"
              onClick={() => deleteComment(comment, taskId)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments available.</p>
      )}
    </div>
  );
};

export default GetAllCommentForPost;
